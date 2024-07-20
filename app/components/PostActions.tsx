import * as React from 'react';
import { FAB, Portal,  } from 'react-native-paper';

type groupProps = {
  showModal: () => void
}

const PostActions = ({showModal}: groupProps) => {
  const [state, setState] = React.useState({ open: false });
  const onStateChange = ({ open }: {open: boolean}) => setState({ open });
  const { open } = state;

  return (
      <Portal>
        <FAB.Group
          open={open}
          visible
          style={{
            position: "absolute",
            bottom: 50,
            right: 20,
          }}
          label={ open ? 'Choose an option' : 'New Post' }
          icon={open ? 'calendar-today' : 'plus'}
          actions={[
            { 
              icon: 'image',
              label: "Image",
              onPress: () => console.log('Pressed add'),
            },
            {
              icon: 'video',
              label: 'Video',
              onPress: () => console.log('Pressed star'),
            },
            {
              icon: 'card-text-outline',
              label: 'Text',
              onPress: () => showModal(),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
        />
    </Portal>
  );
};

export default PostActions;