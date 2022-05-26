export type SlackUrlConverter = {
    workspaceUrl: string,
    clientUrl: string,
}

const CHANNEL_ID_PATTERN = "[A-Z0-9]+";
const WORKSPACE_MESSAGE_ID_PATTERN = "p[0-9]{16}";
const CLIENT_MESSAGE_ID_PATTERN = "[0-9]{10}.[0-9]{6}";

export const WORKSPACE_URL_PATTERN = "^https://[a-z0-9]+[a-z0-9\-]+.slack.com/";
export const WORKSPACE_BASE_URL_PATTERN = `${WORKSPACE_URL_PATTERN}$`;
export const CLIENT_URL_PATTERN = `^https://app.slack.com/client/${CHANNEL_ID_PATTERN}/`
export const CLIENT_BASE_URL_PATTERN = `${CLIENT_URL_PATTERN}$`;

const SLACK_URL_PATTERN = `(${WORKSPACE_URL_PATTERN}|${CLIENT_URL_PATTERN})`;
export const slackUrlRegex = new RegExp(SLACK_URL_PATTERN);

export const convertWorkspaceUrlToClientUrl = (workspaceBaseUrl: string, clientBaseUrl: string, workspaceUrl: string): string => {
    // ^https://<workspaceId>.slack.com/archives/
    const workspaceUrlPattern = `^${workspaceBaseUrl}archives/`

    // ^https://<workspaceId>.slack.com/archives/[A-Z0-9]+
    const workspaceChannelUrlPattern = `${workspaceUrlPattern}${CHANNEL_ID_PATTERN}`;
    const workspaceChannelUrlRegex = new RegExp(workspaceChannelUrlPattern);
    // ^https://<workspaceId>.slack.com/archives/[A-Z0-9]+/p[0-9]{16}
    const workspaceMessageUrlPattern = `${workspaceChannelUrlPattern}/${WORKSPACE_MESSAGE_ID_PATTERN}`;
    const workspaceMessageUrlRegex = new RegExp(workspaceMessageUrlPattern);
    // ^https://<workspaceId>.slack.com/archives/[A-Z0-9]+/p[0-9]{16}\?thread_ts=[0-9]{10}.[0-9]{6}&cid=[A-Z0-9]+
    const workspaceThreadMessageUrlPattern = `${workspaceMessageUrlPattern}\\?thread_ts=${CLIENT_MESSAGE_ID_PATTERN}&cid=${CHANNEL_ID_PATTERN}`;
    const workspaceThreadMessageUrlRegex = new RegExp(workspaceThreadMessageUrlPattern);

    const extractChannelIdFromWorkspaceUrl = (workspaceUrl: string): string => {
        const _workspaceChannelUrl = workspaceChannelUrlRegex.exec(workspaceUrl)[0];
        const channelId = _workspaceChannelUrl.split("/").slice(-1)[0];
        return channelId;
    };

    const extractMessageIdFromWorkspaceUrl = (workspaceUrl: string): string => {
        const _workspaceMessageUrl = workspaceMessageUrlRegex.exec(workspaceUrl)[0];
        const messageId = _workspaceMessageUrl.split("/").slice(-1)[0];
        return messageId;
    };

    const extractThreadTsFromWorkspaceUrl = (workspaceUrl: string): string => {
        const _workspaceThreadMessageUrl = workspaceThreadMessageUrlRegex.exec(workspaceUrl)[0];
        const query_param = _workspaceThreadMessageUrl.split("?").slice(-1)[0];
        const query_param_list = query_param.split("&");
        const thread_ts = query_param_list[0].replace("thread_ts=", "");
        return thread_ts
    };

    if (workspaceThreadMessageUrlRegex.test(workspaceUrl)) {
        const channelId = extractChannelIdFromWorkspaceUrl(workspaceUrl);
        const thread_ts = extractThreadTsFromWorkspaceUrl(workspaceUrl);
        const clientThreadMessageUrl = `${clientBaseUrl}${channelId}/thread/${channelId}-${thread_ts}`
        return clientThreadMessageUrl;
    } else if (workspaceMessageUrlRegex.test(workspaceUrl)) {
        const channelId = extractChannelIdFromWorkspaceUrl(workspaceUrl);
        const workspaceMessageId = extractMessageIdFromWorkspaceUrl(workspaceUrl);
        const clientMessageId = `${workspaceMessageId.slice(1, 11)}.${workspaceMessageId.slice(11, 11 + 6)}`
        const clientMessageUrl = `${clientBaseUrl}${channelId}/${clientMessageId}`;
        return clientMessageUrl;
    } else if (workspaceChannelUrlRegex.test(workspaceUrl)) {
        const channelId = extractChannelIdFromWorkspaceUrl(workspaceUrl);
        const clientChannelUrl = `${clientBaseUrl}${channelId}`;
        return clientChannelUrl;
    } else {
        console.log("workspaceUrl is not matched:", workspaceUrl);
        return "";
    }
};