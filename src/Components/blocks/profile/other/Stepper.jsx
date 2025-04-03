import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGetQuotesCountQuery } from '../../../redux/api/countQuotesApi';
import { selectUser } from '../../../redux/slices/userSlice';
import steps from '../../../../utils/steps';
import { useOutletRef } from '../../../../Hooks/useOutletRef';

gsap.registerPlugin(ScrollTrigger);

const Stepper = () => {
  const user = useSelector(selectUser);
  const ref = useRef(null);
  const outletRef = useOutletRef();
  const { data, error, isLoading } = useGetQuotesCountQuery(user.username, {
    skip: !user?.username,
  });

  useEffect(() => {
    if (ref.current && !outletRef.current.includes(ref.current)) {
      outletRef.current.push(ref.current);
    }
  }, [outletRef]);

  if (isLoading) {
    return <p>Загрузка...</p>;
  }
  if (error) {
    console.log('Ошибка:', error);
    return <p>Ошибка загрузки данных</p>;
  }

  const level = data?.currentLevel;

  const defineCurrentStep = (index) => {
    if (level >= index) {
      return 'stepper-item__icon_complete';
    }
    if (index - level === 1) {
      return 'stepper-item__icon_process';
    } else {
      return 'stepper-item__icon_pending';
    }
  };

  return (
    <div ref={ref} className="stepper content-right__card card">
      <div className="stepper-wrapper">
        <ul className="stepper-list">
          {steps.map((step, index) => {
            return (
              <li className="stepper-list__item" key={index}>
                <div
                  className={`stepper-item__icon ${defineCurrentStep(index)}`}
                ></div>
                <div className="stepper-item__body">
                  <div className="stepper-item__title">{step.title}</div>
                  <div className="stepper-item__description">{step.desc}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Stepper;
