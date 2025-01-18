const express = require('express');
const { runTest, runSelectedTest } = require('./testController');
const signIn = require('./signInController');
const getTestCaseStatus = require('./testCaseStatusController');
const getTestCaseStatusByBrowser = require('./statusByBrowserController');
const getTestCases = require('./testCasesControllerv2');
const getAllTestCases = require('./alltestCasesController')
const testCaseUpdate = require('./testCaseUpdateController');
const noCodeTestCase = require('./noCodeTestCase');
const noCodeTestCaseImprovement = require('./noCodeTestCaseImprovement');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.get('/testcasestatus', getTestCaseStatus);
app.get('/statusbybrowser', getTestCaseStatusByBrowser);
app.get('/testcases', getTestCases);
app.get('/alltestcases', getAllTestCases);
app.post('/signin', signIn);
app.post('/run-test', runTest);
app.post('/run-selected-test', runSelectedTest);
app.post('/generatetestcase', noCodeTestCase);
app.post("/improvetestcase", noCodeTestCaseImprovement);

testCaseUpdate();

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});