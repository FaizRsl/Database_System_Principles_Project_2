// import styles from "../App.css";
// import { useState } from 'react';
// import Spinner from 'react-bootstrap/Spinner'
// import Toast from 'react-bootstrap/Toast'

// const Messages = () =>{
//     const [output, setOutput] = useState({
//         "data": {},
//         "bestPlanId": 1,
//         "status": "",
//         "error": false
//       });
//     const [showPredicateWarning, setShowPredicateWarning] = useState(false);
//     const [showLoading, setShowLoading] = useState(false);
//     const [showSuccess, setShowSuccess] = useState(false);
//     const [showError, setShowError] = useState(false);
//     return(
//             <>
//               <div className={styles.toastWrapper}>
//                 <Toast bsPrefix={styles.toastError} animation={true} autohide={true} delay={3000} onClose={() => {setShowPredicateWarning(false)}} show={showPredicateWarning}>
//                   <Toast.Header bsPrefix={styles.toastHeader}>Too many predicates!</Toast.Header>
//                   <Toast.Body bsPrefix={styles.toastBody}>You may not select more than 4 predicates.</Toast.Body>
//                 </Toast>
//               </div>
    
//               <div className={styles.toastWrapper}>
//                 <Toast bsPrefix={styles.toastLoading} animation={true} autohide={false} delay={3000} onClose={() => {setShowLoading(false)}} show={showLoading}>
//                   <div className={styles.toastLoadingWrapper}>
//                     <Spinner animation="border" size="sm" variant="light" as="span" role="status"></Spinner>
//                     <Toast.Header bsPrefix={styles.toastHeader}>Loading data...</Toast.Header>
//                   </div>
//                   <Toast.Body bsPrefix={styles.toastBody}>Please wait patiently - this could take a while.</Toast.Body>
//                 </Toast>
//               </div>
    
//               <div className={styles.toastWrapper}>
//                 <Toast bsPrefix={styles.toastSuccess} animation={true} autohide={true} delay={3000} onClose={() => {setShowSuccess(false)}} show={showSuccess}>
//                   <Toast.Header bsPrefix={styles.toastHeader}>Success!</Toast.Header>
//                   <Toast.Body bsPrefix={styles.toastBody}>Data loaded. Please see the output for the results.</Toast.Body>
//                 </Toast>
//               </div>
    
//               <div className={styles.toastWrapper}>
//                 <Toast bsPrefix={styles.toastError} animation={true} autohide={true} delay={8000} onClose={() => {setShowError(false)}} show={showError}>
//                   <Toast.Header bsPrefix={styles.toastHeader}>Error!</Toast.Header>
//                   <Toast.Body bsPrefix={styles.toastBody}>{output.status}</Toast.Body>
//                 </Toast>
//               </div>
//             </>
//     )
// }

// export default Messages;