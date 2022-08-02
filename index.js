const express = require('express');

const app = express();

const port = process.env.PORT || 5000;
app.listen(port);

app.use("/api/data", async function (req, res) {
  console.log("검색 키워드: " + req.query.keyword);
  const resultList = await openBrowser(req.query.keyword);
  console.log(resultList);
  res.json(resultList);
});

console.log(`server running at http ${port}`);

const puppeteer = require('puppeteer');

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
        title: "검색결과 없음",
        link: "",
        text: "",
        kategorie: "",
      },
    ];
  }

  // 호출된 브라우저 영역
  const searchData = await page.evaluate(() => {
    // 검색된 돔 요소를 배열에 담음
    const contentsList = Array.from(document.querySelectorAll(".search_com_chk"));
    let contentsObjList = [];

    // 검색결과 크롤링
    contentsList.forEach((item) => {
      // if (item.className === "g") {
        const characterName = item.querySelector(".search_com_chk > .left > dl > dt > a");
        const link = item.querySelector(".search_com_chk > .left > dl > dt > a");
        const characterLevel = item.querySelector(".search_com_chk > td:nth-child(3)");
        const characterInfo = item.querySelector(".search_com_chk > .left > dl > dd");
        const characterServerImg = item.querySelector(".search_com_chk > .left > dl > dt > a > img");
        const characterImg = item.querySelector(".search_com_chk > .left > .char_img > img");

        if (true) {
          contentsObjList.push({
            // title: title.textContent, // 타이틀
            // link: link.children[0].href, // 링크
            // text: text.textContent, // 내용
            // kategorie: kategorie.textContent, // 카테고리
              characterName: characterName.text,
              link: link.href,
              characterLevel: characterLevel.innerText,
              characterInfo: characterInfo.innerText,
              characterServerImg: characterServerImg.src,
              characterImg: characterImg.src
          });
        }
      // }
    });
    // console.log(link.toString());
    console.log("hi");
    // 호출된 브라우저 영역 콘솔창에서 확인할 수 있음
    console.log(contentsList); // 검색한 엘리먼트 리스트
    console.log(contentsObjList); // 검색한 콘텐츠 오브젝트 리스트

    return contentsObjList;
  });

  // 브라우저 닫기
  browser.close();

  // 검색결과 반환
  return searchData;

}




//######################
const path = require('path');

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname+'/client/build/index.html'));
});


