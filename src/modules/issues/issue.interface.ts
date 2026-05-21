export interface IIssuePayload {
  title: string;
  description: string;
  type: string;
}

export type IssueType = "bug" | "feature_request";
export type IssueStatus = "open" | "in_progress" | "resolved";

export interface IIssueQuery {
  sort?: "newest" | "oldest";
  type?: IssueType;
  status?: IssueStatus;
}

export interface IIssue {
  id: number;
  title: string;
  description: string;
  type: IssueType;
  status: IssueStatus;
  reporter_id: number;
  created_at: Date;
  updated_at: Date;
}
