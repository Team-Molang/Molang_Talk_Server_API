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
	export const GET_USER = 'SELECT * FROM tb_user WHERE id = ?'
	export const GET_USER_EXIST = 'SELECT * FROM tb_user WHERE udid = ?'
	export const GET_POINT = 'SELECT point FROM tb_point WHERE point_code = ?'
	export const INSERT_POINT_HISTORY = 'INSERT INTO tb_point_history ( user_id, point_code, point, reg_date) VALUES ( ?, ?, ?, sysdate() )'
	export const UPDATE_POINT = 'UPDATE tb_user SET point = point + ? WHERE id = ?'
	export const INSERT_ATTENDANCE = 'INSERT INTO tb_attendance (user_id, attendance_year, attendance_month, attendance_day, reg_date) VALUES (?, ?, ?, ?, sysdate())'
	export const GET_TODAY_ATTENDANCE = 'SELECT * FROM tb_attendance WHERE user_id = ? AND attendance_year = ? AND attendance_month = ? AND attendance_day = ?'
	export const GET_MONTHLY_ATTENDANCE = 'SELECT * FROM tb_attendance WHERE user_id = ? AND attendance_year = ? AND attendance_month = ?'
	export const INSERT_FILE = 'INSERT INTO tb_file (originalname, mimetype, size, location, udid, reg_date) VALUES (?, ?, ?, ?, ?, sysdate())'
	export const UPDATE_USER = 'UPDATE tb_user SET nick_name = ?, age = ?, profile = ? WHERE id = ?'
	export const GET_POINT_HISTORY = `
		SELECT
			P.point_name,
			PH.point,
    	PH.reg_date
		FROM
			tb_point P
			INNER JOIN tb_point_history PH ON P.point_code = PH.point_code
		WHERE
			PH.user_id = ?
		ORDER BY
			PH.id DESC
	`
	export const GET_AMS = 'SELECT * FROM tb_ams WHERE os = ? ORDER BY id DESC LIMIT 1'
	export const UPDATE_PUSH_KEY = 'UPDATE tb_user SET push_key = ? WHERE id = ?'

	export const GET_EVERYONE_MATCHING = 'SELECT * FROM tb_matching WHERE type = "EVERYONE" AND status = "WAIT" AND user_id != ? LIMIT 1 '
	export const GET_DIFFERENT_GENDER_MATCHING = 'SELECT * FROM tb_matching WHERE status = "WAIT" AND user_id != ? AND gender != ? LIMIT 1 '
	export const INSERT_NEW_MATCHING = `
		INSERT INTO tb_matching (
			user_id,
			type,
			gender,
			status,
			reg_date
		) VALUES (
			?,
			?,
			?,
			'WAIT',
			sysdate()
		)
	`
	export const GET_MY_MATCHING = 'SELECT * FROM tb_matching WHERE status = "WAIT" AND user_id = ?'
	export const UPDATE_CANCEL_MATCHING = 'UPDATE tb_matching SET status = "CANCEL" WHERE status = "WAIT" AND user_id = ?'
	export const UPDATE_MATCHING = 'UPDATE tb_matching SET status = "MATCHING" WHERE status = "WAIT" AND user_id = ?'
	export const INSERT_MATCHING = `
		INSERT INTO tb_matching (
			user_id,
			type,
			gender,
			status,
			reg_date
		) VALUES (
			?,
			?,
			?,
			'MATCHING',
			sysdate()
		)
	`
}
