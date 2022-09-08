const express = require('express');
var soulMaster = express.Router({ mergeParams: true});
soulMaster.use(express.urlencoded({ extended : false}));
soulMaster.use(express.json());

soulMaster.post("/soulMaster", async function (req, res, next) {
    console.log("소울마스터 패시브 스킬 ");
    try {
        const skillList = req.body.skills;
        const resultList = [];
        skillList.forEach(skill => {
            const skillName = skill.skillName;
            const skillInfos = skill.skillInfos;
            switch(skillName) {
                case '소드 오브 라이트' :
                case '소울' :
                case '이너 트러스트' :
                case '바디 앤 소울' :
                case '이너 샤우트' :
                case '소울 포지' :
                case '소울 플레지' :
                case '소드 엑스퍼트' :
                case '언포시어블' :
                    let infos = skillInfos[0].replace(/증가/g, '').split(',');
                    infos = infos.map(elem => elem.trim());
                    resultList.push({skillName : skillName, skillInfos : infos});
                    break;
                default :
                    break;
            }
        });
        res.json(resultList);
    }
    catch (err) {
        console.error(err);
    }
});



module.exports = soulMaster;