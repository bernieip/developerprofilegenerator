const fs = require("fs");
const inquirer = require("inquirer");
const generate = require("./generateHTML.js");
const axios = require('axios').default;
const puppeteer = require("puppeteer");

const questions = [
    {
        type: "input",
        message: "What is your Github username?",
        name: "name"
    },
    {
        type: "list",
        message: "What is your favourite color?",
        name: "color",
        choices: [
            'green',
            'red',
            'blue',
            'pink'
        ]
    }
];

async function init() {

    const x = await inquirer
        .prompt(questions)

        .then(async function (userData) {
            let githubName = userData.name;

            let queryURL = "https://api.github.com/users/" + githubName;
            axios
                .get(queryURL).then(async function (response) {

                const userInfo = {
                    "profileImg": response.data.avatar_url,
                    "userName": response.data.name,
                    "location": response.data.location,
                    "userGitHub": response.data.url,
                    "company": response.data.company,
                    "blog": response.data.blog,
                    "bio": response.data.bio,
                    "repos": response.data.public_repos,
                    "followers": response.data.followers,
                    "stars": 0,
                    "following": response.data.following,
                    "ghcolor": userData.color
                };
                await fs.writeFileSync(`./templates/${githubName}.html`, generate(userInfo), function (err) {
                    if ((err)) {
                        console.log(err);
                    }
                })
            });
            return githubName
        });
    return x
}

const pdfMaker = async (githubName) => {
    const userHTML = `./templates/${githubName}.html`;
    console.log("pup" + userHTML);

    const browser = await puppeteer.launch();

    const page = await browser.newPage();

    await page.setViewport({
        width: 600,
        height: 1050
    });

    const html = fs.readFileSync(userHTML, "utf-8");

    await page.setContent(html, {
        waitUntil: "networkidle2"
    });

    await page.emulateMedia("screen");

    await page.screenshot({path: `./pngs/${githubName}.png`});

    await page.pdf({
        path: `./user-files/${githubName}.pdf`,
        format: "A4",
        pageRanges: '1',
        printBackground: true
    });
    await browser.close()
};


const start = async () => {
    const githubName = await init();
    await pdfMaker(githubName)
};

start();
