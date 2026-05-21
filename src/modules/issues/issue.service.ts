import { pool } from "../../db";
import type { IIssue, IIssuePayload, IIssueQuery } from "./issue.interface";

const createIssueIntoDB = async (
  payload: IIssuePayload,
  reporterId: number,
) => {
  const { title, description, type } = payload;
  const result = await pool.query(
    `
        INSERT INTO issues(title, description, type, reporter_id)
        VALUES($1, $2, $3, $4)
        RETURNING *
        `,
    [title, description, type, reporterId],
  );

  return result.rows[0];
};

const getAllIssuesFromDB = async (queryParams: IIssueQuery) => {
  const { sort, status, type } = queryParams;

  let sql = `SELECT * FROM issues`;

  //define empty conditions and empty values to use in query
  //if any queryParams exist then simply push that to the variables
  const conditions: string[] = [];
  const values: string[] = [];

  //If sort exist and oldest then sort by Ascending order
  //If sort doesn't exist then default to Descending order
  const sortParam = sort === "oldest" ? "ASC" : "DESC";

  if (status) {
    values.push(status);
    conditions.push(`status = $${values.length}`);
  }

  if (type) {
    values.push(type);
    conditions.push(`type = $${values.length}`);
  }

  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }

  sql += ` ORDER BY created_at ${sortParam}`;

  const result = await pool.query(sql, values);

  const issues = result.rows;

  //check if there are any issues or not
  if (issues.length > 0) {
    //get all the reporter ids
    const reporterIds = [...new Set(issues.map((issue) => issue.reporter_id))];
    const condition = reporterIds.map((_, i) => `$${i + 1}`).join(", "); // '$1, $2, $3, ...'
    const reportersData = await pool.query(
      `
        SELECT id, name, email 
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
  }

  return [];
};

const getSingleIssueFromDB = async () => {};

const updateIssueIntoDB = async () => {};

const deleteIssueFromDB = async () => {};

export const issueService = {
  createIssueIntoDB,
  deleteIssueFromDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
  updateIssueIntoDB,
};
