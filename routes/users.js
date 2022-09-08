const users = require('express').Router({mergeParams: true});
const kumStatus = require('./kumStatus');

const puppeteer = require('puppeteer');

users.use("/data", async function (req, res) {
    console.log("검색 키워드: " + req.query.keyword);
    const result = await openBrowser(req.query.keyword);
    res.json(result);
});

// http://gamebulletin.nexon.com/maplestory/inspection3.html?ReturnUrl=%2f
// 점검중이면 다음페이지로 리다이렉트됨

// 캐릭터 정보 줌
async function openBrowser(keyword) {
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
    await page.goto("https://maplestory.nexon.com/Ranking/World/Total");
    // 키워드 입력
    await page.type("input[name=search_text]", keyword);
    // 키워드 검색
    await page.type("input[name=search_text]", String.fromCharCode(13));
    // 예외 처리
    try {
      // 해당 콘텐츠가 로드될 때까지 대기
      await page.waitForSelector(".search_com_chk", { timeout: 100000 });
    } catch (error) {
      // 해당 태그가 없을 시 검색결과 없음 반환
      console.log("에러 발생: " + error);
      return [
        {
          characterName: "없음",
          link: "",
          characterLevel: "",
          characterInfo: "",
          characterServerImg: "",
          characterImg: ""
        },
      ];
    }
  
    // 호출된 브라우저 영역
    const searchData = await page.evaluate(() => {
      // 검색된 돔 요소를 배열에 담음
      
      // let contentsObjList = [];
      // 검색결과 크롤링
      const characterName = document.querySelector(".search_com_chk > .left > dl > dt > a");
      const link = document.querySelector(".search_com_chk > .left > dl > dt > a");
      const characterLevel = document.querySelector(".search_com_chk > td:nth-child(3)");
      const characterInfo = document.querySelector(".search_com_chk > .left > dl > dd");
      const characterServerImg = document.querySelector(".search_com_chk > .left > dl > dt > a > img");
      const characterImg = document.querySelector(".search_com_chk > .left > .char_img > img");
      
      const ret = {
          characterName: characterName.text,
          link: link.href,
          characterLevel: characterLevel.innerText,
          characterInfo: characterInfo.innerText,
          characterServerImg: characterServerImg.src,
          characterImg: characterImg.src
      };
      return ret;
    });
    // 브라우저 닫기
    browser.close();
  
    // 검색결과 반환
    return searchData;
}

users.use('/status', kumStatus);

module.exports = users;
