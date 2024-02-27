export const theme = {
  colors: {
    brand: [
      '#f8dcee',
      '#914573',
      '#914573',
      '#914573',
      '#914573',
      '#914573',
      '#914573',
      '#914573',
      '#914573',
      '#29091c',
    ],
  },
  primaryColor: 'brand',
  components: {
    Button: {
      variants: {
        success: (theme) => ({
          root: {
            backgroundColor: '#00A99D',
            color: '#FFFFFF',
            ...theme.fn.hover({ backgroundColor: '#00A99D' }),
          },
        }),
        danger: (theme) => ({
          root: {
            backgroundColor: '#F44336',
            color: '#FFFFFF',
            ...theme.fn.hover({ backgroundColor: '#F44336' }),
          },
        }),
        filled: (theme) => ({
          root: {
            backgroundColor: '#F79122',
            color: '#FFFFFF',
            ...theme.fn.hover({ backgroundColor: '#F79122' }),
          },
        }),
        outline: (theme) => ({
          root: {
            backgroundColor: '#FFFFFF',
            color: '#F79122',
            borderColor: '#F79122',
            ...theme.fn.hover({ backgroundColor: '#fae5cf' }),
          },
        }),
        light: (theme) => ({
          root: {
            backgroundColor: '#fae5cf',
            color: '#F79122',
            ...theme.fn.hover({ backgroundColor: '#e7c096' }),
          },
        }),
      },
    },
  },
};
