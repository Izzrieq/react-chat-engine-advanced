import { AttachmentStyles } from './styles';

export interface Props {
  fileName: string;
  imageUrl?: string;
  onRemove?: () => void;
  style?: AttachmentStyles;
}