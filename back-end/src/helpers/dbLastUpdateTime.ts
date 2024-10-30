import db from "../db/db";

export const getLastUpdateTime = async (
  key: string,
): Promise<Date | undefined> => {
  const lastUpdateTimeResult = await db.query(
    ` 
    SELECT time_entry
    FROM timestamps
    WHERE id = $1;
  `,
    [key],
  );
  if (lastUpdateTimeResult.rowCount == 0) {
    await db.query(
      `
      INSERT INTO timestamps
      (id, time_entry)
      VALUES ($1, NOW());
    `,
      [key],
    );
    return;
  }

  return lastUpdateTimeResult.rows[0].time_entry as Date;
};

export const updateLastUpdateTime = async (key: string) => {
  await db.query(
    `
      UPDATE timestamps
      SET time_entry = NOW()
      WHERE id = $1;
    `,
    [key],
  );
};
