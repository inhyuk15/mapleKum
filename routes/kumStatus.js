const express = require('express');
var kumStatus = express.Router({ mergeParams: true});
const puppeteer = require('puppeteer');
const soulMaster = require('./passiveSkills.js/soulMaster');

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

kumStatus.post('/item', async function (req, res, next) {
    console.log("검색 아이템 링크 : " + req.body.link);
    try {
        const resultList = await openBrowser2Item(req.body.link);
        res.json(resultList);
    }
    catch (err) {
        console.error(err);
    }
})

kumStatus.post('/skill', async function(req, res, next) {
    console.log("스킬 목록 링크 : " + req.body.link);
    try {
        const resultList = await openBrowser2Skill(req.body.link);
        res.json(resultList);
    }
    catch (err) {
        console.error(err);
    }
})

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
    // 예외 처리
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
        for(let i =0; i < statusList.length; i++) {
            const trs = statusList[i].querySelectorAll('tbody > tr');
            for(let j =0; j < trs.length; j++) {
                let tr = trs[j];
                let names = tr.querySelectorAll('th > span');
                let vals= tr.querySelectorAll('td > span');
                
                for(let k = 0; k < names.length; k++) {
                    contentsObjList.push({name : names[k].innerHTML , val : vals[k].innerHTML});
                }
            }
        }
        const tendencyList = document.querySelectorAll('.tab02_con_wrap > .dispo_wrap > .dispo_list > li');
        for(let i =0; i < 2; i++) {
            const datas = tendencyList[i].querySelector('.dis_center');
            contentsObjList.push({name : datas.querySelector('h2').innerHTML, val : datas.querySelector('.graph_wrap > .lv > span').innerHTML});
        }
        const itemLink = document.querySelector(".lnb_wrap > .lnb_list > li:nth-child(3) > a");
        contentsObjList.push({itemLink: itemLink.href});
        const skillLink = document.querySelector(".lnb_wrap > .lnb_list > li:nth-child(7) > a");
        contentsObjList.push({skillLink: skillLink.href});
        
        return contentsObjList;
  });
  // 브라우저 닫기
  browser.close();

  // 검색결과 반환
  return searchData;
}

async function openBrowser2Item(link) {
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
    // 예외 처리
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
        let contentsObjList = [];
        const buttons = Array.from(document.querySelectorAll(".weapon_wrap > .item_pot > li"));
        buttons.filter(elem => elem.innerHTML !== "")
        .forEach(elem => {
            const button = elem.querySelector("span > a > img");
            button.click();
            const statusList = document.querySelectorAll(".item_info > .item_info_wrap > .stet_info > ul > li");
            // 검색결과 크롤링
            let contentsList = [];
            statusList.forEach(elem => {
                // 옵션 이름
                let name = elem.querySelector('.stet_th > span');
                // 값
                let val = elem.querySelector('.point_td');
                // 잠재옵션만 다르게 투입
                const regex = /잠재옵션/g;
                if(regex.test(name.innerText)) {
                    // 각 옵션들 나눔
                    let vals = val.innerText.split('\n');
                    console.log(vals);
                    // 옵션과 값 분리
                    vals.forEach(v => {
                        if(/\:/g.test(v)) {
                            let str = v.split(':');
                            let name = str[0];
                            let val = str[1];
                            contentsList.push({stat: name, val: val});
                        }
                    })
                }
                else contentsList.push({stat: name.innerText, val: val.innerText});
            })
            let itemName = document.querySelector('.item_memo_title > h1');
            let itemPart = document.querySelectorAll('.item_ability > .ablilty02')[1].querySelector('.job_name > em').innerHTML.trim();
            contentsObjList.push({part : itemPart, name : itemName.innerText, val : contentsList});
        });
        return contentsObjList;
  });
  // 브라우저 닫기
  browser.close();

  // 검색결과 반환
  return searchData;
}

async function openBrowser2Skill(link) {
    // 브라우저 실행 및 옵션, 현재 옵션은 headless 모드 사용 여부
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
    // 예외 처리
    try {
        // 해당 콘텐츠가 로드될 때까지 대기
        await page.waitForSelector(".skill_wrap", { timeout: 100000 });
    } catch (error) {
        // 해당 태그가 없을 시 검색결과 없음 반환
        console.log("에러 발생: " + error);
        return [
        {
            err: "err"
        },
        ];
    }
    // 호출된 브라우저 영역
    const searchData = await page.evaluate(() => {
        // tier 0, 1, 2, 3, 4, 5에 대한 스킬들
        let skillSets = document.querySelectorAll('.skill_wrap > div');
        // // 검색된 돔 요소를 배열에 담음
        let contentsObjList = [];
        contentsObjList.push({skillsets : skillSets.length});
        
        // 각 tier에 대한 스킬들, ex) tier01 : 1차 스킬
        skillSets.forEach(sets => {
            const skillList = sets.querySelectorAll('.skill_list > ul > li');
            skillList.forEach(skill => {
                const skillName = skill.querySelector('h2').innerText;
                const skillInfos = skill.querySelector('.skill_info_wrap > .skill_info_con > .skill_table > tbody > tr > td:nth-child(2) > span').innerText.split('\n');
                contentsObjList.push({skillName : skillName, skillInfos: skillInfos});
            })
        })
        // 검색결과 크롤링
        return contentsObjList;
    });
    // 브라우저 닫기
    browser.close();

    // 검색결과 반환
    return searchData;
}


kumStatus.use('/passiveSkill', soulMaster);

module.exports = kumStatus;