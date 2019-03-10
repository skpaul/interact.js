/* eslint-disable no-console */
/* global process */
import domObjects from '@interactjs/utils/domObjects';
import { parentNode } from '@interactjs/utils/domUtils';
import * as is from '@interactjs/utils/is';
import win from '@interactjs/utils/window';
export const links = {
    touchAction: 'https://developer.mozilla.org/en-US/docs/Web/CSS/touch-action',
    boxSizing: 'https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing',
};
export const install = process.env.NODE_ENV === 'production'
    ? () => { }
    // eslint-disable-next-line no-restricted-syntax
    : function install(scope, { logger } = {}) {
        logger = logger || console;
        if (process.env.NODE_ENV !== 'production') {
            scope.logger = logger;
            scope.interactions.signals.on('action-start', ({ interaction }) => {
                touchAction(interaction, scope.logger);
                boxSizing(interaction, scope.logger);
                noListeners(interaction, scope.logger);
            });
        }
    };
export const touchActionMessage = '[interact.js] Consider adding CSS "touch-action: none" to this element\n';
export const boxSizingMessage = '[interact.js] Consider adding CSS "box-sizing: border-box" to this resizable element';
export const noListenersMessage = '[interact.js] There are no listeners set for this action';
export function touchAction({ element }, logger) {
    if (!parentHasStyle(element, 'touchAction', /pan-|pinch|none/)) {
        logger.warn(touchActionMessage, element, links.touchAction);
    }
}
export function boxSizing(interaction, logger) {
    const { element } = interaction;
    if (interaction.prepared.name === 'resize' &&
        element instanceof domObjects.HTMLElement &&
        !hasStyle(element, 'boxSizing', /border-box/)) {
        logger.warn(boxSizingMessage, element, links.boxSizing);
    }
}
export function noListeners(interaction, logger) {
    const actionName = interaction.prepared.name;
    const moveListeners = interaction.interactable.events.types[`${actionName}move`] || [];
    if (!moveListeners.length) {
        logger.warn(noListenersMessage, actionName, interaction.interactable);
    }
}
function hasStyle(element, prop, styleRe) {
    return styleRe.test(element.style[prop] || win.window.getComputedStyle(element)[prop]);
}
function parentHasStyle(element, prop, styleRe) {
    let parent = element;
    while (is.element(parent)) {
        if (hasStyle(parent, prop, styleRe)) {
            return true;
        }
        parent = parentNode(parent);
    }
    return false;
}
export default {
    install,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwrQkFBK0I7QUFDL0Isb0JBQW9CO0FBQ3BCLE9BQU8sVUFBVSxNQUFNLDhCQUE4QixDQUFBO0FBQ3JELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQTtBQUN2RCxPQUFPLEtBQUssRUFBRSxNQUFNLHNCQUFzQixDQUFBO0FBQzFDLE9BQU8sR0FBRyxNQUFNLDBCQUEwQixDQUFBO0FBYzFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBRztJQUNuQixXQUFXLEVBQUUsK0RBQStEO0lBQzVFLFNBQVMsRUFBRSw2REFBNkQ7Q0FDekUsQ0FBQTtBQUVELE1BQU0sQ0FBQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZO0lBQzFELENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRSxDQUFDO0lBQ1YsZ0RBQWdEO0lBQ2hELENBQUMsQ0FBQyxTQUFTLE9BQU8sQ0FBRSxLQUFxQixFQUFFLEVBQUUsTUFBTSxLQUEwQixFQUFFO1FBQzdFLE1BQU0sR0FBRyxNQUFNLElBQUksT0FBTyxDQUFBO1FBQzFCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssWUFBWSxFQUFFO1lBQ3pDLEtBQUssQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1lBQ3JCLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUU7Z0JBQ2hFLFdBQVcsQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO2dCQUN0QyxTQUFTLENBQUMsV0FBVyxFQUFFLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtnQkFDcEMsV0FBVyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDeEMsQ0FBQyxDQUFDLENBQUE7U0FDSDtJQUNILENBQUMsQ0FBQTtBQUVILE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLDBFQUEwRSxDQUFBO0FBQzVHLE1BQU0sQ0FBQyxNQUFNLGdCQUFnQixHQUFHLHNGQUFzRixDQUFBO0FBQ3RILE1BQU0sQ0FBQyxNQUFNLGtCQUFrQixHQUFHLDBEQUEwRCxDQUFBO0FBRTVGLE1BQU0sVUFBVSxXQUFXLENBQUUsRUFBRSxPQUFPLEVBQXdCLEVBQUUsTUFBYztJQUM1RSxJQUFJLENBQUMsY0FBYyxDQUFDLE9BQU8sRUFBRSxhQUFhLEVBQUUsaUJBQWlCLENBQUMsRUFBRTtRQUM5RCxNQUFNLENBQUMsSUFBSSxDQUNULGtCQUFrQixFQUNsQixPQUFPLEVBQ1AsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFBO0tBQ3JCO0FBQ0gsQ0FBQztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUUsV0FBaUMsRUFBRSxNQUFjO0lBQzFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxXQUFXLENBQUE7SUFFL0IsSUFDRSxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxRQUFRO1FBQ3RDLE9BQU8sWUFBWSxVQUFVLENBQUMsV0FBVztRQUN6QyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFlBQVksQ0FBQyxFQUM3QztRQUNBLE1BQU0sQ0FBQyxJQUFJLENBQ1QsZ0JBQWdCLEVBQ2hCLE9BQU8sRUFDUCxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUE7S0FDbkI7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLFdBQVcsQ0FBRSxXQUFpQyxFQUFFLE1BQWM7SUFDNUUsTUFBTSxVQUFVLEdBQUcsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUE7SUFDNUMsTUFBTSxhQUFhLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsVUFBVSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUE7SUFFdEYsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLEVBQUU7UUFDekIsTUFBTSxDQUFDLElBQUksQ0FDVCxrQkFBa0IsRUFDbEIsVUFBVSxFQUNWLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQTtLQUM1QjtBQUNILENBQUM7QUFFRCxTQUFTLFFBQVEsQ0FBRSxPQUFvQixFQUFFLElBQStCLEVBQUUsT0FBZTtJQUN2RixPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7QUFDeEYsQ0FBQztBQUVELFNBQVMsY0FBYyxDQUFFLE9BQWdCLEVBQUUsSUFBK0IsRUFBRSxPQUFlO0lBQ3pGLElBQUksTUFBTSxHQUFHLE9BQXNCLENBQUE7SUFFbkMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3pCLElBQUksUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUU7WUFDbkMsT0FBTyxJQUFJLENBQUE7U0FDWjtRQUVELE1BQU0sR0FBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUE7S0FDNUI7SUFFRCxPQUFPLEtBQUssQ0FBQTtBQUNkLENBQUM7QUFFRCxlQUFlO0lBQ2IsT0FBTztDQUNSLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG4vKiBnbG9iYWwgcHJvY2VzcyAqL1xuaW1wb3J0IGRvbU9iamVjdHMgZnJvbSAnQGludGVyYWN0anMvdXRpbHMvZG9tT2JqZWN0cydcbmltcG9ydCB7IHBhcmVudE5vZGUgfSBmcm9tICdAaW50ZXJhY3Rqcy91dGlscy9kb21VdGlscydcbmltcG9ydCAqIGFzIGlzIGZyb20gJ0BpbnRlcmFjdGpzL3V0aWxzL2lzJ1xuaW1wb3J0IHdpbiBmcm9tICdAaW50ZXJhY3Rqcy91dGlscy93aW5kb3cnXG5cbmRlY2xhcmUgbW9kdWxlICdAaW50ZXJhY3Rqcy9jb3JlL3Njb3BlJyB7XG4gIGludGVyZmFjZSBTY29wZSB7XG4gICAgbG9nZ2VyOiBMb2dnZXJcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIExvZ2dlciB7XG4gIHdhcm46ICguLi5hcmdzOiBhbnlbXSkgPT4gdm9pZFxuICBlcnJvcjogKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkXG4gIGxvZzogKC4uLmFyZ3M6IGFueVtdKSA9PiB2b2lkXG59XG5cbmV4cG9ydCBjb25zdCBsaW5rcyA9IHtcbiAgdG91Y2hBY3Rpb246ICdodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9DU1MvdG91Y2gtYWN0aW9uJyxcbiAgYm94U2l6aW5nOiAnaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQ1NTL2JveC1zaXppbmcnLFxufVxuXG5leHBvcnQgY29uc3QgaW5zdGFsbCA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAncHJvZHVjdGlvbidcbiAgPyAoKSA9PiB7fVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcmVzdHJpY3RlZC1zeW50YXhcbiAgOiBmdW5jdGlvbiBpbnN0YWxsIChzY29wZTogSW50ZXJhY3QuU2NvcGUsIHsgbG9nZ2VyIH06IHsgbG9nZ2VyPzogTG9nZ2VyIH0gPSB7fSkge1xuICAgIGxvZ2dlciA9IGxvZ2dlciB8fCBjb25zb2xlXG4gICAgaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSAncHJvZHVjdGlvbicpIHtcbiAgICAgIHNjb3BlLmxvZ2dlciA9IGxvZ2dlclxuICAgICAgc2NvcGUuaW50ZXJhY3Rpb25zLnNpZ25hbHMub24oJ2FjdGlvbi1zdGFydCcsICh7IGludGVyYWN0aW9uIH0pID0+IHtcbiAgICAgICAgdG91Y2hBY3Rpb24oaW50ZXJhY3Rpb24sIHNjb3BlLmxvZ2dlcilcbiAgICAgICAgYm94U2l6aW5nKGludGVyYWN0aW9uLCBzY29wZS5sb2dnZXIpXG4gICAgICAgIG5vTGlzdGVuZXJzKGludGVyYWN0aW9uLCBzY29wZS5sb2dnZXIpXG4gICAgICB9KVxuICAgIH1cbiAgfVxuXG5leHBvcnQgY29uc3QgdG91Y2hBY3Rpb25NZXNzYWdlID0gJ1tpbnRlcmFjdC5qc10gQ29uc2lkZXIgYWRkaW5nIENTUyBcInRvdWNoLWFjdGlvbjogbm9uZVwiIHRvIHRoaXMgZWxlbWVudFxcbidcbmV4cG9ydCBjb25zdCBib3hTaXppbmdNZXNzYWdlID0gJ1tpbnRlcmFjdC5qc10gQ29uc2lkZXIgYWRkaW5nIENTUyBcImJveC1zaXppbmc6IGJvcmRlci1ib3hcIiB0byB0aGlzIHJlc2l6YWJsZSBlbGVtZW50J1xuZXhwb3J0IGNvbnN0IG5vTGlzdGVuZXJzTWVzc2FnZSA9ICdbaW50ZXJhY3QuanNdIFRoZXJlIGFyZSBubyBsaXN0ZW5lcnMgc2V0IGZvciB0aGlzIGFjdGlvbidcblxuZXhwb3J0IGZ1bmN0aW9uIHRvdWNoQWN0aW9uICh7IGVsZW1lbnQgfTogSW50ZXJhY3QuSW50ZXJhY3Rpb24sIGxvZ2dlcjogTG9nZ2VyKSB7XG4gIGlmICghcGFyZW50SGFzU3R5bGUoZWxlbWVudCwgJ3RvdWNoQWN0aW9uJywgL3Bhbi18cGluY2h8bm9uZS8pKSB7XG4gICAgbG9nZ2VyLndhcm4oXG4gICAgICB0b3VjaEFjdGlvbk1lc3NhZ2UsXG4gICAgICBlbGVtZW50LFxuICAgICAgbGlua3MudG91Y2hBY3Rpb24pXG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJveFNpemluZyAoaW50ZXJhY3Rpb246IEludGVyYWN0LkludGVyYWN0aW9uLCBsb2dnZXI6IExvZ2dlcikge1xuICBjb25zdCB7IGVsZW1lbnQgfSA9IGludGVyYWN0aW9uXG5cbiAgaWYgKFxuICAgIGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWUgPT09ICdyZXNpemUnICYmXG4gICAgZWxlbWVudCBpbnN0YW5jZW9mIGRvbU9iamVjdHMuSFRNTEVsZW1lbnQgJiZcbiAgICAhaGFzU3R5bGUoZWxlbWVudCwgJ2JveFNpemluZycsIC9ib3JkZXItYm94LylcbiAgKSB7XG4gICAgbG9nZ2VyLndhcm4oXG4gICAgICBib3hTaXppbmdNZXNzYWdlLFxuICAgICAgZWxlbWVudCxcbiAgICAgIGxpbmtzLmJveFNpemluZylcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbm9MaXN0ZW5lcnMgKGludGVyYWN0aW9uOiBJbnRlcmFjdC5JbnRlcmFjdGlvbiwgbG9nZ2VyOiBMb2dnZXIpIHtcbiAgY29uc3QgYWN0aW9uTmFtZSA9IGludGVyYWN0aW9uLnByZXBhcmVkLm5hbWVcbiAgY29uc3QgbW92ZUxpc3RlbmVycyA9IGludGVyYWN0aW9uLmludGVyYWN0YWJsZS5ldmVudHMudHlwZXNbYCR7YWN0aW9uTmFtZX1tb3ZlYF0gfHwgW11cblxuICBpZiAoIW1vdmVMaXN0ZW5lcnMubGVuZ3RoKSB7XG4gICAgbG9nZ2VyLndhcm4oXG4gICAgICBub0xpc3RlbmVyc01lc3NhZ2UsXG4gICAgICBhY3Rpb25OYW1lLFxuICAgICAgaW50ZXJhY3Rpb24uaW50ZXJhY3RhYmxlKVxuICB9XG59XG5cbmZ1bmN0aW9uIGhhc1N0eWxlIChlbGVtZW50OiBIVE1MRWxlbWVudCwgcHJvcDoga2V5b2YgQ1NTU3R5bGVEZWNsYXJhdGlvbiwgc3R5bGVSZTogUmVnRXhwKSB7XG4gIHJldHVybiBzdHlsZVJlLnRlc3QoZWxlbWVudC5zdHlsZVtwcm9wXSB8fCB3aW4ud2luZG93LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudClbcHJvcF0pXG59XG5cbmZ1bmN0aW9uIHBhcmVudEhhc1N0eWxlIChlbGVtZW50OiBFbGVtZW50LCBwcm9wOiBrZXlvZiBDU1NTdHlsZURlY2xhcmF0aW9uLCBzdHlsZVJlOiBSZWdFeHApIHtcbiAgbGV0IHBhcmVudCA9IGVsZW1lbnQgYXMgSFRNTEVsZW1lbnRcblxuICB3aGlsZSAoaXMuZWxlbWVudChwYXJlbnQpKSB7XG4gICAgaWYgKGhhc1N0eWxlKHBhcmVudCwgcHJvcCwgc3R5bGVSZSkpIHtcbiAgICAgIHJldHVybiB0cnVlXG4gICAgfVxuXG4gICAgcGFyZW50ID0gcGFyZW50Tm9kZShwYXJlbnQpXG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuZXhwb3J0IGRlZmF1bHQge1xuICBpbnN0YWxsLFxufVxuIl19