import React, { useRef } from 'react';
import {
  findNodeHandle,
  NativeSyntheticEvent,
  requireNativeComponent,
  StyleProp,
  UIManager,
  ViewStyle,
} from 'react-native';

const RCTCropView = requireNativeComponent('CropView');

type Response = {
  uri: string;
  width: number;
  height: number;
};

type Props = {
  sourceUrl: string;
  style?: StyleProp<ViewStyle>;
  onImageCrop?: (res: Response) => void;
  keepAspectRatio?: boolean;
  aspectRatio?: { width: number; height: number };
};

const CropView = (props: Props) => {
  const { keepAspectRatio = false, sourceUrl, style, onImageCrop, aspectRatio } = props;

  const viewRef = useRef();

  const saveImage = (preserveTransparency: boolean = true, quality: number = 90) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(viewRef.current!),
      UIManager.getViewManagerConfig('CropView').Commands.saveImage,
      [preserveTransparency, quality]
    );
  };

  const rotateImage = (clockwise: boolean = true) => {
    UIManager.dispatchViewManagerCommand(
      findNodeHandle(viewRef.current!),
      UIManager.getViewManagerConfig('CropView').Commands.rotateImage,
      [clockwise]
    );
  };

  return (
    <RCTCropView
      ref={viewRef}
      sourceUrl={sourceUrl}
      style={style}
      onImageSaved={(event: NativeSyntheticEvent<Response>) => {
        onImageCrop!(event.nativeEvent);
      }}
      keepAspectRatio={keepAspectRatio}
      cropAspectRatio={aspectRatio}
    />
  );
};

export default CropView;
