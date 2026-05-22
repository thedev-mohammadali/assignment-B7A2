import { pool } from "../../db";
import type { IIssuePayload, IIssueQuery } from "./issue.interface";
import { addConditon, issueWithReporter } from "./issue.utils";

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

  if (status) addConditon("status", status, conditions, values);
  if (type) addConditon("type", type, conditions, values);

  if (conditions.length > 0) {
    sql += ` WHERE ${conditions.join(" AND ")}`;
  }

  sql += ` ORDER BY created_at ${sortParam}`;

  const result = await pool.query(sql, values);

  const issues = result.rows;

  return issueWithReporter(issues);
};

const getSingleIssueFromDB = async (id: number) => {
  const issueData = await pool.query(
    `
        SELECT * FROM issues
        WHERE id = $1
        `,
    [id],
  );

  if (issueData.rowCount === 0) {
    throw new Error("No issues found");
  }

  const formattedIssue = await issueWithReporter(issueData.rows);

  const issue = formattedIssue[0];

  if (!issue) {
    throw new Error("No issues found");
  }

  return issue;
};

const updateIssueIntoDB = async (
  payload: Partial<IIssuePayload>,
  id: number,
) => {
  const { title, description, type } = payload;

  if (!title && !description && !type) {
    throw new Error("No data provided for update!");
  }

  const result = await pool.query(
    `
    UPDATE issues
    SET
    title = COALESCE($1, title),
    description = COALESCE($2, description),
    type = COALESCE($3, type)

    WHERE id = $4
    RETURNING *
    `,
    [title, description, type, id],
  );

  return result;
};

const deleteIssueFromDB = async (id: number) => {
  //First check if any issue exist with the given ID
  await getSingleIssueFromDB(id);

  //Delete the issue with the given id
  await pool.query(
    `
    DELETE FROM issues
    WHERE id = $1
    `,
    [id],
  );
};

export const issueService = {
  createIssueIntoDB,
  deleteIssueFromDB,
  getAllIssuesFromDB,
  getSingleIssueFromDB,
  updateIssueIntoDB,
};
