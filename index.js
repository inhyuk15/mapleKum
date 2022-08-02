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
  const browser = await puppeteer.launch({ headless: true });

  // 브라우저 열기
  const page = await browser.newPage();

  // 포탈로 이동
  await page.goto("https://www.google.com/");

  // 키워드 입력
  await page.type("input[class='gLFyf gsfi']", keyword);
  
  // 키워드 검색
  await page.type("input[class='gLFyf gsfi']", String.fromCharCode(13));

	  // 예외 처리
  try {
    // 해당 콘텐츠가 로드될 때까지 대기
    await page.waitForSelector("#rso div.g", { timeout: 100000 });
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
    const contentsList = Array.from(document.querySelectorAll("#rso div.g"));
    let contentsObjList = [];

    // 검색결과 크롤링
    contentsList.forEach((item) => {
      if (item.className === "g") {
        const title = item.querySelector("h3");
        const link = item.querySelector(".yuRUbf");
        const text = item.querySelector(".VwiC3b");
        const kategorie = item.querySelector(".iUh30 ");

        if (title && link && text && kategorie) {
          contentsObjList.push({
            title: title.textContent, // 타이틀
            link: link.children[0].href, // 링크
            text: text.textContent, // 내용
            kategorie: kategorie.textContent, // 카테고리
          });
        }
      }
    });

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


