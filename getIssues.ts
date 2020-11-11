import axios from "axios";
import * as dotenv from "dotenv";
dotenv.config();
const auth = Buffer.from(`ol.ya.nik.dev@gmail.com:${process.env.KEY}`).toString('base64');

const getIssues = async (status) => {
    const query = `project = project AND status = '${status}'`;
    try {
        const res = await axios.get(`https://ol-ya.atlassian.net/rest/api/3/search?jql=${encodeURIComponent(query)}`, {
            headers: {
                'Authorization': `Basic ${auth}`,
                'Accept': 'application/json',
            },
        });
        const withStatus = res.data.issues.map(issue => issue = issue.key + ": " + issue.fields.summary);
        console.log(withStatus);
    } catch (err) {
        console.log(err);
    }
};

getIssues("In progress");
