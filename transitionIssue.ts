import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();
const auth = Buffer.from(`ol.ya.nik.dev@gmail.com:${process.env.KEY}`).toString('base64');

const getTransitions = async (issueIdOrKey: string) => {
    try {
        const res = await axios.get(`https://ol-ya.atlassian.net/rest/api/3/issue/${issueIdOrKey}/transitions`, {
            headers: {
                'Authorization': `Basic ${auth}`,
                'Accept': 'application/json',
            },
        });
        return res.data.transitions;
    } catch (err) {
        console.error(err);
    }
};

const transitionIssue = async (issueIdOrKey: string, status: string) => {
    let transitionId;
    const transitions = await getTransitions(issueIdOrKey);
    for (const transition of transitions) {
        if (transition.name === status) {
            transitionId = transition.id;
        }
    }
    const bodyData = {
        "transition": {
            "id": transitionId,
        },
    };
    try {
        const res = await axios.post(`https://ol-ya.atlassian.net/rest/api/3/issue/${issueIdOrKey}/transitions`, JSON.stringify(bodyData), {
            headers: {
                'Authorization': `Basic ${auth}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
        if (res.status === 204) {
            console.log(`${issueIdOrKey} is ${status}`);
        }
    } catch (err) {
        console.error(err);
    }
};

transitionIssue("PROJ-1", "To Do");
