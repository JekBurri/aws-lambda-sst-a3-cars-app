import { useState, useEffect } from "react";

import "sweetalert2/dist/sweetalert2.css";
import "./CarLoanCalculator.css";

const Finance = () => {
  const [principal, setPrincipal] = useState(0);
  const [interestRate, setInterestRate] = useState(4.0);
  const [loanTerm, setLoanTerm] = useState(3);
  const [downPayment, setDownPayment] = useState(0);
  const [tradeInValue, setTradeInValue] = useState(0);
  const [paymentFrequency, setPaymentFrequency] = useState<any>("biweekly");
  const [monthlyPayment, setMonthlyPayment] = useState<any>(0);
  const [resultTitle, setResultTitle] = useState<any>("Monthly Payment:");
  const [totalBorrowedCost, setTotalBorrowedCost] = useState<any>(0);
  const [remainingPrincipalCost, setRemainingPrincipalCost] = useState<any>(0);

  useEffect(() => {
    calculateMonthlyPayment();
  }, [
    principal,
    interestRate,
    loanTerm,
    downPayment,
    tradeInValue,
    paymentFrequency,
  ]);

  const calculateMonthlyPayment = () => {
    const monthlyInterestRate = interestRate / 100 / getPaymentsPerYear();
    const totalPayments = loanTerm * getPaymentsPerYear();
    const loanAmount = principal - downPayment - tradeInValue; // Updated calculation
    const numerator =
      loanAmount *
      monthlyInterestRate *
      Math.pow(1 + monthlyInterestRate, totalPayments);
    const denominator = Math.pow(1 + monthlyInterestRate, totalPayments) - 1;
    const monthlyPayment = numerator / denominator;
    setMonthlyPayment(monthlyPayment.toFixed(2));

    let frequencyLabel = "";
    if (paymentFrequency === "weekly") {
      frequencyLabel = "Weekly";
    } else if (paymentFrequency === "biweekly") {
      frequencyLabel = "Biweekly";
    } else {
      frequencyLabel = "Monthly";
    }

    setResultTitle(frequencyLabel + " Payment:");

    const totalBorrowedCost =
      monthlyPayment * loanTerm * getPaymentsPerYear() -
      (principal - downPayment - tradeInValue); // Updated calculation
    setTotalBorrowedCost(totalBorrowedCost.toFixed(2));

    const remainingPrincipalCost = principal - downPayment - tradeInValue; // Updated calculation
    setRemainingPrincipalCost(remainingPrincipalCost.toFixed(2));
  };

  const handleInputChange = (event: any, setState: any) => {
    setState(parseFloat(event.target.value));
  };

  const handlePaymentFrequencyChange = (event: any) => {
    setPaymentFrequency(event.target.value);
  };

  const getPaymentsPerYear = () => {
    if (paymentFrequency === "weekly") {
      return 52;
    } else if (paymentFrequency === "biweekly") {
      return 26;
    } else {
      return 12;
    }
  };

  return (<>
    <div className="max-w-xl mx-auto px-4 space-y-4 rounded-lg shadow-lg">
      
      <div className="calculator-form">
        <div className="form-section">
          <div className="input-field">
            
            <label htmlFor="principal">Car Price:</label>
            <div className="input-with-symbol">
              <input
                type="number"
                id="principal"
                value={principal}
                onChange={(e) => handleInputChange(e, setPrincipal)}
                required
              />
            </div>
            <span className="tooltip">The total amount of the car.</span>
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <div className="input-field">
              
              <label htmlFor="downPayment">Down Payment:</label>
              <div className="input-with-symbol">
                <input
                  type="number"
                  id="downPayment"
                  value={downPayment}
                  onChange={(e) => handleInputChange(e, setDownPayment)}
                  required
                />
              </div>
              <span className="tooltip">
                The down payment amount for the car.
              </span>
            </div>

            <div className="input-field">
              
              <label htmlFor="tradeInValue">Trade-In Value:</label>
              <div className="input-with-symbol">
                <input
                  type="number"
                  id="tradeInValue"
                  value={tradeInValue}
                  onChange={(e) => handleInputChange(e, setTradeInValue)}
                />
              </div>
              <span className="tooltip">
                The value of your current car that you will trade in.
              </span>
            </div>
          </div>

          <div className="input-field">
            
            <label htmlFor="interestRate">Interest Rate:</label>
            <div className="input-with-symbol">
              <input
                type="number"
                id="interestRate"
                value={interestRate}
                onChange={(e) => handleInputChange(e, setInterestRate)}
                required
                placeholder="%"
              />
            </div>
            <span className="tooltip">
              The annual interest rate for the car loan.
            </span>
          </div>

          <div className="input-field">
            
            <label htmlFor="loanTerm">Loan Term (in years):</label>
            <div className="input-with-symbol">
              <input
                type="number"
                id="loanTerm"
                value={loanTerm}
                onChange={(e) => handleInputChange(e, setLoanTerm)}
                required
              />
            </div>
            <span className="tooltip">
              The term (duration) of the loan in years.
            </span>
          </div>
        </div>

        <div className="form-section">
          <div className="input-field">
            <label htmlFor="paymentFrequency">Payment Frequency:</label>
            <select
              id="paymentFrequency"
              value={paymentFrequency}
              onChange={handlePaymentFrequencyChange}
            >
              <option value="weekly">Weekly</option>
              <option value="biweekly">Biweekly</option>
              <option value="monthly">Monthly</option>
            </select>
            <span className="tooltip">
              The frequency at which you will make the loan payments.
            </span>
          </div>

          <div className="button-container">
            {monthlyPayment > 0 ? (
              <div className="result">
                <h3 className="text-black">{resultTitle}</h3>
                <div className="payment-amount">${monthlyPayment}</div>
                <div className="breakdown">
                  <div className="breakdown-item">
                    <span>Total Finance:</span>
                    <span>${remainingPrincipalCost}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Total Interest:</span>
                    <span>${totalBorrowedCost}</span>
                  </div>
                  <div className="breakdown-item">
                    <span>Total:</span>
                    <span>
                      $
                      {(
                        parseFloat(totalBorrowedCost) +
                        parseFloat(remainingPrincipalCost)
                      ).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ): (
              <div><p>Data will show once you fill all required fields...</p></div>
            )}
           
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default Finance;