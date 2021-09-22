/*import axios from 'axios'

const api = axios.create({
    baseURL: ''
})
 */

import { createDataFeed, SWITCHBOARD_DEVNET_PID } from '@switchboard-xyz/switchboard-api';
import { OracleJob } from '@switchboard-xyz/switchboard-api';
import { addFeedJob } from '@switchboard-xyz/switchboard-api';
import { setDataFeedConfigs } from '@switchboard-xyz/switchboard-api';

let connection
let payerAccount
let dateFeedAccount = await createDataFeed(connection, payerAccount, SWITCHBOARD_DEVNET_PID);

//add input section for url on autoselect component
let jobTasks = [
    OracleJob.Task.create({
        httpTask: OracleJob.HttpTask.create({
            url: "https://api.coinbase.com/v2/prices/btc-usd/spot"
        }),
    }),
    OracleJob.Task.create({
        jsonParseTask: OracleJob.JsonParseTask.create({ path: "$.data.amount" }),
    }),
];

await setDataFeedConfigs(
    connection,
    payerAccount,
    // eslint-disable-next-line no-undef
    dataFeedAccount,
    {
        "minConfirmations": 5,
        "minUpdateDelaySeconds": 60,
        // eslint-disable-next-line no-undef
        "fulfillmentManagerPubkey": fulfillmentManagerPubkey.toBuffer(),
        "lock": false
    });

// eslint-disable-next-line no-undef
await addFeedJob(connection, payerAccount, dataFeedAccount, jobTasks);
