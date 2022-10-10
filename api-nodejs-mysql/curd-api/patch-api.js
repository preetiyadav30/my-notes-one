//1 controller -  cd function 
editUser = async ({
    firstName,
    lastName,
    email,
    address
  }) => {
   
    firstName = firstName ?? null;
    lastName = lastName ?? null;
    email = email ?? null;
    address = address ?? null;

    let sql = `UPDATE ${this.tableName}
        SET firstName = IFNULL(?, firstName), lastName = IFNULL(?, lastName), email=IFNULL(?, email), address = IFNULL(?, address) WHERE userId = ?`;

    let result = await query(sql, [
      firstName,
      lastName,
      email,
      address
    ]);

    return result;
  };
  // 2 With a forEach:
  const buildPatchQueryy = (table, id, data) => {
    if (Object.keys(data).length === 0) return null; // Or return what you want
    let sql = `UPDATE ${table} SET`;
    Object.entries(data).forEach(([key, value]) => {
        const valueToSet = typeof data[key] === 'string' ? `'${value}'` : value;
        sql += ` ${key}=${valueToSet},`;
    });
    sql = sql.slice(0, -1); // Remove last ","
    sql += ` WHERE id=${id};`;
    return sql;
}
// 3 With a map:
const buildPatchQuery = (table, id, data) => {
    if (Object.keys(data).length === 0) return null; // Or return what you want
    let query = `UPDATE ${table} SET `;
    query += Object.keys(data).map((key) => {
        const valueToSet = typeof data[key] === 'string' ? `'${data[key]}'` : data[key];
        return `${key}=${valueToSet}`;
    }).join(', ');
    return query + ` WHERE id=${id};`;
}
// 3 With a reduce:
const buildPatchQueryyy = (table, id, data) => {
    if (Object.keys(data).length === 0) return null; // Or return what you want
    let query = `UPDATE ${table} SET`;
    query += Object.entries(data).reduce((acc, [key, value], index, array) => {
        const valueToSet = typeof data[key] === 'string' ? `'${value}'` : value;
        const optionalComma = index < array.length-1 ? ',' : '';
        return `${acc} ${key}=${valueToSet}${optionalComma}`;
    }, '');
    return query + ` WHERE id=${id};`;
}