import React, { Component } from 'react';
import { averageGrades } from '../helpers/calculeteGrades';
import css from './calculos.module.css';
import { formatPercent } from '../helpers/formatHelpers';

export default class Calculos extends Component {
  render() {
    const { modules, totalGrades, average60Percent } = this.props;
    return (
      <div className="border">
        <label className={css.resultLabel}>Nota total: </label>
        <span className={css.valueLabel}>{totalGrades}</span>
        <br />
        <label className={css.resultLabel}>Percentual total: </label>
        <span className={css.valueLabel}>
          {formatPercent(averageGrades(totalGrades, modules.length) / 100)}
        </span>
        <br />
        <label className={css.resultLabel}>Aprovação pela média (60%)? </label>
        {average60Percent ? (
          <span className={css.approved}>Sim</span>
        ) : (
          <span className={css.disapproved}>Não</span>
        )}
        <br />
        <label className={css.resultLabel}>
          Aprovação pelo percentual total (70%)?
        </label>
        {averageGrades(totalGrades, modules.length) >= 70 ? (
          <span className={css.approved}>Sim</span>
        ) : (
          <span className={css.disapproved}>Não</span>
        )}
      </div>
    );
  }
}
