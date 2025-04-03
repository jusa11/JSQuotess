import { PieChart, Pie, Cell } from 'recharts';

const MyChart = ({ dataLevel }) => {
  const needQuoteForNextLevel = dataLevel?.needQuoteForNextLevel ?? 1;
  const needQuoteForCurrnetLevel = dataLevel?.needQuoteForCurrnetLevel ?? 1;

  // Считаем правильный процент (сколько уже набрано)
  const collectedOnCurrentLevel =
    needQuoteForCurrnetLevel - needQuoteForNextLevel;
  const progress = Math.min(
    (collectedOnCurrentLevel / needQuoteForCurrnetLevel) * 100,
    100
  );
  const difference = 100 - progress;

  const data = [
    { name: 'Used', value: progress },
    { name: 'Free', value: difference },
  ];

  return (
    <>
      <div className="chart-wrapper">
        <div className="chart-percent">{`${progress.toFixed(0)}%`}</div>
        <PieChart
          width={200}
          height={200}
          style={{ filter: 'drop-shadow(3px 3px 8px rgba(0, 0, 0, 0.3))' }}
          className="chart-stats"
        >
          <defs>
            <linearGradient
              id="lightGoldGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#E6B76A" stopOpacity={1} />
              <stop offset="100%" stopColor="#C68E3C" stopOpacity={1} />
            </linearGradient>

            <linearGradient
              id="lightTealGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#4FB6B1" stopOpacity={1} />
              <stop offset="100%" stopColor="#2F847F" stopOpacity={1} />
            </linearGradient>
          </defs>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            cornerRadius={4}
            strokeWidth={0}
            startAngle={90}
            endAngle={450}
            paddingAngle={3}
            dataKey="value"
          >
            <Cell fill="url(#lightGoldGrad)" />
            <Cell fill="url(#lightTealGrad)" />
          </Pie>
        </PieChart>
      </div>
    </>
  );
};

export default MyChart;
