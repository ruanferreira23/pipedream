import common from "../common/common.mjs";
import bitbucket from "../../bitbucket.app.mjs";

export default {
  key: "bitbucket-create-snippet-comment",
  name: "Create Snippet Comment",
  description: "Creates a new snippet comment. [See docs here](https://developer.atlassian.com/cloud/bitbucket/rest/api-group-snippets/#api-snippets-workspace-encoded-id-comments-post)",
  version: "0.1.1",
  type: "action",
  props: {
    ...common.props,
    snippetId: {
      propDefinition: [
        bitbucket,
        "snippets",
        (c) => ({
          workspaceId: c.workspaceId,
        }),
      ],
    },
    rawContent: {
      propDefinition: [
        bitbucket,
        "rawContent",
      ],
    },
    htmlContent: {
      propDefinition: [
        bitbucket,
        "htmlContent",
      ],
    },
    markupContent: {
      propDefinition: [
        bitbucket,
        "markupContent",
      ],
    },
  },
  async run({ $ }) {
    const {
      workspaceId,
      snippetId,
      rawContent,
      htmlContent,
      markupContent,
    } = this;

    const response = await this.bitbucket.createSnippetComment({
      workspaceId,
      snippetId,
      data: {
        content: {
          raw: rawContent,
          html: htmlContent,
          markup: markupContent,
        },
      },
    }, $);

    $.export("summary", "Successfully created snippet comment");

    return response;
  },
};
