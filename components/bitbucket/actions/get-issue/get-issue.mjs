import common from "../common/common.mjs";
import bitbucket from "../../bitbucket.app.mjs";

export default {
  key: "bitbucket-get-issue",
  name: "Get issue",
  description: "Get a issue. [See docs here](https://developer.atlassian.com/cloud/bitbucket/rest/api-group-issue-tracker/#api-repositories-workspace-repo-slug-issues-issue-id-get)",
  version: "0.1.2",
  type: "action",
  props: {
    ...common.props,
    repositoryId: {
      propDefinition: [
        bitbucket,
        "repositories",
        (c) => ({
          workspaceId: c.workspaceId,
        }),
      ],
    },
    issueId: {
      propDefinition: [
        bitbucket,
        "issues",
        (c) => ({
          workspaceId: c.workspaceId,
          repositoryId: c.repositoryId,
        }),
      ],
    },
  },
  async run({ $ }) {
    const {
      workspaceId,
      repositoryId,
      issueId,
    } = this;

    const response = await this.bitbucket.getIssue({
      workspaceId,
      repositoryId,
      issueId,
    }, $);

    $.export("summary", "Successfully retrieved issue");

    return response;
  },
};
