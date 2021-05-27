import { ConfigFormSection, TimelineConfig } from '../global-config.model';
import { T } from '../../../t.const';

const isValidSplitTime = (v: string | undefined): boolean => {
  if (v && v.split) {
    const split = v.split(':');
    return (
      split.length === 2 &&
      !isNaN(+split[0]) &&
      !isNaN(+split[1]) &&
      +split[0] >= 0 &&
      +split[0] <= 24 &&
      +split[1] >= 0 &&
      +split[1] <= 59
    );
  }
  return false;
};

export const TIMELINE_FORM_CFG: ConfigFormSection<TimelineConfig> = {
  title: T.GCF.TIMELINE.TITLE,
  help: T.GCF.TIMELINE.HELP,
  key: 'timeline',
  items: [
    {
      key: 'isWorkStartEndEnabled',
      type: 'checkbox',
      templateOptions: {
        label: T.GCF.TIMELINE.L_IS_WORK_START_END_ENABLED,
      },
    },
    {
      hideExpression: (m, v, field) => !field?.model.isWorkStartEndEnabled,
      key: 'workStart',
      type: 'input',
      templateOptions: {
        required: true,
        label: T.GCF.TIMELINE.L_WORK_START,
        description: T.GCF.TIMELINE.WORK_START_END_DESCRIPTION,
      },
      validators: {
        validTimeString: (c: { value: string | undefined }) => {
          return isValidSplitTime(c.value);
        },
      },
    },
    {
      hideExpression: (m, v, field) => !field?.model.isWorkStartEndEnabled,
      key: 'workEnd',
      type: 'input',
      templateOptions: {
        required: true,
        label: T.GCF.TIMELINE.L_WORK_END,
        description: T.GCF.TIMELINE.WORK_START_END_DESCRIPTION,
      },
      validators: {
        validTimeString: (c: { value: string | undefined }) => {
          return isValidSplitTime(c.value);
        },
      },
    },
  ],
};
