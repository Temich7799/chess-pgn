import { ReactNode } from 'react';
import styles from './StyledForm.module.scss';

const StyledForm: React.FC<{ children: ReactNode }> = ({ children }) => {

    return (
        <div className={styles.formWrapper}>
            {children}
        </div>
    )
}

export default StyledForm;