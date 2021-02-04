import { render, h } from 'preact';

interface Props {
    icon: Icons
}

const Icon = ({ icon }: Props ) => {
    switch(icon) {
        case 'next': 
            return (
                <svg width="63" height="63" viewBox="0 0 63 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M31.5 63C48.897 63 63 48.897 63 31.5C63 14.103 48.897 0 31.5 0C14.103 0 0 14.103 0 31.5C0 48.897 14.103 63 31.5 63ZM31.5 63C48.888 63 63 48.888 63 31.5C63 14.112 48.888 0 31.5 0C14.112 0 0 14.112 0 31.5C0 48.888 14.112 63 31.5 63ZM34.65 37.7055H50.4V21.9555L44.0055 28.35C40.5405 24.444 35.532 21.9555 29.925 21.9555C21.042 21.9555 13.608 28.0665 11.592 36.3195L14.616 37.3275C16.2225 30.3345 22.4595 25.1055 29.925 25.1055C32.1783 25.1071 34.4044 25.598 36.4494 26.5443C38.4943 27.4907 40.3094 28.8699 41.769 30.5865L34.65 37.7055Z" fill="white"/>
                </svg>
            );    
    }
    return null;
}

export type Icons = 'next';

export default Icon;