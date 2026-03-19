import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { contentMap, fileTree } from './__mock__/tree';
import { EditorLayout } from './components/templates/EditorLayout';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Figure out if we can load the file, and either do it or show the not
  // found state.
  const pathname = location.pathname.replace(/^\/+|\/+$/g, '');
  const selectedPath = pathname || null;
  const content = selectedPath ? contentMap[selectedPath] : undefined;
  const notFound = selectedPath !== null && content === undefined;
  const tooLarge = selectedPath !== null && content === null;

  // Navigate to the selected file.
  const onSelectFile = useCallback(
    (path: string) => {
      navigate(`/${path}`, { replace: true });
    },
    [navigate],
  );

  return (
    <EditorLayout
      tree={fileTree}
      selectedPath={selectedPath}
      selectedContent={content ?? undefined}
      notFound={notFound}
      tooLarge={tooLarge}
      onSelectFile={onSelectFile}
    />
  );
}
