import { BlockModel, ComposerComponentProps, FeedComponentProps } from './types';

export const Temp_appFeedComponent = ({ model }: FeedComponentProps) => {
  return <h1>Hi, I'm in the feed!</h1>;
}

export const Temp_appComposerComponent = ({ model, done }: ComposerComponentProps) => {
  return (
    <div>
      <h1>Hi, I'm in the composer!</h1>
      <button onClick={() => { done(model) }}> Post </button>
    </div>
  );
}