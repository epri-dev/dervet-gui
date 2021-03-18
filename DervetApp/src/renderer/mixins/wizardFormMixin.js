import DropDownInput from '@/components/Shared/DropDownInput';
import NavButton from '@/components/Shared/NavButton';
import RadioButtonInput from '@/components/Shared/RadioButtonInput';
import CancelAndSaveButtons from '@/components/Shared/CancelAndSaveButtons';
import SaveButtons from '@/components/Shared/SaveButtons';
import SaveAndSaveContinue from '@/components/Shared/SaveAndSaveContinue';
import SaveAndNavButtons from '@/components/Shared/SaveAndNavButtons';
import TextInput from '@/components/Shared/TextInput';

export default {
  components: {
    CancelAndSaveButtons,
    DropDownInput,
    NavButton,
    RadioButtonInput,
    SaveButtons,
    SaveAndSaveContinue,
    SaveAndNavButtons,
    TextInput,
  },
  data() {
    return {
      // when a page is first navigated to, set submitted to false
      //   so that un-populated fields do not appear invalid
      submitted: false,
    };
  },
  methods: {
    getErrorMsgWrapped(validation, $v, metadata, fieldName) {
      // this method returns a single validation error message (String)
      // NOTE: the ordering of each if-block is intentional here
      const { displayName } = metadata[fieldName];
      let displayMsg = displayName;

      if (!$v[fieldName].required) {
        displayMsg += ' is required';
        return displayMsg;
      }
      if (validation[fieldName].decimal && !$v[fieldName].decimal) {
        displayMsg += ' must be a number';
        return displayMsg;
      }
      if (validation[fieldName].integer && !$v[fieldName].integer) {
        displayMsg += ' must be an integer';
        return displayMsg;
      }
      if (validation[fieldName].between && !$v[fieldName].between) {
        displayMsg += ` must be between ${metadata[fieldName].minValue}
          and ${metadata[fieldName].maxValue} (inclusive)`;
        return displayMsg;
      }
      if (validation[fieldName].minValue && !$v[fieldName].minValue) {
        displayMsg += ` must be >= ${metadata[fieldName].minValue}`;
        return displayMsg;
      }
      if (validation[fieldName].maxValue && !$v[fieldName].maxValue) {
        displayMsg += ` must be <= ${metadata[fieldName].maxValue}`;
        return displayMsg;
      }
      return '';
    },
  },
};