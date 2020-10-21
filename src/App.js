import React, { Component } from 'react';
import Calculos from './components/Calculos';
import Notas from './components/Notas';
import { Chart } from 'react-google-charts';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      modules: [
        {
          id: 1,
          description: 'Módulo 01 - Fundamentos (0 - 100)',
          grades: 100,
          onGradeChange: this.handleChangeGrade,
        },
        {
          id: 2,
          description: 'Módulo 02 - Angular (0 - 100)',
          grades: 100,
          onGradeChange: this.handleChangeGrade,
        },
        {
          id: 3,
          description: 'Módulo 03 - React (0 - 100)',
          grades: 100,
          onGradeChange: this.handleChangeGrade,
        },
        {
          id: 4,
          description: 'Módulo 04 - Vue (0 - 100)',
          grades: 100,
          onGradeChange: this.handleChangeGrade,
        },
        {
          id: 5,
          description: 'Módulo 05 - Desafio Final (0 - 100)',
          grades: 100,
          onGradeChange: this.handleChangeGrade,
        },
      ],
      totalGrades: 0,
      average60Percent: true,
    };
  }

  componentDidMount() {
    this.willBeCalculatedGrades();
  }

  handleChangeGrade = (grade, index) => {
    const { modules } = this.state;
    /* aqui faz a alteracao das notas do array grades
     e em seguida faz o cálculo de acordo com a nota informada! */
    modules.map((item) => {
      if (item.id === index) {
        item.grades = grade;
      }
      return item;
    });
    this.willBeCalculatedGrades();
  };

  willBeCalculatedGrades = () => {
    const { modules } = this.state;
    let totalGrades = modules.reduce((acc, cur) => {
      return acc + cur.grades;
    }, 0);
    let validateAverage60Percent = modules.find((item) => {
      return item.grades < 60;
    });
    this.setState({
      totalGrades,
      average60Percent: validateAverage60Percent ? false : true,
    });
  };

  render() {
    const chartData = this.state.modules.map((item) => [
      item.description.slice(11, -10),
      item.grades,
    ]);
    //.map((item) => [
    //  item.description,
    //  item.grades,
    //]);
    console.log(chartData);

    const { modules, totalGrades, average60Percent } = this.state;
    return (
      <>
        <div className="row container">
          <div className="col s6">
            <h4 style={styles.centeredTitle}>Notas atuais</h4>
            <div className="border">
              {modules.map((currentGrades) => {
                const { id, description, onGradeChange } = currentGrades;
                return (
                  <div key={id}>
                    <Notas
                      labelName={description}
                      currentGrades={currentGrades}
                      onGradeChange={onGradeChange}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col s6">
            <h4 style={styles.centeredTitle}>Cálculos</h4>
            <Calculos
              modules={modules}
              totalGrades={totalGrades}
              average60Percent={average60Percent}
            />
            <Chart
              width={400}
              height={400}
              chartType="PieChart"
              loader={<div>Carregando</div>}
              data={[['Módulo', 'Nota'], ...chartData]}
              options={{
                is3D: true,
                pieSliceText: 'label',
                title: '',
                backgroundColor: { fill: 'transparent' },
                legendTextStyle: { color: '#FFF' },
                titleTextStyle: { color: '#FFF' },
                chartArea: { width: '100%' },
                hAxis: {
                  title: '',
                  minValue: 0,
                },
                vAxis: {
                  title: '',
                },
              }}
              legendToggle
            />
            <div className="container"></div>
          </div>
        </div>
      </>
    );
  }
}

const styles = {
  centeredTitle: {
    textAlign: 'left',
  },
};
