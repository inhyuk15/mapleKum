const express = require('express');
var kumStatus = express.Router({ mergeParams: true});
const puppeteer = require('puppeteer');
const axios = require('axios');

kumStatus.use(express.urlencoded({ extended : false}));
kumStatus.use(express.json());

kumStatus.post("/", async function (req, res, next) {
    console.log("검색 링크: " + req.body.link);
    try {
        const resultList = await openBrowser(req.body.link);
        res.json(resultList);
    }
    catch (err) {
        console.error(err);
    }
});

async function openBrowser(link) {
    // // 브라우저 실행 및 옵션, 현재 옵션은 headless 모드 사용 여부
    const browser = await puppeteer.launch({
          headless: true,
          args: [
              "--no-sandbox",
              "--disable-setuid-sandbox",
              "--window-size=1600,2000",
          ]
      });
    // 브라우저 열기
    const page = await browser.newPage();
    // 포탈로 이동
    await page.goto(link);
    // {
    //     waitUntil: "load",
    // });
//     // 예외 처리
    try {
      // 해당 콘텐츠가 로드될 때까지 대기
      await page.waitForSelector(".tab01_con_wrap", { timeout: 100000 });
    } catch (error) {
      // 해당 태그가 없을 시 검색결과 없음 반환
      console.log("에러 발생: " + error);
      return [
        {
          StatsAck: "0",
          STR: "0",
          DEX: "0",
          INT: "0",
          LUK: "0",
          CriticalDmg: "0",
          BossDmg: "0",
          DepenceIgnore: "0",
          arcaneForce: "0"
        },
      ];
    }
    // 호출된 브라우저 영역
    const searchData = await page.evaluate(() => {
        // 검색된 돔 요소를 배열에 담음
        const statusList = document.querySelectorAll(".tab01_con_wrap > .table_style01");
        let contentsObjList = [];
        // 검색결과 크롤링
        // const StatsAck = statusList.querySelector(".table_style01 > tbody > td > span");
        // const STR = statusList.querySelector(".table_style01 > tbody > tr:nth-child(1) > td:nth-child(1) > span");
        const DEX = "0";
        const INT = "0";
        const LUK = "0";
        const CriticalDmg = "0";
        const BossDmg = "0";
        const DepenceIgnore = "0";
        const arcaneForce = "0";
        
        for(let i =0; i < statusList.length; i++) {
            const trs = statusList[i].querySelectorAll('tbody > tr');
            for(let j =0; j < trs.length; j++) {
                let tr = trs[j];
                let names = tr.querySelectorAll('th > span');
                let vals= tr.querySelectorAll('td > span');
                
                for(let k = 0; k < names.length; k++) {
                    // if(names[k].innerHTML == "하이퍼스탯") {
                    //     let hypers = vals.querySelectorAll('br');

                    //     continue;
                    // }
                    contentsObjList.push({name : names[k].innerHTML , val : vals[k].innerHTML});
                }
            }
        }
        const tendencyList = document.querySelectorAll('.tab02_con_wrap > .dispo_wrap > .dispo_list > li');
        for(let i =0; i < 2; i++) {
            const datas = tendencyList[i].querySelector('.dis_center');
            contentsObjList.push({name : datas.querySelector('h2').innerHTML, val : datas.querySelector('.graph_wrap > .lv > span').innerHTML});
        }
        return contentsObjList;
  });
  // 브라우저 닫기
  browser.close();

  // 검색결과 반환
  return searchData;
}

module.exports = kumStatus;
