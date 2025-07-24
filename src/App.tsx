import React, { useEffect } from 'react';
import './index.css';

declare global {
  interface Window {
    Chart: any;
  }
}

const App: React.Component = () => {
  useEffect(() => {
    // Cargar Chart.js
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
    script.onload = () => {
      initializeCharts();
    };
    document.head.appendChild(script);

    // Cargar Font Awesome
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fontAwesome);

    return () => {
      document.head.removeChild(script);
      document.head.removeChild(fontAwesome);
    };
  }, []);

  const showTab = (tabName: string, event: React.MouseEvent) => {
    // Ocultar todas las pestañas
    document.querySelectorAll('.tab-content').forEach(tab => {
      tab.classList.remove('active');
    });
    
    // Desactivar todos los botones
    document.querySelectorAll('.tab-button').forEach(btn => {
      btn.classList.remove('active');
    });
    
    // Mostrar pestaña seleccionada
    const targetTab = document.getElementById(tabName);
    if (targetTab) {
      targetTab.classList.add('active');
    }
    
    // Activar botón seleccionado
    (event.target as HTMLElement).classList.add('active');
    
    // Inicializar gráficos de la pestaña si es necesario
    setTimeout(() => initializeTabCharts(tabName), 100);
  };

  const initializeCharts = () => {
    if (window.Chart) {
      initializeTabCharts('resumen');
    }
  };

  const initializeTabCharts = (tabName: string) => {
    if (!window.Chart) return;

    const colors = {
      red: '#B8272D',
      lightRed: '#FFEBEE',
      yellow: '#F4D03F',
      lightYellow: '#FFF9C4',
      green: '#94B43B',
      lightGreen: '#E8F5E9',
      blue: '#006BB3',
      lightBlue: '#E3F2FD',
      gray: '#666666',
      lightGray: '#E8E8E8',
      darkGray: '#333333'
    };

    switch(tabName) {
      case 'resumen':
        createConsensusChart();
        createEnrollmentTrendChart();
        break;
      case 'cobertura':
        createDuplicationChart();
        createBaseEnrollmentChart();
        break;
      case 'financiero':
        createInvestmentChart();
        createCostComparisonChart();
        break;
      case 'validacion':
        createStudentParticipationChart();
        createTeacherParticipationChart();
        break;
      case 'proceso':
        createIncorporationChart();
        break;
      case 'encuesta':
        createSurveyDistributionChart();
        createSurveyComparisonChart();
        createCommentsCategoryChart();
        createParticipationByFacultyChart();
        break;
    }

    function createConsensusChart() {
      const ctx = document.getElementById('consensusChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['En Desacuerdo (53.7%)', 'Con Dudas (26.85%)', 'De Acuerdo (19.44%)'],
          datasets: [{
            data: [58, 29, 21],
            backgroundColor: [colors.red, colors.yellow, colors.green],
            borderWidth: 2,
            borderColor: '#fff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                font: { size: 14 }
              }
            }
          }
        }
      });
    }

    function createEnrollmentTrendChart() {
      const ctx = document.getElementById('enrollmentTrendChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'line',
        data: {
          labels: ['2021-1S', '2021-2S', '2022-1S', '2022-2S', '2023-1S', '2023-2S', '2024-1S', '2024-2S'],
          datasets: [{
            label: 'Estudiantes matriculados',
            data: [158, 155, 148, 142, 130, 118, 105, 92],
            borderColor: colors.red,
            backgroundColor: colors.lightRed,
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Caída del 42% en matrícula (2021-2024)'
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 180
            }
          }
        }
      });
    }

    function createDuplicationChart() {
      const ctx = document.getElementById('duplicationChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Manizales', 'Pereira', 'Armenia', 'Ibagué', 'Pasto', 'Mocoa', 'Otros PDET'],
          datasets: [{
            label: 'Programas similares existentes',
            data: [4, 3, 2, 2, 2, 1, 3],
            backgroundColor: colors.red
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1
              }
            }
          }
        }
      });
    }

    function createBaseEnrollmentChart() {
      const ctx = document.getElementById('baseEnrollmentChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['2021-1S', '2021-2S', '2022-1S', '2022-2S', '2023-1S', '2023-2S', '2024-1S', '2024-2S'],
          datasets: [{
            label: 'Matrícula Gestión Cultural',
            data: [158, 155, 148, 142, 130, 118, 105, 92],
            backgroundColor: function(context: any) {
              const value = context.dataset.data[context.dataIndex];
              return value < 100 ? colors.red : value < 130 ? colors.yellow : colors.green;
            }
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }

    function createInvestmentChart() {
      const ctx = document.getElementById('investmentChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Año 1', 'Año 2', 'Año 3', 'Año 4'],
          datasets: [{
            label: 'Inversión anual (Millones COP)',
            data: [8089, 9656, 11405, 12908],
            backgroundColor: colors.blue
          }, {
            label: 'Costo por estudiante (Millones COP)',
            data: [89.9, 53.6, 42.2, 35.9],
            backgroundColor: colors.red,
            yAxisID: 'y1'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              type: 'linear',
              display: true,
              position: 'left',
              title: {
                display: true,
                text: 'Inversión Total (Millones COP)'
              }
            },
            y1: {
              type: 'linear',
              display: true,
              position: 'right',
              title: {
                display: true,
                text: 'Costo por Estudiante (Millones COP)'
              },
              grid: {
                drawOnChartArea: false
              }
            }
          }
        }
      });
    }

    function createCostComparisonChart() {
      const ctx = document.getElementById('costComparisonChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['FCHS Año 1', 'FCHS Año 4', 'Universidad Privada Elite', 'Universidad Pública Promedio'],
          datasets: [{
            label: 'Costo por estudiante (Millones COP)',
            data: [89.9, 35.9, 250, 15],
            backgroundColor: [colors.red, colors.yellow, colors.blue, colors.green]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y' as const,
          scales: {
            x: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Millones COP'
              }
            }
          }
        }
      });
    }

    function createStudentParticipationChart() {
      const ctx = document.getElementById('studentParticipationChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['No participaron (93.4%)', 'Participaron (6.6%)'],
          datasets: [{
            data: [5136, 364],
            backgroundColor: [colors.lightGray, colors.blue]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }

    function createTeacherParticipationChart() {
      const ctx = document.getElementById('teacherParticipationChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['No participaron (87.7%)', 'Participaron (12.3%)'],
          datasets: [{
            data: [235, 33],
            backgroundColor: [colors.lightGray, colors.blue]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }

    function createIncorporationChart() {
      const ctx = document.getElementById('incorporationChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['No incorporados (75%)', 'Parcialmente incorporados (25%)'],
          datasets: [{
            data: [3, 1],
            backgroundColor: [colors.red, colors.yellow]
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: '0 de 3 propuestas sustantivas fueron incorporadas'
            },
            legend: {
              position: 'bottom'
            }
          }
        }
      });
    }

    function createSurveyDistributionChart() {
      const ctx = document.getElementById('surveyDistributionChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'pie',
        data: {
          labels: ['No, no estoy de acuerdo (53.7%)', 'Tengo dudas (26.85%)', 'Sí, estoy de acuerdo (19.44%)'],
          datasets: [{
            data: [58, 29, 21],
            backgroundColor: [colors.red, colors.yellow, colors.green],
            borderWidth: 2,
            borderColor: '#fff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                padding: 20,
                font: { size: 14 }
              }
            }
          }
        }
      });
    }

    function createSurveyComparisonChart() {
      const ctx = document.getElementById('surveyComparisonChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Consulta Oficial', 'Encuesta Independiente'],
          datasets: [{
            label: 'Participación',
            data: [12.5, 40.91],
            backgroundColor: colors.blue
          }, {
            label: 'A favor / De acuerdo',
            data: [76.4, 19.44],
            backgroundColor: colors.green
          }, {
            label: 'En contra / Desacuerdo',
            data: [23.6, 53.7],
            backgroundColor: colors.red
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                callback: (value: any) => value + '%'
              }
            }
          }
        }
      });
    }

    function createCommentsCategoryChart() {
      const ctx = document.getElementById('commentsCategoryChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: [
            'Viabilidad financiera',
            'Pertinencia regional',
            'Rigor académico',
            'Falta de estudios',
            'Proceso apresurado',
            'Duplicación con U. Caldas',
            'Sin consenso',
            'Inversión desproporcionada'
          ],
          datasets: [{
            label: 'Número de menciones',
            data: [26, 23, 19, 17, 14, 12, 10, 8],
            backgroundColor: colors.red
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          indexAxis: 'y' as const,
          scales: {
            x: {
              beginAtZero: true,
              ticks: {
                stepSize: 5
              }
            }
          }
        }
      });
    }

    function createParticipationByFacultyChart() {
      const ctx = document.getElementById('participationByFacultyChart') as HTMLCanvasElement;
      if (!ctx) return;
      
      new window.Chart(ctx, {
        type: 'bar',
        data: {
          labels: [
            'Ing. Eléctrica',
            'Ing. Civil', 
            'Física y Química',
            'Administración',
            'Ing. Química',
            'Arquitectura',
            'Ciencias Humanas',
            'Informática',
            'Ing. Industrial',
            'Matemáticas'
          ],
          datasets: [{
            label: 'En Desacuerdo',
            data: [7, 7, 5, 6, 6, 8, 2, 7, 6, 3],
            backgroundColor: colors.red
          }, {
            label: 'Con Dudas',
            data: [5, 5, 5, 2, 4, 3, 2, 1, 1, 1],
            backgroundColor: colors.yellow
          }, {
            label: 'De Acuerdo',
            data: [4, 3, 2, 3, 1, 0, 5, 0, 1, 2],
            backgroundColor: colors.green
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: true
            },
            y: {
              stacked: true,
              beginAtZero: true
            }
          }
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-[#94B43B] text-white py-5 shadow-lg">
        <div className="max-w-7xl mx-auto px-5 flex items-center gap-8">
          <div className="flex items-center gap-5">
            <div className="w-15 h-15 bg-white rounded-lg flex items-center justify-center font-bold text-[#94B43B] text-lg">
              UNAL
            </div>
          </div>
          <div>
            <h1 className="text-3xl font-bold mb-1">Análisis Integral - Creación FCHS</h1>
            <p className="text-base opacity-90">Universidad Nacional de Colombia - Sede Manizales</p>
          </div>
        </div>
      </header>

      {/* Navegación */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-5 flex gap-0 overflow-x-auto">
          <button 
            className="tab-button active border-none bg-none py-4 px-6 text-sm text-gray-600 cursor-pointer relative transition-all font-medium whitespace-nowrap hover:text-[#94B43B] hover:bg-[rgba(148,180,59,0.05)]"
            onClick={(e) => showTab('resumen', e)}
          >
            <i className="fas fa-chart-line mr-2"></i> Resumen Ejecutivo
          </button>
          <button 
            className="tab-button border-none bg-none py-4 px-6 text-sm text-gray-600 cursor-pointer relative transition-all font-medium whitespace-nowrap hover:text-[#94B43B] hover:bg-[rgba(148,180,59,0.05)]"
            onClick={(e) => showTab('cobertura', e)}
          >
            <i className="fas fa-university mr-2"></i> Análisis de Cobertura
          </button>
          <button 
            className="tab-button border-none bg-none py-4 px-6 text-sm text-gray-600 cursor-pointer relative transition-all font-medium whitespace-nowrap hover:text-[#94B43B] hover:bg-[rgba(148,180,59,0.05)]"
            onClick={(e) => showTab('financiero', e)}
          >
            <i className="fas fa-dollar-sign mr-2"></i> Análisis Financiero
          </button>
          <button 
            className="tab-button border-none bg-none py-4 px-6 text-sm text-gray-600 cursor-pointer relative transition-all font-medium whitespace-nowrap hover:text-[#94B43B] hover:bg-[rgba(148,180,59,0.05)]"
            onClick={(e) => showTab('validacion', e)}
          >
            <i className="fas fa-users mr-2"></i> Validación Comunitaria
          </button>
          <button 
            className="tab-button border-none bg-none py-4 px-6 text-sm text-gray-600 cursor-pointer relative transition-all font-medium whitespace-nowrap hover:text-[#94B43B] hover:bg-[rgba(148,180,59,0.05)]"
            onClick={(e) => showTab('proceso', e)}
          >
            <i className="fas fa-tasks mr-2"></i> Proceso de Construcción
          </button>
          <button 
            className="tab-button border-none bg-none py-4 px-6 text-sm text-gray-600 cursor-pointer relative transition-all font-medium whitespace-nowrap hover:text-[#94B43B] hover:bg-[rgba(148,180,59,0.05)]"
            onClick={(e) => showTab('objeciones', e)}
          >
            <i className="fas fa-exclamation-triangle mr-2"></i> Objeciones Profesorales
          </button>
          <button 
            className="tab-button border-none bg-none py-4 px-6 text-sm text-gray-600 cursor-pointer relative transition-all font-medium whitespace-nowrap hover:text-[#94B43B] hover:bg-[rgba(148,180,59,0.05)]"
            onClick={(e) => showTab('encuesta', e)}
          >
            <i className="fas fa-poll mr-2"></i> Encuesta Profesoral
          </button>
          <button 
            className="tab-button border-none bg-none py-4 px-6 text-sm text-gray-600 cursor-pointer relative transition-all font-medium whitespace-nowrap hover:text-[#94B43B] hover:bg-[rgba(148,180,59,0.05)]"
            onClick={(e) => showTab('ficha', e)}
          >
            <i className="fas fa-file-alt mr-2"></i> Ficha Técnica
          </button>
          <button 
            className="tab-button border-none bg-none py-4 px-6 text-sm text-gray-600 cursor-pointer relative transition-all font-medium whitespace-nowrap hover:text-[#94B43B] hover:bg-[rgba(148,180,59,0.05)]"
            onClick={(e) => showTab('datos', e)}
          >
            <i className="fas fa-database mr-2"></i> Datos Completos
          </button>
        </div>
      </nav>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto p-8">
        {/* Tab 1: Resumen Ejecutivo */}
        <div id="resumen" className="tab-content active">
          <div className="bg-gradient-to-r from-red-50 to-red-100 p-8 rounded-xl mb-8 flex gap-5 items-start border border-red-200">
            <div className="w-15 h-15 bg-[#B8272D] rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Evaluación Crítica del Proyecto FCHS</h2>
              <p className="mb-4">El análisis integral identifica 7 puntos críticos que cuestionan la viabilidad del proyecto:</p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <i className="fas fa-times text-[#B8272D] mr-3"></i>
                  <strong>Duplicación de oferta</strong> en 9 de 11 municipios objetivo
                </li>
                <li className="flex items-center">
                  <i className="fas fa-times text-[#B8272D] mr-3"></i>
                  <strong>Costo extraordinario</strong>: $89.9M por estudiante (Año 1)
                </li>
                <li className="flex items-center">
                  <i className="fas fa-times text-[#B8272D] mr-3"></i>
                  <strong>Participación marginal</strong>: Solo 6.6% estudiantes consultados
                </li>
                <li className="flex items-center">
                  <i className="fas fa-times text-[#B8272D] mr-3"></i>
                  <strong>Aportes no incorporados</strong>: 0 de 4 propuestas sustantivas incluidas
                </li>
                <li className="flex items-center">
                  <i className="fas fa-times text-[#B8272D] mr-3"></i>
                  <strong>Rechazo profesoral</strong>: 53.7% en contra (encuesta independiente)
                </li>
                <li className="flex items-center">
                  <i className="fas fa-times text-[#B8272D] mr-3"></i>
                  <strong>Discrepancia financiera</strong>: $7,000M sin explicar
                </li>
                <li className="flex items-center">
                  <i className="fas fa-times text-[#B8272D] mr-3"></i>
                  <strong>Demanda decreciente</strong>: -42% en programa base (2021-2024)
                </li>
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#B8272D]">
              <i className="fas fa-dollar-sign text-3xl text-[#B8272D] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">$89.9M</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Costo por Estudiante</div>
              <div className="text-xs text-gray-500 mt-1">Año 1</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#B8272D]">
              <i className="fas fa-percentage text-3xl text-[#B8272D] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">6.6%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Participación Estudiantil</div>
              <div className="text-xs text-gray-500 mt-1">364 de 5,500</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#B8272D]">
              <i className="fas fa-times-circle text-3xl text-[#B8272D] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">53.7%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Profesores en Contra</div>
              <div className="text-xs text-gray-500 mt-1">58 de 108</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#006BB3]">
              <i className="fas fa-users text-3xl text-[#006BB3] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">90</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Estudiantes Nuevos/Año</div>
              <div className="text-xs text-gray-500 mt-1">3 programas x 15 x 2</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-chart-pie text-[#94B43B]"></i>
                  Consenso Profesoral
                </h3>
                <p className="text-sm text-gray-600 mt-1">Encuesta independiente con 43.5% de participación</p>
              </div>
              <div className="p-6">
                <div className="relative h-80 mb-5">
                  <canvas id="consensusChart"></canvas>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-chart-line text-[#94B43B]"></i>
                  Tendencia de Matrícula - Programa Base
                </h3>
                <p className="text-sm text-gray-600 mt-1">Gestión Cultural y Comunicativa</p>
              </div>
              <div className="p-6">
                <div className="relative h-80 mb-5">
                  <canvas id="enrollmentTrendChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 2: Análisis de Cobertura */}
        <div id="cobertura" className="tab-content">
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-xl mb-8 flex gap-5 items-start border border-yellow-200">
            <div className="w-15 h-15 bg-[#F4D03F] rounded-full flex items-center justify-center text-gray-800 text-2xl flex-shrink-0">
              <i className="fas fa-map-marked-alt"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Punto 1: Evaluación de la Cobertura</h2>
              <p className="font-semibold">¿Ampliación Real o Duplicación de Oferta con Fondos Públicos?</p>
              <p className="mt-3">El análisis territorial revela que la propuesta no amplía cobertura, sino que duplica oferta existente en 9 de 11 municipios analizados.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-university text-[#94B43B]"></i>
                Oferta Académica Existente en Territorios Objetivo
              </h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Municipio</th>
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Programa Existente</th>
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Institución Oferente</th>
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Coincide con Propuesta FCHS</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">Manizales</td>
                      <td className="p-3 border-b border-gray-200">Comunicación Social, Derecho, Psicología, Lenguas Modernas</td>
                      <td className="p-3 border-b border-gray-200">Universidad de Caldas, U. de Manizales</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">SÍ - Duplica</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">Pereira</td>
                      <td className="p-3 border-b border-gray-200">Derecho, Comunicación, Educación</td>
                      <td className="p-3 border-b border-gray-200">Universidad Tecnológica de Pereira, U. Libre</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">SÍ - Ciencia Política</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">Armenia</td>
                      <td className="p-3 border-b border-gray-200">Comunicación Social y Periodismo</td>
                      <td className="p-3 border-b border-gray-200">Universidad del Quindío</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">SÍ - Filología e Idiomas</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">Ibagué (Tolima)</td>
                      <td className="p-3 border-b border-gray-200">Licenciatura en Ciencias Sociales, Derecho</td>
                      <td className="p-3 border-b border-gray-200">Universidad del Tolima</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">SÍ - Duplica</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">Pasto (Nariño)</td>
                      <td className="p-3 border-b border-gray-200">Psicología, Comunicación Social</td>
                      <td className="p-3 border-b border-gray-200">Universidad de Nariño</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">SÍ - Duplica</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">Mocoa (Putumayo)</td>
                      <td className="p-3 border-b border-gray-200">Lenguas Modernas</td>
                      <td className="p-3 border-b border-gray-200">Universidad de la Amazonia, UNAD</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">SÍ - Filología e Idiomas</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-chart-bar text-[#94B43B]"></i>
                  Análisis de Duplicación por Municipio
                </h3>
              </div>
              <div className="p-6">
                <div className="relative h-80">
                  <canvas id="duplicationChart"></canvas>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-chart-line text-[#94B43B]"></i>
                  Matrícula del Programa Base (Tabla 9)
                </h3>
                <p className="text-sm text-gray-600 mt-1">Tendencia decreciente que cuestiona la expansión</p>
              </div>
              <div className="p-6">
                <div className="relative h-80 mb-5">
                  <canvas id="baseEnrollmentChart"></canvas>
                </div>
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <strong>Hallazgo crítico:</strong> El programa Gestión Cultural y Comunicativa muestra una caída del 42% en matrícula (de 158 a 92 estudiantes entre 2021-2024).
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 3: Análisis Financiero */}
        <div id="financiero" className="tab-content">
          <div className="bg-gradient-to-r from-red-50 to-red-100 p-8 rounded-xl mb-8 flex gap-5 items-start border border-red-200">
            <div className="w-15 h-15 bg-[#B8272D] rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
              <i className="fas fa-calculator"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Punto 2: Análisis de la Inversión y Costo por Estudiante</h2>
              <p className="font-semibold">Escenario corregido basado en proyecciones realistas</p>
              <p className="mt-3">Meta: 15 estudiantes nuevos por programa, 3 programas, operación semestral = 90 estudiantes nuevos/año</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#B8272D]">
              <i className="fas fa-exclamation-triangle text-3xl text-[#B8272D] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">$89.9M</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Costo/Estudiante Año 1</div>
              <div className="text-xs text-gray-500 mt-1">$8,089M ÷ 90</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#B8272D]">
              <i className="fas fa-chart-line text-3xl text-[#B8272D] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">$53.6M</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Costo/Estudiante Año 2</div>
              <div className="text-xs text-gray-500 mt-1">$9,656M ÷ 180</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#F4D03F]">
              <i className="fas fa-dollar-sign text-3xl text-[#F4D03F] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">$42.2M</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Costo/Estudiante Año 3</div>
              <div className="text-xs text-gray-500 mt-1">$11,405M ÷ 270</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#F4D03F]">
              <i className="fas fa-money-bill-wave text-3xl text-[#F4D03F] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">$35.9M</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Costo/Estudiante Año 4</div>
              <div className="text-xs text-gray-500 mt-1">$12,908M ÷ 360</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-chart-bar text-[#94B43B]"></i>
                Inversión Anual Proyectada (Tabla 50)
              </h3>
            </div>
            <div className="p-6">
              <div className="relative h-96">
                <canvas id="investmentChart"></canvas>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-table text-[#94B43B]"></i>
                  Desglose de Costos por Año
                </h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Año</th>
                        <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Egresos Totales</th>
                        <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Estudiantes Acumulados</th>
                        <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Costo/Estudiante</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="p-3 border-b border-gray-200">Año 1</td>
                        <td className="p-3 border-b border-gray-200">$8,088,803,557</td>
                        <td className="p-3 border-b border-gray-200">90</td>
                        <td className="p-3 border-b border-gray-200 bg-yellow-100 font-semibold">$89,875,595</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-3 border-b border-gray-200">Año 2</td>
                        <td className="p-3 border-b border-gray-200">$9,655,561,752</td>
                        <td className="p-3 border-b border-gray-200">180</td>
                        <td className="p-3 border-b border-gray-200 bg-yellow-100 font-semibold">$53,642,009</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-3 border-b border-gray-200">Año 3</td>
                        <td className="p-3 border-b border-gray-200">$11,405,263,048</td>
                        <td className="p-3 border-b border-gray-200">270</td>
                        <td className="p-3 border-b border-gray-200 bg-yellow-100 font-semibold">$42,241,715</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="p-3 border-b border-gray-200">Año 4</td>
                        <td className="p-3 border-b border-gray-200">$12,908,141,892</td>
                        <td className="p-3 border-b border-gray-200">360</td>
                        <td className="p-3 border-b border-gray-200 bg-yellow-100 font-semibold">$35,855,949</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-balance-scale text-[#94B43B]"></i>
                  Comparación de Costos
                </h3>
              </div>
              <div className="p-6">
                <div className="relative h-80 mb-5">
                  <canvas id="costComparisonChart"></canvas>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>Contexto:</strong> El costo de una carrera completa en universidad privada de élite oscila entre $200-300 millones.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 4: Validación Comunitaria */}
        <div id="validacion" className="tab-content">
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-xl mb-8 flex gap-5 items-start border border-yellow-200">
            <div className="w-15 h-15 bg-[#F4D03F] rounded-full flex items-center justify-center text-gray-800 text-2xl flex-shrink-0">
              <i className="fas fa-users"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Punto 3: Validación Comunitaria</h2>
              <p className="font-semibold">Apoyo Aparente, Representatividad Mínima</p>
              <p className="mt-3">El proceso de consulta presentó tasas de participación extremadamente bajas que invalidan cualquier pretensión de representatividad estadística.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#B8272D]">
              <i className="fas fa-graduation-cap text-3xl text-[#B8272D] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">6.6%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Participación Estudiantil</div>
              <div className="text-xs text-gray-500 mt-1">364 de 5,500</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#F4D03F]">
              <i className="fas fa-chalkboard-teacher text-3xl text-[#F4D03F] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">12.3%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Participación Docente</div>
              <div className="text-xs text-gray-500 mt-1">33 de 268</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#006BB3]">
              <i className="fas fa-percentage text-3xl text-[#006BB3] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">81.1%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">A Favor (del 6.6%)</div>
              <div className="text-xs text-gray-500 mt-1">Resultado engañoso</div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-chart-pie text-[#94B43B]"></i>
                Análisis de Representatividad de la Consulta
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-lg font-semibold mb-4">Estudiantes</h4>
                  <div className="relative h-64 mb-4">
                    <canvas id="studentParticipationChart"></canvas>
                  </div>
                  <p className="text-center text-gray-600">
                    Solo 364 de 5,500 estudiantes participaron
                  </p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-4">Docentes</h4>
                  <div className="relative h-64 mb-4">
                    <canvas id="teacherParticipationChart"></canvas>
                  </div>
                  <p className="text-center text-gray-600">
                    Solo 33 de 268 docentes participaron
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-exclamation-triangle text-[#94B43B]"></i>
                Debilidades Metodológicas Críticas
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    <i className="fas fa-times text-red-600 mr-2"></i>
                    Falta de Representatividad
                  </h4>
                  <p className="text-gray-700">No se puede generalizar la opinión del 7% de los estudiantes al 93% restante.</p>
                </div>
                <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    <i className="fas fa-times text-red-600 mr-2"></i>
                    Ausencia de Segmentación
                  </h4>
                  <p className="text-gray-700">No se segmentaron respuestas por facultad, programa o tipo de vinculación.</p>
                </div>
                <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    <i className="fas fa-times text-red-600 mr-2"></i>
                    Incumplimiento de Estándares
                  </h4>
                  <p className="text-gray-700">No cumple con recomendaciones UNAL/UNESCO de consulta institucional.</p>
                </div>
                <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    <i className="fas fa-times text-red-600 mr-2"></i>
                    Contraste con Encuesta Posterior
                  </h4>
                  <p className="text-gray-700">Encuesta independiente (40.9% participación) mostró 53.7% de rechazo.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 5: Proceso de Construcción */}
        <div id="proceso" className="tab-content">
          <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 p-8 rounded-xl mb-8 flex gap-5 items-start border border-yellow-200">
            <div className="w-15 h-15 bg-[#F4D03F] rounded-full flex items-center justify-center text-gray-800 text-2xl flex-shrink-0">
              <i className="fas fa-tasks"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Punto 4: El Proceso de Construcción Colectiva</h2>
              <p className="font-semibold">Participación Mínima con Nula Incorporación de Aportes Sustantivos</p>
              <p className="mt-3">Solo 4 personas aportaron (0.1% de la comunidad) y ninguna propuesta sustantiva fue incorporada.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-users text-[#94B43B]"></i>
                Análisis de Aportes de la Comunidad (Tablas 52-63)
              </h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Aportante</th>
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Cargo</th>
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Aporte Sustantivo</th>
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Respuesta Institucional</th>
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">Eida Pino</td>
                      <td className="p-3 border-b border-gray-200">Directora de Personal</td>
                      <td className="p-3 border-b border-gray-200">Argumentos estratégicos de justificación</td>
                      <td className="p-3 border-b border-gray-200">"Ideas consideradas y reflejadas en justificación"</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">INCORPORADO PARCIALMENTE</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">Erika Marulanda</td>
                      <td className="p-3 border-b border-gray-200">Egresada</td>
                      <td className="p-3 border-b border-gray-200">Ajustar códigos SNIES para reconocimiento profesional</td>
                      <td className="p-3 border-b border-gray-200">"Necesario luego de tener la creación de la facultad"</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">NO INCORPORADO (Diferido)</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">Eduardo Satizábal</td>
                      <td className="p-3 border-b border-gray-200">Docente</td>
                      <td className="p-3 border-b border-gray-200">Doble titulación en Filosofía</td>
                      <td className="p-3 border-b border-gray-200">"Se tendrán presentes a futuro"</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">NO INCORPORADO (Diferido)</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">Uriel Bustamante</td>
                      <td className="p-3 border-b border-gray-200">Docente</td>
                      <td className="p-3 border-b border-gray-200">Estructura pedagógica basada en problemas reales</td>
                      <td className="p-3 border-b border-gray-200">"Se desarrollará desde las comunidades académicas"</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">NO INCORPORADO (Delegado)</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-chart-pie text-[#94B43B]"></i>
                  Estado de Incorporación de Aportes
                </h3>
              </div>
              <div className="p-6">
                <div className="relative h-80">
                  <canvas id="incorporationChart"></canvas>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-exclamation-triangle text-[#94B43B]"></i>
                  Patrón de Respuestas
                </h3>
              </div>
              <div className="p-6">
                <div className="p-5 bg-red-50 rounded-lg border border-red-200 mb-4">
                  <h4 className="font-semibold text-gray-800 mb-3">Patrón Identificado:</h4>
                  <p className="text-gray-700 mb-2">✗ Argumentos de apoyo → Usados para reforzar narrativa</p>
                  <p className="text-gray-700 mb-2">✗ Propuestas de cambio → Sistemáticamente diferidas o delegadas</p>
                  <p className="text-gray-700">✗ Sugerencias concretas → "Se considerarán a futuro"</p>
                </div>
                <div className="p-5 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h4 className="font-semibold text-gray-800 mb-3">Resultado:</h4>
                  <p className="text-gray-700">La versión final del documento no es producto de una construcción dialogada, sino de un proceso cerrado que desestimó los aportes externos.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 6: Objeciones Profesorales */}
        <div id="objeciones" className="tab-content">
          <div className="bg-gradient-to-r from-red-50 to-red-100 p-8 rounded-xl mb-8 flex gap-5 items-start border border-red-200">
            <div className="w-15 h-15 bg-[#B8272D] rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Punto 5: Las Objeciones Fundamentadas de la Representación Profesoral</h2>
              <p className="font-semibold">Proceso avanzó incumpliendo mandato de la Asamblea Profesoral del 7 de febrero de 2025</p>
              <p className="mt-3">La representación profesoral presentó objeciones técnicas, financieras y procedimentales que nunca fueron satisfactoriamente resueltas.</p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-clipboard-list text-[#94B43B]"></i>
                Clasificación de Objeciones No Resueltas
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    <i className="fas fa-university text-red-600 mr-2"></i>
                    Objeciones Académicas
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Sin análisis riguroso de demanda real</li>
                    <li>• Programas base en declive (Tabla 9)</li>
                    <li>• Falacia sobre necesidad de facultad para investigación</li>
                    <li>• Sin cifras de aspirantes históricos</li>
                  </ul>
                </div>
                <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    <i className="fas fa-dollar-sign text-red-600 mr-2"></i>
                    Objeciones Financieras
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Discrepancia de $7,000M entre documentos</li>
                    <li>• Falacia de "pérdida de recursos"</li>
                    <li>• Inversión exagerada para 45 matrículas/año</li>
                    <li>• Sin CDP específico presentado</li>
                  </ul>
                </div>
                <div className="p-5 bg-red-50 rounded-lg border border-red-200">
                  <h4 className="font-semibold text-gray-800 mb-3">
                    <i className="fas fa-gavel text-red-600 mr-2"></i>
                    Objeciones de Procedimiento
                  </h4>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Respuestas evasivas a derechos de petición</li>
                    <li>• Respuesta post-votación del CA</li>
                    <li>• Impedimento a deliberación informada</li>
                    <li>• Incumplimiento mandato asamblea</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-file-alt text-[#94B43B]"></i>
                Documentos y Comunicados Clave
              </h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Documento</th>
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Fecha</th>
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Contenido</th>
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">COMUNICADO 006</td>
                      <td className="p-3 border-b border-gray-200">Febrero 2025</td>
                      <td className="p-3 border-b border-gray-200">Denuncia incumplimiento mandato asamblea y fallas en proceso</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">SIN RESOLVER</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">REP.PROF.018</td>
                      <td className="p-3 border-b border-gray-200">Enero 2025</td>
                      <td className="p-3 border-b border-gray-200">Solicitud CDP y documentación financiera</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">RESPUESTA EVASIVA</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">REP.PROF.023</td>
                      <td className="p-3 border-b border-gray-200">Enero 2025</td>
                      <td className="p-3 border-b border-gray-200">Cuestionamiento cifras y viabilidad</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">RESPUESTA EVASIVA</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">REP.PROF.025</td>
                      <td className="p-3 border-b border-gray-200">Febrero 2025</td>
                      <td className="p-3 border-b border-gray-200">Solicitud subsanación urgente</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">RESPUESTA POST-VOTACIÓN</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">GNFA-0352-25</td>
                      <td className="p-3 border-b border-gray-200">Enero 2025</td>
                      <td className="p-3 border-b border-gray-200">Gerencia confirma: sin facultad no hay recursos específicos</td>
                      <td className="p-3 border-b border-gray-200">
                        <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">CONTRADICE NARRATIVA</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-exclamation-circle text-[#94B43B]"></i>
                La Discrepancia Financiera Sin Explicar
              </h3>
            </div>
            <div className="p-6">
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-8 rounded-xl flex gap-5 items-start border border-red-200">
                <div className="w-15 h-15 bg-[#B8272D] rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
                  <i className="fas fa-question"></i>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-800 mb-5">$7,000 Millones de Diferencia</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold mb-3">Propuesta Técnica (CA)</h4>
                      <p className="text-4xl font-bold text-[#94B43B] mb-2">$12.9 mil millones</p>
                      <p className="text-gray-600">A 4 años</p>
                    </div>
                    <div className="text-center">
                      <h4 className="text-lg font-semibold mb-3">Plan de Acción 2025</h4>
                      <p className="text-4xl font-bold text-[#B8272D] mb-2">$20 mil millones</p>
                      <p className="text-gray-600">A 3 años</p>
                    </div>
                  </div>
                  <p className="text-center font-semibold text-gray-800 mt-5">
                    Nunca se aclaró cuál era la cifra real ni el destino de la diferencia
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 7: Encuesta Profesoral */}
        <div id="encuesta" className="tab-content">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl mb-8 flex gap-5 items-start border border-blue-200">
            <div className="w-15 h-15 bg-[#006BB3] rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
              <i className="fas fa-poll"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Punto 6: Análisis Estadístico de la Encuesta Profesoral</h2>
              <p className="font-semibold">Encuesta independiente para contrastar el "apoyo mayoritario" expresado por la vicerrectoría</p>
              <p className="mt-3">108 respuestas válidas de 264 docentes (40.91% de participación) vs. 33 respuestas en consulta oficial (12.5%)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#B8272D]">
              <i className="fas fa-times-circle text-3xl text-[#B8272D] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">53.7%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">En Desacuerdo</div>
              <div className="text-xs text-gray-500 mt-1">58 de 108</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#F4D03F]">
              <i className="fas fa-question-circle text-3xl text-[#F4D03F] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">26.85%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Con Dudas</div>
              <div className="text-xs text-gray-500 mt-1">29 de 108</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#94B43B]">
              <i className="fas fa-check-circle text-3xl text-[#94B43B] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">19.44%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">De Acuerdo</div>
              <div className="text-xs text-gray-500 mt-1">21 de 108</div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg text-center transition-all hover:shadow-xl hover:-translate-y-1 relative overflow-hidden border-t-4 border-[#006BB3]">
              <i className="fas fa-percentage text-3xl text-[#006BB3] mb-4 opacity-80"></i>
              <div className="text-4xl font-bold text-gray-800 mb-2">40.91%</div>
              <div className="text-sm text-gray-600 uppercase tracking-wide">Participación</div>
              <div className="text-xs text-gray-500 mt-1">108 de 264</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-chart-pie text-[#94B43B]"></i>
                  Distribución de Respuestas
                </h3>
              </div>
              <div className="p-6">
                <div className="relative h-80">
                  <canvas id="surveyDistributionChart"></canvas>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-balance-scale text-[#94B43B]"></i>
                  Comparación: Oficial vs. Independiente
                </h3>
              </div>
              <div className="p-6">
                <div className="relative h-80">
                  <canvas id="surveyComparisonChart"></canvas>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-building text-[#94B43B]"></i>
                Participación por Unidad Académica
              </h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Unidad Académica</th>
                      <th className="p-3 text-center border-b border-gray-200 font-semibold text-gray-800">Participaron</th>
                      <th className="p-3 text-center border-b border-gray-200 font-semibold text-gray-800">No, no estoy de acuerdo</th>
                      <th className="p-3 text-center border-b border-gray-200 font-semibold text-gray-800">Tengo dudas</th>
                      <th className="p-3 text-center border-b border-gray-200 font-semibold text-gray-800">Sí, estoy de acuerdo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Ingeniería Eléctrica, Electrónica y Computación</td>
                      <td className="p-3 border-b border-gray-200 text-center">16</td>
                      <td className="p-3 border-b border-gray-200 text-center">7</td>
                      <td className="p-3 border-b border-gray-200 text-center">5</td>
                      <td className="p-3 border-b border-gray-200 text-center">4</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Ingeniería Civil</td>
                      <td className="p-3 border-b border-gray-200 text-center">15</td>
                      <td className="p-3 border-b border-gray-200 text-center">7</td>
                      <td className="p-3 border-b border-gray-200 text-center">5</td>
                      <td className="p-3 border-b border-gray-200 text-center">3</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Física y Química</td>
                      <td className="p-3 border-b border-gray-200 text-center">12</td>
                      <td className="p-3 border-b border-gray-200 text-center">5</td>
                      <td className="p-3 border-b border-gray-200 text-center">5</td>
                      <td className="p-3 border-b border-gray-200 text-center">2</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Administración</td>
                      <td className="p-3 border-b border-gray-200 text-center">11</td>
                      <td className="p-3 border-b border-gray-200 text-center">6</td>
                      <td className="p-3 border-b border-gray-200 text-center">2</td>
                      <td className="p-3 border-b border-gray-200 text-center">3</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Ingeniería Química</td>
                      <td className="p-3 border-b border-gray-200 text-center">11</td>
                      <td className="p-3 border-b border-gray-200 text-center">6</td>
                      <td className="p-3 border-b border-gray-200 text-center">4</td>
                      <td className="p-3 border-b border-gray-200 text-center">1</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Escuela de Arquitectura y Urbanismo</td>
                      <td className="p-3 border-b border-gray-200 text-center">11</td>
                      <td className="p-3 border-b border-gray-200 text-center">8</td>
                      <td className="p-3 border-b border-gray-200 text-center">3</td>
                      <td className="p-3 border-b border-gray-200 text-center">0</td>
                    </tr>
                    <tr className="hover:bg-gray-50 bg-yellow-50">
                      <td className="p-3 border-b border-gray-200 font-semibold">Ciencias Humanas</td>
                      <td className="p-3 border-b border-gray-200 text-center font-semibold">9</td>
                      <td className="p-3 border-b border-gray-200 text-center">2</td>
                      <td className="p-3 border-b border-gray-200 text-center">2</td>
                      <td className="p-3 border-b border-gray-200 text-center font-semibold">5</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Informática y Computación</td>
                      <td className="p-3 border-b border-gray-200 text-center">8</td>
                      <td className="p-3 border-b border-gray-200 text-center">7</td>
                      <td className="p-3 border-b border-gray-200 text-center">1</td>
                      <td className="p-3 border-b border-gray-200 text-center">0</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Ingeniería Industrial</td>
                      <td className="p-3 border-b border-gray-200 text-center">8</td>
                      <td className="p-3 border-b border-gray-200 text-center">6</td>
                      <td className="p-3 border-b border-gray-200 text-center">1</td>
                      <td className="p-3 border-b border-gray-200 text-center">1</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Matemáticas</td>
                      <td className="p-3 border-b border-gray-200 text-center">6</td>
                      <td className="p-3 border-b border-gray-200 text-center">3</td>
                      <td className="p-3 border-b border-gray-200 text-center">1</td>
                      <td className="p-3 border-b border-gray-200 text-center">2</td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">IDEA - Manizales</td>
                      <td className="p-3 border-b border-gray-200 text-center">1</td>
                      <td className="p-3 border-b border-gray-200 text-center">1</td>
                      <td className="p-3 border-b border-gray-200 text-center">0</td>
                      <td className="p-3 border-b border-gray-200 text-center">0</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-chart-bar text-[#94B43B]"></i>
                Participación por Facultad
              </h3>
            </div>
            <div className="p-6">
              <div className="relative h-80">
                <canvas id="participationByFacultyChart"></canvas>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-comments text-[#94B43B]"></i>
                Análisis de Comentarios por Categoría
              </h3>
            </div>
            <div className="p-6">
              <div className="relative h-80 mb-8">
                <canvas id="commentsCategoryChart"></canvas>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 8: Ficha Técnica */}
        <div id="ficha" className="tab-content">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl mb-8 flex gap-5 items-start border border-blue-200">
            <div className="w-15 h-15 bg-[#006BB3] rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
              <i className="fas fa-file-alt"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Ficha Técnica de la Encuesta Profesoral</h2>
              <p className="font-semibold">Encuesta independiente realizada para contrastar el "apoyo mayoritario" reportado</p>
              <p className="mt-3">Metodología, participantes y resultados detallados de la consulta independiente</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-info-circle text-[#94B43B]"></i>
                  Información General
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">Período de aplicación:</span>
                    <span className="text-gray-600">Julio 2025</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">Universo:</span>
                    <span className="text-gray-600">264 docentes activos</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">Respuestas válidas:</span>
                    <span className="text-gray-600">108 docentes</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">Tasa de participación:</span>
                    <span className="text-gray-600 font-semibold">40.91%</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">Margen de error:</span>
                    <span className="text-gray-600">±7.8% (95% confianza)</span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-gray-100">
                    <span className="font-semibold text-gray-700">Metodología:</span>
                    <span className="text-gray-600">Encuesta digital anónima</span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="font-semibold text-gray-700">Pregunta central:</span>
                    <span className="text-gray-600 text-sm">"¿Está usted de acuerdo con la creación de la FCHS?"</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-chart-bar text-[#94B43B]"></i>
                  Resultados Principales
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-red-800">No, no estoy de acuerdo</span>
                      <span className="text-2xl font-bold text-red-800">53.7%</span>
                    </div>
                    <div className="text-sm text-red-600 mt-1">58 de 108 docentes</div>
                  </div>
                  <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-yellow-800">Tengo dudas</span>
                      <span className="text-2xl font-bold text-yellow-800">26.85%</span>
                    </div>
                    <div className="text-sm text-yellow-600 mt-1">29 de 108 docentes</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-green-800">Sí, estoy de acuerdo</span>
                      <span className="text-2xl font-bold text-green-800">19.44%</span>
                    </div>
                    <div className="text-sm text-green-600 mt-1">21 de 108 docentes</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-envelope text-[#94B43B]"></i>
                Listado de Correos Electrónicos Participantes
              </h3>
              <p className="text-sm text-gray-600 mt-1">108 docentes que completaron la encuesta (datos anonimizados)</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="p-2 bg-gray-50 rounded">docente001@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente002@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente003@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente004@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente005@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente006@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente007@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente008@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente009@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente010@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente011@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente012@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente013@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente014@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente015@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente016@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente017@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente018@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente019@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente020@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente021@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente022@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente023@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente024@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente025@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente026@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente027@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente028@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente029@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente030@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente031@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente032@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente033@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente034@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente035@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente036@unal.edu.co</div>
                </div>
                <div className="space-y-1">
                  <div className="p-2 bg-gray-50 rounded">docente037@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente038@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente039@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente040@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente041@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente042@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente043@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente044@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente045@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente046@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente047@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente048@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente049@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente050@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente051@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente052@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente053@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente054@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente055@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente056@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente057@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente058@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente059@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente060@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente061@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente062@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente063@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente064@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente065@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente066@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente067@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente068@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente069@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente070@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente071@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente072@unal.edu.co</div>
                </div>
                <div className="space-y-1">
                  <div className="p-2 bg-gray-50 rounded">docente073@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente074@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente075@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente076@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente077@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente078@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente079@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente080@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente081@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente082@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente083@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente084@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente085@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente086@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente087@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente088@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente089@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente090@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente091@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente092@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente093@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente094@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente095@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente096@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente097@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente098@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente099@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente100@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente101@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente102@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente103@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente104@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente105@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente106@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente107@unal.edu.co</div>
                  <div className="p-2 bg-gray-50 rounded">docente108@unal.edu.co</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-times-circle text-[#94B43B]"></i>
                Correos Eliminados por No Pertenecer a la Sede
              </h3>
              <p className="text-sm text-gray-600 mt-1">15 respuestas eliminadas por no corresponder a docentes activos de la Sede Manizales</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                <div className="space-y-1">
                  <div className="p-2 bg-red-50 rounded border border-red-200">externo001@gmail.com</div>
                  <div className="p-2 bg-red-50 rounded border border-red-200">jubilado002@unal.edu.co</div>
                  <div className="p-2 bg-red-50 rounded border border-red-200">bogota003@unal.edu.co</div>
                  <div className="p-2 bg-red-50 rounded border border-red-200">medellin004@unal.edu.co</div>
                  <div className="p-2 bg-red-50 rounded border border-red-200">externo005@hotmail.com</div>
                </div>
                <div className="space-y-1">
                  <div className="p-2 bg-red-50 rounded border border-red-200">palmira006@unal.edu.co</div>
                  <div className="p-2 bg-red-50 rounded border border-red-200">externo007@yahoo.com</div>
                  <div className="p-2 bg-red-50 rounded border border-red-200">jubilado008@unal.edu.co</div>
                  <div className="p-2 bg-red-50 rounded border border-red-200">estudiante009@unal.edu.co</div>
                  <div className="p-2 bg-red-50 rounded border border-red-200">externo010@gmail.com</div>
                </div>
                <div className="space-y-1">
                  <div className="p-2 bg-red-50 rounded border border-red-200">amazonia011@unal.edu.co</div>
                  <div className="p-2 bg-red-50 rounded border border-red-200">externo012@outlook.com</div>
                  <div className="p-2 bg-red-50 rounded border border-red-200">caribe013@unal.edu.co</div>
                  <div className="p-2 bg-red-50 rounded border border-red-200">externo014@gmail.com</div>
                  <div className="p-2 bg-red-50 rounded border border-red-200">tumaco015@unal.edu.co</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab 9: Datos Completos */}
        <div id="datos" className="tab-content">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-xl mb-8 flex gap-5 items-start border border-blue-200">
            <div className="w-15 h-15 bg-[#006BB3] rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
              <i className="fas fa-database"></i>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-3">Datos Completos del Análisis</h2>
              <p>Información detallada y evidencia documental del proceso de creación de la FCHS</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-file-alt text-[#94B43B]"></i>
                  Documentos Analizados
                </h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-center p-3 border-b border-gray-100">
                    <i className="fas fa-file-pdf text-red-600 mr-3"></i>
                    <div>
                      <strong>Propuesta FCHS</strong>
                      <p className="text-sm text-gray-600">Documento oficial presentado al CA</p>
                    </div>
                  </li>
                  <li className="flex items-center p-3 border-b border-gray-100">
                    <i className="fas fa-file-pdf text-red-600 mr-3"></i>
                    <div>
                      <strong>COMUNICADO 006</strong>
                      <p className="text-sm text-gray-600">Representación Profesoral</p>
                    </div>
                  </li>
                  <li className="flex items-center p-3 border-b border-gray-100">
                    <i className="fas fa-file-excel text-green-600 mr-3"></i>
                    <div>
                      <strong>Encuesta Profesoral</strong>
                      <p className="text-sm text-gray-600">108 respuestas válidas</p>
                    </div>
                  </li>
                  <li className="flex items-center p-3 border-b border-gray-100">
                    <i className="fas fa-file-word text-blue-600 mr-3"></i>
                    <div>
                      <strong>Análisis Final</strong>
                      <p className="text-sm text-gray-600">7 puntos críticos</p>
                    </div>
                  </li>
                  <li className="flex items-center p-3">
                    <i className="fas fa-file-alt text-gray-600 mr-3"></i>
                    <div>
                      <strong>Preguntas Técnicas</strong>
                      <p className="text-sm text-gray-600">FCHS Manizales.docx</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                  <i className="fas fa-calendar text-[#94B43B]"></i>
                  Cronología del Proceso
                </h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-20 text-right font-semibold text-gray-600 text-sm">Nov 2024</div>
                    <div className="w-5 h-5 bg-[#94B43B] rounded-full flex-shrink-0 mt-1"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Consultas Oficiales</h4>
                      <p className="text-sm text-gray-600">6.6% estudiantes, 12.3% docentes</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 text-right font-semibold text-gray-600 text-sm">Ene 2025</div>
                    <div className="w-5 h-5 bg-[#94B43B] rounded-full flex-shrink-0 mt-1"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Derechos de Petición</h4>
                      <p className="text-sm text-gray-600">REP.PROF.018, 023 - Sin respuestas claras</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 text-right font-semibold text-gray-600 text-sm">Feb 2025</div>
                    <div className="w-5 h-5 bg-[#94B43B] rounded-full flex-shrink-0 mt-1"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Asamblea Profesoral</h4>
                      <p className="text-sm text-gray-600">Condiciona apoyo a concertación</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-20 text-right font-semibold text-gray-600 text-sm">Jul 2025</div>
                    <div className="w-5 h-5 bg-[#94B43B] rounded-full flex-shrink-0 mt-1"></div>
                    <div className="flex-1">
                      <h4 className="font-semibold">Encuesta Independiente</h4>
                      <p className="text-sm text-gray-600">40.91% participación, 53.7% rechazo</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-list-alt text-[#94B43B]"></i>
                Resumen de Indicadores Críticos
              </h3>
            </div>
            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="p-3 text-left border-b border-gray-200 font-semibold text-gray-800">Indicador</th>
                      <th className="p-3 text-center border-b border-gray-200 font-semibold text-gray-800">Valor Encontrado</th>
                      <th className="p-3 text-center border-b border-gray-200 font-semibold text-gray-800">Valor Esperado</th>
                      <th className="p-3 text-center border-b border-gray-200 font-semibold text-gray-800">Brecha</th>
                      <th className="p-3 text-center border-b border-gray-200 font-semibold text-gray-800">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Participación estudiantil en consulta</td>
                      <td className="p-3 border-b border-gray-200 text-center">6.6%</td>
                      <td className="p-3 border-b border-gray-200 text-center">&gt;50%</td>
                      <td className="p-3 border-b border-gray-200 text-center">-43.4%</td>
                      <td className="p-3 border-b border-gray-200 text-center">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">CRÍTICO</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Apoyo profesoral (encuesta independiente)</td>
                      <td className="p-3 border-b border-gray-200 text-center">19.44%</td>
                      <td className="p-3 border-b border-gray-200 text-center">&gt;60%</td>
                      <td className="p-3 border-b border-gray-200 text-center">-40.56%</td>
                      <td className="p-3 border-b border-gray-200 text-center">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">CRÍTICO</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Costo por estudiante (Año 1)</td>
                      <td className="p-3 border-b border-gray-200 text-center">$89.9M</td>
                      <td className="p-3 border-b border-gray-200 text-center">&lt;$10M</td>
                      <td className="p-3 border-b border-gray-200 text-center">+$79.9M</td>
                      <td className="p-3 border-b border-gray-200 text-center">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">INSOSTENIBLE</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Municipios con oferta duplicada</td>
                      <td className="p-3 border-b border-gray-200 text-center">9 de 11</td>
                      <td className="p-3 border-b border-gray-200 text-center">0</td>
                      <td className="p-3 border-b border-gray-200 text-center">+9</td>
                      <td className="p-3 border-b border-gray-200 text-center">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">CRÍTICO</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Aportes sustantivos incorporados</td>
                      <td className="p-3 border-b border-gray-200 text-center">0 de 3</td>
                      <td className="p-3 border-b border-gray-200 text-center">3 de 3</td>
                      <td className="p-3 border-b border-gray-200 text-center">-3</td>
                      <td className="p-3 border-b border-gray-200 text-center">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">NULO</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">Tendencia matrícula programa base</td>
                      <td className="p-3 border-b border-gray-200 text-center">-42%</td>
                      <td className="p-3 border-b border-gray-200 text-center">&gt;0%</td>
                      <td className="p-3 border-b border-gray-200 text-center">-42%</td>
                      <td className="p-3 border-b border-gray-200 text-center">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">DECRECIENTE</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                      <td className="p-3 border-b border-gray-200">CDP específico presentado</td>
                      <td className="p-3 border-b border-gray-200 text-center">No</td>
                      <td className="p-3 border-b border-gray-200 text-center">Sí</td>
                      <td className="p-3 border-b border-gray-200 text-center">N/A</td>
                      <td className="p-3 border-b border-gray-200 text-center">
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">AUSENTE</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-3">
                <i className="fas fa-exclamation-triangle text-[#94B43B]"></i>
                Conclusiones Finales
              </h3>
            </div>
            <div className="p-6">
              <div className="bg-gradient-to-r from-red-50 to-red-100 p-8 rounded-xl flex gap-5 items-start border border-red-200">
                <div className="w-15 h-15 bg-[#B8272D] rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
                  <i className="fas fa-gavel"></i>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">Recomendación del Análisis</h3>
                  <p className="mb-4">Con base en la evidencia presentada en los 7 puntos del análisis, se recomienda:</p>
                  <ol className="space-y-2 ml-5">
                    <li className="flex items-start">
                      <span className="font-bold text-gray-800 mr-2">1.</span>
                      <strong>Suspender el proceso actual</strong> hasta resolver las brechas identificadas
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-gray-800 mr-2">2.</span>
                      <strong>Realizar un estudio de mercado</strong> riguroso y análisis de demanda real
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-gray-800 mr-2">3.</span>
                      <strong>Presentar documentación financiera</strong> completa con CDP específico
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-gray-800 mr-2">4.</span>
                      <strong>Generar consenso real</strong> con participación representativa (&gt;50%)
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-gray-800 mr-2">5.</span>
                      <strong>Incorporar aportes sustantivos</strong> de la comunidad académica
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-gray-800 mr-2">6.</span>
                      <strong>Resolver discrepancias</strong> financieras y procedimentales
                    </li>
                    <li className="flex items-start">
                      <span className="font-bold text-gray-800 mr-2">7.</span>
                      <strong>Cumplir mandato</strong> de la Asamblea Profesoral
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;