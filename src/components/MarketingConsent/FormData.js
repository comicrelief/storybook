
export default {
  Questions: [
    {
      id: 'emailConsent',
      text: 'Email me',
      name: 'Email',
      customMessage: '',
      options: [
        {
          label: 'Yes',
          value: 'yes',
          name: 'permissionEmail',
          hideFields: false,
        },
      ],
      field: [
        {
          id: 'emailAddress',
          type: 'email',
          name: 'email',
          label: 'Email address',
          placeholder: 'example@email.com',
          required: true,
        },
      ],
    },
    {
      id: 'postConsent',
      text: 'Send me post',
      name: 'Post',
      options: [
        {
          label: 'Yes',
          value: 'yes',
          name: 'permissionPost',
          hideFields: false,
        },
      ],
      field: [
        {
          id: 'address1',
          type: 'text',
          name: 'address1',
          label: 'Address line 1',
          placeholder: null,
          required: true,
        },
        {
          id: 'address2',
          type: 'text',
          name: 'address2',
          label: 'Address line 2',
          placeholder: null,
          required: false,
          min: null,
        },
        {
          id: 'address3',
          type: 'text',
          name: 'address3',
          label: 'Address line 3',
          placeholder: null,
          required: false,
          min: null,
        },
        {
          id: 'town',
          type: 'text',
          name: 'town',
          label: 'Town/City',
          placeholder: null,
          required: true,
          pattern: '[a-zA-Z]+',
          min: null,
        },
        {
          id: 'postcode',
          type: 'text',
          name: 'postcode',
          label: 'Postcode',
          placeholder: 'SE1 7TP',
          required: true,
          pattern: '^[a-zA-Z]{1,2}\\d[a-zA-Z\\d]?\\s*\\d[a-zA-Z]{2}$',
        },
        {
          id: 'country',
          type: 'text',
          name: 'country',
          label: 'Country',
          placeholder: 'United Kingdom',
          required: true,
        },
      ],
    },
    {
      id: 'phoneConsent',
      text: 'Phone me',
      name: 'Phone',
      options: [
        {
          label: 'Yes',
          value: 'yes',
          name: 'permissionPhone',
          hideFields: false,
        },
      ],
      field: [
        {
          id: 'phoneNumber',
          type: 'tel',
          name: 'phone',
          label: 'Phone number',
          placeholder: null,
          required: true,
        },
      ],
    },
    {
      id: 'SMSConsent',
      text: 'Text me',
      name: 'Text',
      options: [
        {
          label: 'Yes',
          value: 'yes',
          name: 'permissionSMS',
          hideFields: false,
        },
      ],
      field: [
        {
          id: 'mobileNumber',
          type: 'tel',
          name: 'mobile',
          label: 'Mobile number',
          placeholder: null,
          required: true,
        },
      ],
    },
  ],
};
