import styles from './Table.module.scss'
import { useTranslation } from 'react-i18next'
import { GetUserResponse } from '../../../api/types'

export const Table = (usersData: GetUserResponse[]) => {
  const { t } = useTranslation()
  console.log(usersData)

  return (
    <table className={styles.table}>
      <tr>
        <th>Email</th>
        <th>{t('name')}</th>
        <th>{t('birthday')}</th>
        <th>{t('city')}</th>
        <th>{t('language')}</th>
        <th>{t('foreign')}</th>
        <th>{t('another_foreign')}</th>
      </tr>

      {Object.values(usersData).map((user) => (
        <tr>
          <td>{user.email}</td>
          <td>{user.name}</td>
          <td>{user.birthday}</td>
          <td>{user.city}</td>
          <td>{user.native_lang}</td>
          <td>{user.foreign_lang}</td>
          <td>{user.second_foreign_lang}</td>
        </tr>
      ))}
    </table>
  )
}
