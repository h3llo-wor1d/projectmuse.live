import React, { useRef, useState, useEffect, useCallback } from "react";
import Slime1 from '../../images/adhd/slime_1.webp';
import Surfers1 from '../../images/adhd/surfers_1.webp';
import Surfers2 from '../../images/adhd/surfers_2.webp';
import styled from 'styled-components';

const getRandom = a => {
    return a[Math.floor(Math.random() * a.length)]
}

const NoSelect = styled.img `
-moz-user-select: none;
-webkit-user-select: none;
user-select: none;
pointer-events: none;
opacity: 0.6;
`
/// throttle.ts
export const throttle = (f) => {
  let token = null,
    lastArgs = null;
  const invoke = () => {
    f(...lastArgs);
    token = null;
  };
  const result = (...args) => {
    lastArgs = args;
    if (!token) {
      token = requestAnimationFrame(invoke);
    }
  };
  result.cancel = () => token && cancelAnimationFrame(token);
  return result;
};

/// use-draggable.ts
const id = (x) => x;
// complex logic should be a hook, not a component
const useDraggable = ({ onDrag = id } = {}) => {
  // this state doesn't change often, so it's fine
  const [pressed, setPressed] = useState(false);

  // do not store position in useState! even if you useEffect on
  // it and update `transform` CSS property, React still rerenders
  // on every state change, and it LAGS
  const position = useRef({ x: 0, y: 0 });
  const ref = useRef();

  // we've moved the code into the hook, and it would be weird to
  // return `ref` and `handleMouseDown` to be set on the same element
  // why not just do the job on our own here and use a function-ref
  // to subscribe to `mousedown` too? it would go like this:
  const unsubscribe = useRef();
  const legacyRef = useCallback((elem) => {
    // in a production version of this code I'd use a
    // `useComposeRef` hook to compose function-ref and object-ref
    // into one ref, and then would return it. combining
    // hooks in this way by hand is error-prone

    // then I'd also split out the rest of this function into a
    // separate hook to be called like this:
    // const legacyRef = useDomEvent('mousedown');
    // const combinedRef = useCombinedRef(ref, legacyRef);
    // return [combinedRef, pressed];
    ref.current = elem;
    if (unsubscribe.current) {
      unsubscribe.current();
    }
    if (!elem) {
      return;
    }
    const handleMouseDown = (e) => {
      // don't forget to disable text selection during drag and drop
      // operations
      e.target.style.userSelect = "none";
      setPressed(true);
    };
    elem.addEventListener("mousedown", handleMouseDown);
    unsubscribe.current = () => {
      elem.removeEventListener("mousedown", handleMouseDown);
    };
  }, []);
  // useEffect(() => {
  //   return () => {
  //     // this shouldn't really happen if React properly calls
  //     // function-refs, but I'm not proficient enough to know
  //     // for sure, and you might get a memory leak out of it
  //     if (unsubscribe.current) {
  //       unsubscribe.current();
  //     }
  //   };
  // }, []);

  useEffect(() => {
    if (!pressed) {
      return;
    }
    const handleMouseMove = throttle((event) => {
      // needed for TypeScript anyway
      if (!ref.current || !position.current) {
        return;
      }
      const pos = position.current;
      const elem = ref.current;
      position.current = onDrag({
        x: pos.x + event.movementX,
        y: pos.y + event.movementY
      });
      elem.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    });
    const handleMouseUp = (e) => {
      e.target.style.userSelect = "auto";
      setPressed(false);
    };
    // subscribe to mousemove and mouseup on document, otherwise you
    // can escape bounds of element while dragging and get stuck
    // dragging it forever
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      handleMouseMove.cancel();
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
    // if `onDrag` wasn't defined with `useCallback`, we'd have to
    // resubscribe to 2 DOM events here, not to say it would mess
    // with `throttle` and reset its internal timer
  }, [pressed, onDrag]);

  // actually it makes sense to return an array only when
  // you expect that on the caller side all of the fields
  // will be usually renamed
  return [legacyRef, pressed];

  // > seems the best of them all to me
  // this code doesn't look pretty anymore, huh?
};

/// example.ts
const quickAndDirtyStyle = {
  width: "fit-content",
  height: "fit-content",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed"
};

export default function VideoPlayer () {
    const [image, setImage] = useState(Slime1);

    function initImage() {
        setImage(getRandom([Slime1, Surfers1, Surfers2]));
    }

    useEffect(() => {
        initImage()
    }, [])
  
  const handleDrag = useCallback(
    ({ x, y }) => ({
      x: Math.max(0, x),
      y: Math.max(0, y)
    }),
    []
  );

  const [ref, pressed] = useDraggable({
    onDrag: handleDrag
  });

  return (
    <div ref={ref} style={quickAndDirtyStyle}>
        {/* add shit here */}
        <NoSelect src={image} alt="slime1"/>
    </div>
  );
};