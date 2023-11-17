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
      return <option>No plans to display</option>;
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
        <p>No plans are available because no query has been sent. Send a query using in the form above!</p>
      )
    }
    // There is only one plan, which is the plan that the DBMS returns for the specified query. i.e. no valid predicates selected
    else if (props.output["bestPlanId"] === 0 && Object.keys(props.output["data"]).length === 1) {
      return (
        <>
          <p><b>No alternative QEPs to consider</b></p>
          <p>No valid predicates were given to explore the neighbouring selectivity space of the given query. Unable to compare the QEP with other alternatives.</p>
          <p>Please select a valid predicate to get started.</p>
        </>
      )
    }
    // If we have data, check what's the best plan
    else if (props.output["bestPlanId"] === 0) {
      return (
        <>
          <p><b>Original QEP is the best estimate.</b></p>
          <p>The original QEP is calculated to have the lowest estimated cost per row, compared to all alternative plans within the neighbouring selectivity space of the given predicates.</p>
          <p>This shows that PostgreSQL made the most optimal decision in choosing the QEP, and alternative QEPs in the neighbouring selectivity range do not show any substantial performance advantages.</p>
          <p><i>Keep in mind that these are only estimated costs, and the actual execution results may vary.</i></p>
        </>
      );
    } 
    else if (props.output["bestPlanId"] !== 0) {
      return (
        <>
          <p><b>May have better QEPs than the original plan.</b></p>
          <p>The estimated cost per row of the original QEP at <i><b>{parseFloat(props.output["data"][0]["estimated_cost_per_row"]).toFixed(3)}</b></i> is not the lowest among all alternative plans within the neighbouring selectivity space of the given predicates. PostgreSQL might not have made the most optimal decision when selecting QEP.</p>
          <p>We found that the alternative Plan {props.output["bestPlanId"]} has a lower estimated cost per row compared to the original QEP at <i><b>{parseFloat(props.output["data"][props.output["bestPlanId"]]["estimated_cost_per_row"]).toFixed(3)}.</b></i> It might be worth exploring Plan {props.output["bestPlanId"]} to avoid higher incurred costs and performance loss.</p>
          <p><i>Keep in mind that these are only estimated costs, and the actual execution results may vary.</i></p>

        </>
      )
    }
    // Handle edge cases if any
    else {
      return (
        <p>An unknown error occured! ((:</p>
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
      <h3 style={{ textAlign: "center", marginBottom: "1rem", color: "#3700B3"}}>Was the original plan the best plan?</h3>
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
            <h3 style={{ textAlign: "center", color: "#3700B3"}}>Query Execution Plans</h3>
            <p style={{ textAlign: "center", color: "black" }}>Original QEP and other QEPs (if any).</p>
          </div>
          <div class="col-md-4">
            <h3 style={{ textAlign: "center", color: "#3700B3" }}>Graphs</h3>
            <p style={{ textAlign: "center", color: "black" }}>Click on a node in the graph for more information.</p>
          </div>
          <div class="col-md-4">
            <h3 style={{ textAlign: "center", color: "#3700B3" }}>Explanations</h3>
            <p style={{ textAlign: "center", color: "black" }}>Natural language explanation of the QEP</p>
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