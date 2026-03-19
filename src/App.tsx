import { useCallback } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import { contentMap, fileTree } from './__mock__/tree';
import { EditorLayout } from './components/templates/EditorLayout';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname.replace(/^\/+|\/+$/g, '');
  const selectedPath = pathname || null;
  const content = selectedPath ? contentMap[selectedPath] : undefined;
  const notFound = selectedPath !== null && content === undefined;
  const tooLarge = selectedPath !== null && content === null;

  const onSelectFile = useCallback(
    (path: string) => {
      navigate(`/${path}`, { replace: true });
    },
    [navigate],
  );

  if (selectedPath === null) {
    return <Navigate to="/README.md" replace />;
  }

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
