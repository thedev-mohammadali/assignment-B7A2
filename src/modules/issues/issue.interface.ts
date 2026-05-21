export interface IIssuePayload {
  title: string;
  description: string;
  type: string;
}

export interface IIssueQuery {
  sort?: "newest" | "oldest";
  type?: "bug" | "feature_request";
  status?: "open" | "in_progress" | "resolved";
}
