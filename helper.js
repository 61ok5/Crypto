const Helper = {}

Helper.getEquations = (obj1, operator, obj2) => {


    switch (operator) {
        case "+":
            return obj1 + obj2
        case "-":
            return obj1 - obj2
        case "==":
            return obj1 == obj2
        case "!=":
            return obj1 != obj2
        case "*":
            return obj1 * obj2
        case "/":
            return obj1 / obj2
        case ">":
            return obj1 > obj2
        case ">=":
            return obj1 >= obj2
        case "<":
            return obj1 < obj2
        case "<=":
            return obj1 <= obj2
        case "%":
            return obj1 % obj2
    }


}

Helper.jsonTryParse = (str) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return str;
    }
}

Helper.genInsert = (table_name, columns, onDuplicateUpdateColumns) => {
    joinedCol = `(\`${columns.join('`,`')}\`)`;
    paras = ` VALUES (${Array(columns.length).fill('?').join(',')})`;
    ondup = onDuplicateUpdateColumns ? " ON DUPLICATE KEY UPDATE " + onDuplicateUpdateColumns.map(el => `\`${el}\` = VALUES(\`${el}\`)`).join(',') : '';
    return `INSERT INTO \`${table_name}\` ` + joinedCol + paras + ondup;
}

Helper.genMultiRowInsert = (table_name, columns, onDuplicateUpdateColumns) => {
    joinedCol = `(\`${columns.join('`,`')}\`)`;
    paras = ` VALUES ?`;
    ondup = onDuplicateUpdateColumns ? " ON DUPLICATE KEY UPDATE " + onDuplicateUpdateColumns.map(el => `\`${el}\` = VALUES(\`${el}\`)`).join(',') : '';
    return `INSERT INTO \`${table_name}\` ` + joinedCol + paras + ondup;
}

Helper.genUpdate = (table_name, columns) => {
    joinedCol = `\`${columns.join('`=?,`')}\`=?`;
    return `UPDATE \`${table_name}\` SET ` + joinedCol;
}

Helper.operators = {
    '+': (v1, v2) => parseFloat(v1) + parseFloat(v2),
    '-': (v1, v2) => parseFloat(v1) - parseFloat(v2),
    '*': (v1, v2) => parseFloat(v1) * parseFloat(v2),
    '/': (v1, v2) => parseFloat(v1) / parseFloat(v2),
    '^': (v1, v2) => Math.pow(parseFloat(v1), parseFloat(v2)),
    '%': (v1, v2) => parseFloat(v1) % parseFloat(v2),
    '==': (v1, v2) => parseFloat(v1) == parseFloat(v2),
    '!=': (v1, v2) => parseFloat(v1) != parseFloat(v2),
    '>': (v1, v2) => parseFloat(v1) > parseFloat(v2),
    '>=': (v1, v2) => parseFloat(v1) >= parseFloat(v2),
    '<': (v1, v2) => parseFloat(v1) < parseFloat(v2),
    '<=': (v1, v2) => parseFloat(v1) <= parseFloat(v2)
}

Helper.arrayToObject = (array, keyname, valuename) => {
    return array.reduce((obj, item) => ({
        ...obj,
        [item[keyname]]: valuename ? item[valuename] : item,
    }), {});
};

Helper.insort_arr_obj= (array, value, sort_key, is_asc) => {
    var low = 0,
        high = array.length;

    while (low < high) {
        var mid = low + high >>> 1;
        if (is_asc ? array[mid][sort_key] < value[sort_key] : array[mid][sort_key] > value[sort_key]) low = mid + 1;
        else high = mid;
    }
    array.splice(low, 0, value);
    return;
}

module.exports = Helper
