import { useState, useEffect } from "react";

import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import PlanComparison from "../PlanComparison/PlanComparison";
import QueryVisualizer from "../QueryVisualizer/QueryVisualizer";

import styles from "./FormOutput.module.css";

const FormOutput = (props) => {

  const [planSelected, setPlanSelected] = useState([0, props.output["bestPlanId"]]);
  const [showInformation, setShowInformation] = useState(false);

  useEffect(() => {
    setPlanSelected((oldState) => {
      let newState = [...oldState];
      newState[1] = props.output["bestPlanId"];
      return (newState);
    })
  }, [props.output])

  useEffect(() => {
    if (showInformation) {
      document.body.classList.add(styles.noScroll);
    }
  }, [showInformation])

  // Render alternative plan selection
  const renderAlternativeSelector = () => {
    if (props.output["error"] === false && props.output["data"].hasOwnProperty(0)) {
      return (
        Object.keys(props.output["data"]).map((key) => {
          if (key === 0 || key === "0") {
            return (
              <option key={key} value={key}>Original plan</option>
            )
          }
          else {
            return (
              <option key={key} value={key}>Alternative plan {key}</option>
            )
          }
        })
      );
    }
    else {
      return <option>No plans available</option>;
    }
  }

  // Changes which plan is selected to compare
  const handleSelect = (planId, event) => {
    if (planId === 0) {
      setPlanSelected((oldState) => {
        let newState = [...oldState];
        newState[0] = event.target.value;
        return (newState);
      })
    }
    else {
      setPlanSelected((oldState) => {
        let newState = [...oldState];
        newState[1] = event.target.value;
        return (newState);
      })
    }
  }

  const parseExplanation = (planId) => {
    if (props.output["error"] === false && props.output["data"].hasOwnProperty(planId)) {
      return (
        <ol>
          {props.output["data"][planId]["explanation"].map((step, index) => {
            return (
              <li key={index}>{step}</li>
            )
          })}
        </ol >
      );
    }
    else {
      return (
        <div className={styles.explanationLoadingWrapper}>No data to show</div>
      );
    }
  }

  // Renders an output explanation for optimal plan, or displays error messages.
  const renderOutputMessage = () => {
    // Error message output
    if (props.output["error"]) {
      return (
        <p>{props.output["status"]}</p>
      )
    }
    // No data message output
    else if (!props.output["data"].hasOwnProperty(0)) {
      return (
        <p>No plans available. Please send a query first.</p>
      )
    }
    // There is only one plan, which is the plan that the DBMS returns for the specified query. i.e. no valid predicates selected
    else if (props.output["bestPlanId"] === 0 && Object.keys(props.output["data"]).length === 1) {
      return (
        <>
          <p><b>No alternative QEPs to consider</b></p>
          <p>No valid predicates were given to explore the neighbouring selectivity space of the given query. Therefore we are unable to compare the QEP for your specified query with other potential alternatives.</p>
          <p>Please select a valid predicate to get started.</p>
        </>
      )
    }
    // If we have data, check what's the best plan. If it's the original, then just say it like you mean it.
    else if (props.output["bestPlanId"] === 0) {
      return (
        <>
          <p><b>Original QEP is the best estimate.</b></p>
          <p>The estimated cost per row of the original QEP generated by the input query is the lowest among all plans that are different from the original QEP in the neighbouring selectivity space of the predicates that have been varied.</p>
          <p>This implies that PostgreSQL managed to make the optimal decision when selecting the QEP, and all other different QEPs in the neighbouring selectivity space do not produce significant performance benefits.</p>
          <p><i>Do note that these are all estimates, actual execution results may differ.</i></p>
        </>
      );
    } 
    else if (props.output["bestPlanId"] !== 0) {
      return (
        <>
          <p><b>There may be better QEPs than the original plan.</b></p>
          <p>The estimated cost per row of the original QEP at <i><b>{parseFloat(props.output["data"][0]["estimated_cost_per_row"]).toFixed(3)}</b></i> is not the lowest among all plans that are different in the neighbouring selectivity space of the predicates that have been varied. This implies that PostgreSQL might have made a suboptimal decision when selecting the QEP.</p>
          <p>Comparatively, Plan {props.output["bestPlanId"]} is an alternative plan from the original QEP and has a lower estimated cost per row compared to the original QEP at <i><b>{parseFloat(props.output["data"][props.output["bestPlanId"]]["estimated_cost_per_row"]).toFixed(3)}.</b></i> It might be worth exploring Plan {props.output["bestPlanId"]} in the event that PostgreSQL made a fine-grain decision for this specific query, causing performance loss.</p>
          <p><i>Do note that these are all estimates, actual execution results may differ.</i></p>

        </>
      )
    }
    // Handle edge cases if any
    else {
      return (
        <p>An unknown error occured. Please hit up Chuan Xin! ((:</p>
      )
    }
  }

  const handleShowInformation = () => {
    setShowInformation(true);
  }

  return (
    <>
      <h1 className={styles.outputHeader}>QEP Analysis</h1>
      <hr />
      <br />
      <h3 style={{ textAlign: "center", marginBottom: "1rem" }}>Was the original plan the best plan?</h3>
      <Form.Row className={styles.outputMessageRow}>
        <Form.Group as={Col} controlId="formOutputMessage">
          <div className={styles.outputMessageWrapper}>
            {renderOutputMessage()}
          </div>
        </Form.Group>
      </Form.Row>      
      <Form.Row>
      <Form.Group as={Col} controlId="formPlanSelector2">
          <Form.Label><b>Select plan:</b></Form.Label>
          <Form.Control as="select" value={planSelected[1]} onChange={(event) => {handleSelect(1, event)}}>
            {renderAlternativeSelector()}
          </Form.Control>
        </Form.Group>
      </Form.Row>
      <Form.Row  style={{paddingTop: '20px'}}>
          <div class="col-md-4">
            <h3 style={{ textAlign: "center" }}>Query Execution Plans</h3>
            <p style={{ textAlign: "center" }}>The original QEP, and other QEPs.</p>
          </div>
          <div class="col-md-4">
            <h3 style={{ textAlign: "center" }}>Graphs</h3>
            <p style={{ textAlign: "center" }}>Click on a node in the graph for more information.</p>
          </div>
          <div class="col-md-4">
            <h3 style={{ textAlign: "center" }}>Explanations</h3>
            <p style={{ textAlign: "center" }}>Text explanation of the QEP</p>
          </div>  
      </Form.Row>
      <br/> 
      <hr />
      <Form.Row>
        <Form.Group as={Col} controlId="formPlanComparison2">
          <PlanComparison output={props.output} planId={planSelected[1]}/>
        </Form.Group>
        <Form.Group as={Col} controlId="formGraph2">
          <QueryVisualizer output={props.output} planId={planSelected[1]}/>
        </Form.Group>
        <Form.Group as={Col} controlId="formExplanation2">
          <div className={styles.explanationWrapper} >
            {parseExplanation(planSelected[1])}
          </div>
        </Form.Group>
      </Form.Row>
    </>
  )
}

export default FormOutput;