import styles from './footer.module.css';

export default function Footer() {  
    return (
        <footer className={`${styles.footer} text-center p-4 bg-gray-300`}>
            <p>&copy; 2024 E-commerce Website. All rights reserved.</p>
        </footer>
    );
}
