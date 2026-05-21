import { pool } from "../../db";
import type { IIssue } from "./issue.interface";

export const issueWithReporter = async (issues: IIssue[]) => {
  if (issues.length === 0) {
    return [];
  }
  //get all the reporter ids
  const reporterIds = [...new Set(issues.map((issue) => issue.reporter_id))];
  const condition = reporterIds.map((_, i) => `$${i + 1}`).join(", "); // '$1, $2, $3, ...'
  const reportersData = await pool.query(
    `
        SELECT id, name, role
        FROM users
        WHERE id IN (${condition})
        `,
    reporterIds,
  );

  const reporters = reportersData.rows;

  const reporterMap = new Map(
    reporters.map((reporter) => [reporter.id, reporter]),
  );

  const formattedIssues = issues.map((issue: IIssue) => {
    return {
      id: issue.id,
      title: issue.title,
      description: issue.description,
      type: issue.type,
      status: issue.status,
      reporter: reporterMap.get(issue.reporter_id),
      created_at: issue.created_at,
      updated_at: issue.updated_at,
    };
  });

  return formattedIssues;
};
