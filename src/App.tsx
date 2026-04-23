import { useQueryState } from 'nuqs';
import { useCallback } from 'react';

import { contentMap, fileTree } from './__mock__/tree';
import { EditorLayout } from './components/templates/EditorLayout';
import {
  DEFAULT_FILE_PATH,
  FILE_QUERY_KEY,
  FILE_QUERY_STATE_OPTIONS,
} from './lib/file-query';

export default function App() {
  const [selectedPath, setSelectedPath] = useQueryState(
    FILE_QUERY_KEY,
    FILE_QUERY_STATE_OPTIONS,
  );
  const currentPath = selectedPath ?? DEFAULT_FILE_PATH;
  const content = contentMap[currentPath];
  const notFound = content === undefined;
  const tooLarge = content === null;

  const onSelectFile = useCallback(
    (path: string) => {
      void setSelectedPath(path);
    },
    [setSelectedPath],
  );

  return (
    <EditorLayout
      tree={fileTree}
      selectedPath={currentPath}
      selectedContent={content ?? undefined}
      notFound={notFound}
      tooLarge={tooLarge}
      onSelectFile={onSelectFile}
    />
  );
}
