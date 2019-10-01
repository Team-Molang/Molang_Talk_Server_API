export namespace DML {
	export const INSERT_USER = `
		INSERT INTO tb_user (
			udid,
			nick_name,
			gender,
			age,
			point,
			reg_date
		) VALUES (
			?,
			?,
			?,
			?,
			?,
			sysdate()
		)`
	export const GET_USER = 'SELECT * FROM tb_user WHERE udid = ?'
	export const GET_POINT = 'SELECT point FROM tb_point WHERE point_code = ?'
	export const INSERT_POINT_HISTORY = 'INSERT INTO tb_point_history ( user_id, point_code, point, reg_date) VALUES ( ?, ?, ?, sysdate() )'
	export const UPDATE_POINT = 'UPDATE tb_user SET point = point + ? WHERE id = ?'
	export const INSERT_ATTENDANCE = 'INSERT INTO tb_attendance (user_id, attendance_year, attendance_month, attendance_day, reg_date) VALUES (?, ?, ?, ?, sysdate())'
	export const GET_TODAY_ATTENDANCE = 'SELECT * FROM tb_attendance WHERE user_id = ? AND attendance_year = ? AND attendance_month = ? AND attendance_day = ?'
	export const GET_MONTHLY_ATTENDANCE = 'SELECT * FROM tb_attendance WHERE user_id = ? AND attendance_year = ? AND attendance_month = ?'
	export const INSERT_FILE = 'INSERT INTO tb_file (originalname, mimetype, size, location, udid, reg_date) VALUES (?, ?, ?, ?, ?, sysdate())'
}
