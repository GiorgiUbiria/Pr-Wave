var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key2, value) => key2 in obj ? __defProp(obj, key2, { enumerable: true, configurable: true, writable: true, value }) : obj[key2] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key2 of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key2) && key2 !== except)
        __defProp(to, key2, { get: () => from[key2], enumerable: !(desc = __getOwnPropDesc(from, key2)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __publicField = (obj, key2, value) => {
  __defNormalProp(obj, typeof key2 !== "symbol" ? key2 + "" : key2, value);
  return value;
};
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};

// .svelte-kit/output/server/chunks/index3.js
function run_all(arr) {
  for (var i2 = 0; i2 < arr.length; i2++) {
    arr[i2]();
  }
}
function run(fn) {
  return fn();
}
function subscribe_to_store(store, run2, invalidate) {
  if (store == null) {
    run2(void 0);
    if (invalidate)
      invalidate(void 0);
    return noop;
  }
  const unsub = store.subscribe(
    run2,
    // @ts-expect-error
    invalidate
  );
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function flush_tasks() {
}
function set_current_untracked_writes(value) {
  current_untracked_writes = value;
}
function is_runes(context) {
  const component_context = context || current_component_context;
  return component_context !== null && component_context.r;
}
function is_signal_dirty(signal) {
  const flags = signal.f;
  if ((flags & DIRTY) !== 0 || signal.v === UNINITIALIZED) {
    return true;
  }
  if ((flags & MAYBE_DIRTY) !== 0) {
    const dependencies = (
      /** @type {import('./types.js').Reaction} **/
      signal.d
    );
    if (dependencies !== null) {
      const length = dependencies.length;
      let i2;
      for (i2 = 0; i2 < length; i2++) {
        const dependency = dependencies[i2];
        if ((dependency.f & MAYBE_DIRTY) !== 0 && !is_signal_dirty(dependency)) {
          set_signal_status(dependency, CLEAN);
          continue;
        }
        if ((dependency.f & DIRTY) !== 0) {
          if ((dependency.f & DERIVED) !== 0) {
            update_derived(
              /** @type {import('./types.js').Derived} **/
              dependency,
              true
            );
            if ((signal.f & DIRTY) !== 0) {
              return true;
            }
          } else {
            return true;
          }
        }
        const is_unowned = (flags & UNOWNED) !== 0;
        const write_version = signal.w;
        const dep_write_version = dependency.w;
        if (is_unowned && dep_write_version > write_version) {
          signal.w = dep_write_version;
          return true;
        }
      }
    }
  }
  return false;
}
function execute_signal_fn(signal) {
  const init2 = signal.i;
  const flags = signal.f;
  const previous_dependencies = current_dependencies;
  const previous_dependencies_index = current_dependencies_index;
  const previous_untracked_writes = current_untracked_writes;
  const previous_consumer = current_consumer;
  const previous_block = current_block;
  const previous_component_context = current_component_context;
  const previous_skip_consumer = current_skip_consumer;
  const is_render_effect = (flags & RENDER_EFFECT) !== 0;
  const previous_untracking = current_untracking;
  current_dependencies = /** @type {null | import('./types.js').Value[]} */
  null;
  current_dependencies_index = 0;
  current_untracked_writes = null;
  current_consumer = signal;
  current_block = signal.b;
  current_component_context = signal.x;
  current_skip_consumer = !is_flushing_effect && (flags & UNOWNED) !== 0;
  current_untracking = false;
  try {
    let res;
    if (is_render_effect) {
      res = /** @type {(block: import('./types.js').Block, signal: import('./types.js').Signal) => V} */
      init2(
        /** @type {import('./types.js').Block} */
        signal.b,
        /** @type {import('./types.js').Signal} */
        signal
      );
    } else {
      res = /** @type {() => V} */
      init2();
    }
    let dependencies = (
      /** @type {import('./types.js').Value<unknown>[]} **/
      signal.d
    );
    if (current_dependencies !== null) {
      let i2;
      if (dependencies !== null) {
        const deps_length = dependencies.length;
        const full_current_dependencies = current_dependencies_index === 0 ? current_dependencies : dependencies.slice(0, current_dependencies_index).concat(current_dependencies);
        const current_dep_length = full_current_dependencies.length;
        const full_current_dependencies_set = current_dep_length > 16 && deps_length - current_dependencies_index > 1 ? new Set(full_current_dependencies) : null;
        for (i2 = current_dependencies_index; i2 < deps_length; i2++) {
          const dependency = dependencies[i2];
          if (full_current_dependencies_set !== null ? !full_current_dependencies_set.has(dependency) : !full_current_dependencies.includes(dependency)) {
            remove_consumer(signal, dependency);
          }
        }
      }
      if (dependencies !== null && current_dependencies_index > 0) {
        dependencies.length = current_dependencies_index + current_dependencies.length;
        for (i2 = 0; i2 < current_dependencies.length; i2++) {
          dependencies[current_dependencies_index + i2] = current_dependencies[i2];
        }
      } else {
        signal.d = /** @type {import('./types.js').Value<V>[]} **/
        dependencies = current_dependencies;
      }
      if (!current_skip_consumer) {
        for (i2 = current_dependencies_index; i2 < dependencies.length; i2++) {
          const dependency = dependencies[i2];
          const consumers = dependency.c;
          if (consumers === null) {
            dependency.c = [signal];
          } else if (consumers[consumers.length - 1] !== signal) {
            consumers.push(signal);
          }
        }
      }
    } else if (dependencies !== null && current_dependencies_index < dependencies.length) {
      remove_consumers(signal, current_dependencies_index);
      dependencies.length = current_dependencies_index;
    }
    return res;
  } finally {
    current_dependencies = previous_dependencies;
    current_dependencies_index = previous_dependencies_index;
    current_untracked_writes = previous_untracked_writes;
    current_consumer = previous_consumer;
    current_block = previous_block;
    current_component_context = previous_component_context;
    current_skip_consumer = previous_skip_consumer;
    current_untracking = previous_untracking;
  }
}
function remove_consumer(signal, dependency) {
  const consumers = dependency.c;
  let consumers_length = 0;
  if (consumers !== null) {
    consumers_length = consumers.length - 1;
    const index21 = consumers.indexOf(signal);
    if (index21 !== -1) {
      if (consumers_length === 0) {
        dependency.c = null;
      } else {
        consumers[index21] = consumers[consumers_length];
        consumers.pop();
      }
    }
  }
  if (consumers_length === 0 && (dependency.f & UNOWNED) !== 0) {
    set_signal_status(dependency, DIRTY);
    remove_consumers(
      /** @type {import('./types.js').Reaction} **/
      dependency,
      0
    );
  }
}
function remove_consumers(signal, start_index) {
  const dependencies = signal.d;
  if (dependencies !== null) {
    const active_dependencies = start_index === 0 ? null : dependencies.slice(0, start_index);
    let i2;
    for (i2 = start_index; i2 < dependencies.length; i2++) {
      const dependency = dependencies[i2];
      if (active_dependencies === null || !active_dependencies.includes(dependency)) {
        remove_consumer(signal, dependency);
      }
    }
  }
}
function destroy_references(signal) {
  const references = signal.r;
  signal.r = null;
  if (references !== null) {
    let i2;
    for (i2 = 0; i2 < references.length; i2++) {
      destroy_signal(references[i2]);
    }
  }
}
function report_error(block, error) {
  let current_block2 = block;
  if (current_block2 !== null) {
    throw error;
  }
}
function execute_effect(signal) {
  if ((signal.f & DESTROYED) !== 0) {
    return;
  }
  const teardown = signal.v;
  const previous_effect = current_effect;
  current_effect = signal;
  try {
    destroy_references(signal);
    if (teardown !== null) {
      teardown();
    }
    const possible_teardown = execute_signal_fn(signal);
    if (typeof possible_teardown === "function") {
      signal.v = possible_teardown;
    }
  } catch (error) {
    const block = signal.b;
    if (block !== null) {
      report_error(block, error);
    } else {
      throw error;
    }
  } finally {
    current_effect = previous_effect;
  }
  const component_context = signal.x;
  if (is_runes(component_context) && // Don't rerun pre effects more than once to accomodate for "$: only runs once" behavior
  (signal.f & PRE_EFFECT) !== 0 && current_queued_pre_and_render_effects.length > 0) {
    flush_local_pre_effects(component_context);
  }
}
function infinite_loop_guard() {
  if (flush_count > 100) {
    flush_count = 0;
    throw new Error(
      "ERR_SVELTE_TOO_MANY_UPDATES"
    );
  }
  flush_count++;
}
function flush_queued_effects(effects) {
  const length = effects.length;
  if (length > 0) {
    infinite_loop_guard();
    const previously_flushing_effect = is_flushing_effect;
    is_flushing_effect = true;
    try {
      let i2;
      for (i2 = 0; i2 < length; i2++) {
        const signal = effects[i2];
        const flags = signal.f;
        if ((flags & (DESTROYED | INERT)) === 0) {
          if (is_signal_dirty(signal)) {
            set_signal_status(signal, CLEAN);
            execute_effect(signal);
          } else if ((flags & MAYBE_DIRTY) !== 0) {
            set_signal_status(signal, CLEAN);
          }
        }
      }
    } finally {
      is_flushing_effect = previously_flushing_effect;
    }
    effects.length = 0;
  }
}
function process_microtask() {
  is_micro_task_queued = false;
  if (flush_count > 101) {
    return;
  }
  const previous_queued_pre_and_render_effects = current_queued_pre_and_render_effects;
  const previous_queued_effects = current_queued_effects;
  current_queued_pre_and_render_effects = [];
  current_queued_effects = [];
  flush_queued_effects(previous_queued_pre_and_render_effects);
  flush_queued_effects(previous_queued_effects);
  if (!is_micro_task_queued) {
    flush_count = 0;
  }
}
function schedule_effect(signal, sync) {
  const flags = signal.f;
  if (sync) {
    const previously_flushing_effect = is_flushing_effect;
    try {
      is_flushing_effect = true;
      execute_effect(signal);
      set_signal_status(signal, CLEAN);
    } finally {
      is_flushing_effect = previously_flushing_effect;
    }
  } else {
    if (current_scheduler_mode === FLUSH_MICROTASK) {
      if (!is_micro_task_queued) {
        is_micro_task_queued = true;
        queueMicrotask(process_microtask);
      }
    }
    if ((flags & EFFECT) !== 0) {
      current_queued_effects.push(signal);
      if ((flags & MANAGED) === 0) {
        mark_subtree_children_inert(signal, true);
      }
    } else {
      const length = current_queued_pre_and_render_effects.length;
      let should_append = length === 0;
      if (!should_append) {
        const target_level = signal.l;
        const target_block = signal.b;
        const is_pre_effect = (flags & PRE_EFFECT) !== 0;
        let target_signal;
        let is_target_pre_effect;
        let i2 = length;
        while (true) {
          target_signal = current_queued_pre_and_render_effects[--i2];
          if (target_signal.l <= target_level) {
            if (i2 + 1 === length) {
              should_append = true;
            } else {
              is_target_pre_effect = (target_signal.f & PRE_EFFECT) !== 0;
              if (target_signal.b !== target_block || is_target_pre_effect && !is_pre_effect) {
                i2++;
              }
              current_queued_pre_and_render_effects.splice(i2, 0, signal);
            }
            break;
          }
          if (i2 === 0) {
            current_queued_pre_and_render_effects.unshift(signal);
            break;
          }
        }
      }
      if (should_append) {
        current_queued_pre_and_render_effects.push(signal);
      }
    }
  }
}
function flush_local_pre_effects(context) {
  const effects = [];
  for (let i2 = 0; i2 < current_queued_pre_and_render_effects.length; i2++) {
    const effect2 = current_queued_pre_and_render_effects[i2];
    if ((effect2.f & PRE_EFFECT) !== 0 && effect2.x === context) {
      effects.push(effect2);
      current_queued_pre_and_render_effects.splice(i2, 1);
      i2--;
    }
  }
  flush_queued_effects(effects);
}
function flushSync(fn) {
  flush_sync(fn);
}
function flush_sync(fn, flush_previous = true) {
  const previous_scheduler_mode = current_scheduler_mode;
  const previous_queued_pre_and_render_effects = current_queued_pre_and_render_effects;
  const previous_queued_effects = current_queued_effects;
  let result;
  try {
    infinite_loop_guard();
    const pre_and_render_effects = [];
    const effects = [];
    current_scheduler_mode = FLUSH_SYNC;
    current_queued_pre_and_render_effects = pre_and_render_effects;
    current_queued_effects = effects;
    if (flush_previous) {
      flush_queued_effects(previous_queued_pre_and_render_effects);
      flush_queued_effects(previous_queued_effects);
    }
    if (fn !== void 0) {
      result = fn();
    }
    if (current_queued_pre_and_render_effects.length > 0 || effects.length > 0) {
      flushSync();
    }
    flush_tasks();
    flush_count = 0;
  } finally {
    current_scheduler_mode = previous_scheduler_mode;
    current_queued_pre_and_render_effects = previous_queued_pre_and_render_effects;
    current_queued_effects = previous_queued_effects;
  }
  return result;
}
async function tick() {
  await Promise.resolve();
  flushSync();
}
function update_derived(signal, force_schedule) {
  const previous_updating_derived = updating_derived;
  updating_derived = true;
  destroy_references(signal);
  const value = execute_signal_fn(signal);
  updating_derived = previous_updating_derived;
  const status = (current_skip_consumer || (signal.f & UNOWNED) !== 0) && signal.d !== null ? MAYBE_DIRTY : CLEAN;
  set_signal_status(signal, status);
  const equals = (
    /** @type {import('./types.js').EqualsFunctions} */
    signal.e
  );
  if (!equals(value, signal.v)) {
    signal.v = value;
    mark_signal_consumers(signal, DIRTY, force_schedule);
  }
}
function get(signal) {
  const flags = signal.f;
  if ((flags & DESTROYED) !== 0) {
    return signal.v;
  }
  if (current_consumer !== null && (current_consumer.f & MANAGED) === 0 && !current_untracking) {
    const unowned = (current_consumer.f & UNOWNED) !== 0;
    const dependencies = current_consumer.d;
    if (current_dependencies === null && dependencies !== null && dependencies[current_dependencies_index] === signal && !(unowned && current_effect !== null)) {
      current_dependencies_index++;
    } else if (dependencies === null || current_dependencies_index === 0 || dependencies[current_dependencies_index - 1] !== signal) {
      if (current_dependencies === null) {
        current_dependencies = [signal];
      } else {
        current_dependencies.push(signal);
      }
    }
    if (current_untracked_writes !== null && current_effect !== null && (current_effect.f & CLEAN) !== 0 && (current_effect.f & MANAGED) === 0 && current_untracked_writes.includes(signal)) {
      set_signal_status(current_effect, DIRTY);
      schedule_effect(current_effect, false);
    }
  }
  if ((flags & DERIVED) !== 0 && is_signal_dirty(signal)) {
    {
      update_derived(
        /** @type {import('./types.js').Derived} **/
        signal,
        false
      );
    }
  }
  return signal.v;
}
function mark_subtree_children_inert(signal, inert, visited_blocks) {
  const references = signal.r;
  if (references !== null) {
    let i2;
    for (i2 = 0; i2 < references.length; i2++) {
      const reference = references[i2];
      if ((reference.f & IS_EFFECT) !== 0) {
        mark_subtree_inert(reference, inert, visited_blocks);
      }
    }
  }
}
function mark_subtree_inert(signal, inert, visited_blocks = /* @__PURE__ */ new Set()) {
  const flags = signal.f;
  const is_already_inert = (flags & INERT) !== 0;
  if (is_already_inert !== inert) {
    signal.f ^= INERT;
    if (!inert && (flags & IS_EFFECT) !== 0 && (flags & CLEAN) === 0) {
      schedule_effect(
        /** @type {import('./types.js').Effect} */
        signal,
        false
      );
    }
    const block = signal.b;
    if (block !== null && !visited_blocks.has(block)) {
      visited_blocks.add(block);
      const type = block.t;
      if (type === IF_BLOCK) {
        const condition_effect = block.e;
        if (condition_effect !== null && block !== current_block) {
          mark_subtree_inert(condition_effect, inert, visited_blocks);
        }
        const consequent_effect = block.ce;
        if (consequent_effect !== null && block.v) {
          mark_subtree_inert(consequent_effect, inert, visited_blocks);
        }
        const alternate_effect = block.ae;
        if (alternate_effect !== null && !block.v) {
          mark_subtree_inert(alternate_effect, inert, visited_blocks);
        }
      } else if (type === EACH_BLOCK) {
        const items = block.v;
        for (let { e: each_item_effect } of items) {
          if (each_item_effect !== null) {
            mark_subtree_inert(each_item_effect, inert, visited_blocks);
          }
        }
      }
    }
  }
  mark_subtree_children_inert(signal, inert, visited_blocks);
}
function mark_signal_consumers(signal, to_status, force_schedule) {
  const runes = is_runes(null);
  const consumers = signal.c;
  if (consumers !== null) {
    const length = consumers.length;
    let i2;
    for (i2 = 0; i2 < length; i2++) {
      const consumer = consumers[i2];
      const flags = consumer.f;
      const unowned = (flags & UNOWNED) !== 0;
      if ((!force_schedule || !runes) && consumer === current_effect) {
        continue;
      }
      set_signal_status(consumer, to_status);
      const maybe_dirty = (flags & MAYBE_DIRTY) !== 0;
      if ((flags & CLEAN) !== 0 || maybe_dirty && unowned) {
        if ((consumer.f & IS_EFFECT) !== 0) {
          schedule_effect(
            /** @type {import('./types.js').Effect} */
            consumer,
            false
          );
        } else {
          mark_signal_consumers(consumer, MAYBE_DIRTY, force_schedule);
        }
      }
    }
  }
}
function destroy_signal(signal) {
  const teardown = (
    /** @type {null | (() => void)} */
    signal.v
  );
  const destroy = signal.y;
  const flags = signal.f;
  destroy_references(signal);
  remove_consumers(signal, 0);
  signal.i = signal.r = signal.y = signal.x = signal.b = signal.d = signal.c = null;
  set_signal_status(signal, DESTROYED);
  if (destroy !== null) {
    if (is_array(destroy)) {
      run_all(destroy);
    } else {
      destroy();
    }
  }
  if (teardown !== null && (flags & IS_EFFECT) !== 0) {
    teardown();
  }
}
function untrack(fn) {
  const previous_untracking = current_untracking;
  try {
    current_untracking = true;
    return fn();
  } finally {
    current_untracking = previous_untracking;
  }
}
function set_signal_status(signal, status) {
  signal.f = signal.f & STATUS_MASK | status;
}
function getContext(key2) {
  const context_map = get_or_init_context_map();
  const result = (
    /** @type {T} */
    context_map.get(key2)
  );
  return result;
}
function setContext(key2, context) {
  const context_map = get_or_init_context_map();
  context_map.set(key2, context);
  return context;
}
function get_or_init_context_map() {
  const component_context = current_component_context;
  if (component_context === null) {
    throw new Error(
      "ERR_SVELTE_ORPHAN_CONTEXT"
    );
  }
  return component_context.c ?? (component_context.c = new Map(get_parent_context(component_context) || void 0));
}
function get_parent_context(component_context) {
  let parent = component_context.p;
  while (parent !== null) {
    const context_map = parent.c;
    if (context_map !== null) {
      return context_map;
    }
    parent = parent.p;
  }
  return null;
}
function push$1(props, runes = false, fn) {
  current_component_context = {
    // exports (and props, if `accessors: true`)
    x: null,
    // context
    c: null,
    // effects
    e: null,
    // mounted
    m: false,
    // parent
    p: current_component_context,
    // signals
    d: null,
    // props
    s: props,
    // runes
    r: runes,
    // update_callbacks
    u: null
  };
}
function pop$1(component21) {
  const context_stack_item = current_component_context;
  if (context_stack_item !== null) {
    if (component21 !== void 0) {
      context_stack_item.x = component21;
    }
    const effects = context_stack_item.e;
    if (effects !== null) {
      context_stack_item.e = null;
      for (let i2 = 0; i2 < effects.length; i2++) {
        schedule_effect(effects[i2], false);
      }
    }
    current_component_context = context_stack_item.p;
    context_stack_item.m = true;
  }
  return component21 || /** @type {T} */
  {};
}
function create_payload() {
  return { out: "", head: { title: "", out: "", anchor: 0 }, anchor: 0 };
}
function element(payload, tag, attributes_fn, children_fn) {
  payload.out += `<${tag} `;
  attributes_fn();
  payload.out += `>`;
  if (!VoidElements.has(tag)) {
    const anchor = tag !== "textarea" ? create_anchor(payload) : null;
    if (anchor !== null) {
      payload.out += anchor;
    }
    children_fn();
    if (anchor !== null) {
      payload.out += anchor;
    }
    payload.out += `</${tag}>`;
  }
}
function render(component21, options2) {
  const payload = create_payload();
  const root_anchor = create_anchor(payload);
  const root_head_anchor = create_anchor(payload.head);
  const prev_on_destroy = on_destroy;
  on_destroy = [];
  payload.out += root_anchor;
  if (options2.context) {
    push$1({});
    current_component_context.c = options2.context;
  }
  component21(payload, options2.props, {}, {});
  if (options2.context) {
    pop$1();
  }
  payload.out += root_anchor;
  for (const cleanup of on_destroy)
    cleanup();
  on_destroy = prev_on_destroy;
  return {
    head: payload.head.out || payload.head.title ? payload.head.title + root_head_anchor + payload.head.out + root_head_anchor : "",
    html: payload.out
  };
}
function push(runes) {
  push$1({}, runes);
}
function pop() {
  pop$1();
}
function escape(value, is_attr = false) {
  const str = String(value ?? "");
  const pattern2 = is_attr ? ATTR_REGEX : CONTENT_REGEX;
  pattern2.lastIndex = 0;
  let escaped2 = "";
  let last2 = 0;
  while (pattern2.test(str)) {
    const i2 = pattern2.lastIndex - 1;
    const ch = str[i2];
    escaped2 += str.substring(last2, i2) + (ch === "&" ? "&amp;" : ch === '"' ? "&quot;" : "&lt;");
    last2 = i2 + 1;
  }
  return escaped2 + str.substring(last2);
}
function head(payload, fn) {
  const head_payload = payload.head;
  fn(head_payload);
}
function attr(name, value, boolean) {
  if (value == null || !value && boolean || value === "" && name === "class")
    return "";
  const assignment = boolean ? "" : `="${escape(value, true)}"`;
  return ` ${name}${assignment}`;
}
function spread_attributes(attrs, lowercase_attributes, is_svg, class_hash, additional) {
  const merged_attrs = {};
  let key2;
  for (let i2 = 0; i2 < attrs.length; i2++) {
    const obj = attrs[i2];
    for (key2 in obj) {
      if (typeof obj[key2] !== "function") {
        merged_attrs[key2] = obj[key2];
      }
    }
  }
  const styles = additional?.styles;
  if (styles) {
    if ("style" in merged_attrs) {
      merged_attrs.style = style_object_to_string(
        merge_styles(
          /** @type {string} */
          merged_attrs.style,
          styles
        )
      );
    } else {
      merged_attrs.style = style_object_to_string(styles);
    }
  }
  if (class_hash) {
    if ("class" in merged_attrs) {
      merged_attrs.class += ` ${class_hash}`;
    } else {
      merged_attrs.class = class_hash;
    }
  }
  const classes = additional?.classes;
  if (classes) {
    if ("class" in merged_attrs) {
      merged_attrs.class += ` ${classes}`;
    } else {
      merged_attrs.class = classes;
    }
  }
  let attr_str = "";
  let name;
  for (name in merged_attrs) {
    if (INVALID_ATTR_NAME_CHAR_REGEX.test(name))
      continue;
    if (lowercase_attributes) {
      name = name.toLowerCase();
    }
    const is_boolean = !is_svg && DOMBooleanAttributes.includes(name);
    attr_str += attr(name, merged_attrs[name], is_boolean);
  }
  return attr_str;
}
function spread_props(props) {
  const merged_props = {};
  let key2;
  for (let i2 = 0; i2 < props.length; i2++) {
    const obj = props[i2];
    for (key2 in obj) {
      merged_props[key2] = obj[key2];
    }
  }
  return merged_props;
}
function stringify(value) {
  return typeof value === "string" ? value : value == null ? "" : value + "";
}
function style_object_to_string(style_object) {
  return Object.keys(style_object).filter(
    /** @param {any} key */
    (key2) => style_object[key2]
  ).map(
    /** @param {any} key */
    (key2) => `${key2}: ${escape(style_object[key2], true)};`
  ).join(" ");
}
function merge_styles(style_attribute, style_directive) {
  const style_object = {};
  for (const individual_style of style_attribute.split(";")) {
    const colon_index = individual_style.indexOf(":");
    const name = individual_style.slice(0, colon_index).trim();
    const value = individual_style.slice(colon_index + 1).trim();
    if (!name)
      continue;
    style_object[name] = value;
  }
  for (const name in style_directive) {
    const value = style_directive[name];
    if (value) {
      style_object[name] = value;
    } else {
      delete style_object[name];
    }
  }
  return style_object;
}
function store_get(store_values, store_name, store) {
  if (store_name in store_values && store_values[store_name][0] === store) {
    return store_values[store_name][2];
  }
  store_values[store_name]?.[1]();
  store_values[store_name] = [store, null, void 0];
  const unsub = subscribe_to_store(
    store,
    /** @param {any} v */
    (v) => store_values[store_name][2] = v
  );
  store_values[store_name][1] = unsub;
  return store_values[store_name][2];
}
function unsubscribe_stores(store_values) {
  for (const store_name in store_values) {
    store_values[store_name][1]();
  }
}
function value_or_fallback(value, fallback) {
  return value === void 0 ? fallback : value;
}
function slot(payload, slot_fn, slot_props, fallback_fn) {
  if (slot_fn === void 0) {
    if (fallback_fn !== null) {
      fallback_fn();
    }
  } else {
    slot_fn(payload, slot_props);
  }
}
function rest_props(props, rest) {
  const rest_props2 = {};
  let key2;
  for (key2 in props) {
    if (!rest.includes(key2)) {
      rest_props2[key2] = props[key2];
    }
  }
  return rest_props2;
}
function sanitize_props(props) {
  const { children, $$slots, ...sanitized } = props;
  return sanitized;
}
function bind_props(props_parent, props_now) {
  for (const key2 in props_now) {
    const initial_value = props_parent[key2];
    const value = props_now[key2];
    if (initial_value === void 0 && value !== void 0 && Object.getOwnPropertyDescriptor(props_parent, key2)?.set) {
      props_parent[key2] = value;
    }
  }
}
function ensure_array_like(array_like_or_iterator) {
  return array_like_or_iterator?.length !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function create_anchor(payload) {
  const depth = payload.anchor++;
  return `<!--ssr:${depth}-->`;
}
var noop, is_array, array_from, is_frozen, define_property, get_descriptor, object_prototype, array_prototype, get_prototype_of, SOURCE, DERIVED, EFFECT, PRE_EFFECT, RENDER_EFFECT, MANAGED, UNOWNED, CLEAN, DIRTY, MAYBE_DIRTY, INERT, DESTROYED, ROOT_BLOCK, IF_BLOCK, EACH_BLOCK, UNINITIALIZED, STATE_SYMBOL, IS_EFFECT, FLUSH_MICROTASK, FLUSH_SYNC, current_scheduler_mode, is_micro_task_queued, is_flushing_effect, current_queued_pre_and_render_effects, current_queued_effects, flush_count, current_consumer, current_effect, current_dependencies, current_dependencies_index, current_untracked_writes, current_untracking, ignore_mutation_validation, current_skip_consumer, current_block, current_component_context, updating_derived, STATUS_MASK, PassiveDelegatedEvents, DOMBooleanAttributes, ATTR_REGEX, CONTENT_REGEX, INVALID_ATTR_NAME_CHAR_REGEX, VoidElements, on_destroy;
var init_index3 = __esm({
  ".svelte-kit/output/server/chunks/index3.js"() {
    noop = () => {
    };
    is_array = Array.isArray;
    array_from = Array.from;
    is_frozen = Object.isFrozen;
    define_property = Object.defineProperty;
    get_descriptor = Object.getOwnPropertyDescriptor;
    object_prototype = Object.prototype;
    array_prototype = Array.prototype;
    get_prototype_of = Object.getPrototypeOf;
    SOURCE = 1;
    DERIVED = 1 << 1;
    EFFECT = 1 << 2;
    PRE_EFFECT = 1 << 3;
    RENDER_EFFECT = 1 << 4;
    MANAGED = 1 << 6;
    UNOWNED = 1 << 7;
    CLEAN = 1 << 8;
    DIRTY = 1 << 9;
    MAYBE_DIRTY = 1 << 10;
    INERT = 1 << 11;
    DESTROYED = 1 << 12;
    ROOT_BLOCK = 0;
    IF_BLOCK = 1;
    EACH_BLOCK = 2;
    UNINITIALIZED = Symbol();
    STATE_SYMBOL = Symbol("$state");
    IS_EFFECT = EFFECT | PRE_EFFECT | RENDER_EFFECT;
    FLUSH_MICROTASK = 0;
    FLUSH_SYNC = 1;
    current_scheduler_mode = FLUSH_MICROTASK;
    is_micro_task_queued = false;
    is_flushing_effect = false;
    current_queued_pre_and_render_effects = [];
    current_queued_effects = [];
    flush_count = 0;
    current_consumer = null;
    current_effect = null;
    current_dependencies = null;
    current_dependencies_index = 0;
    current_untracked_writes = null;
    current_untracking = false;
    ignore_mutation_validation = false;
    current_skip_consumer = false;
    current_block = null;
    current_component_context = null;
    updating_derived = false;
    STATUS_MASK = ~(DIRTY | MAYBE_DIRTY | CLEAN);
    PassiveDelegatedEvents = ["touchstart", "touchmove", "touchend"];
    DOMBooleanAttributes = [
      "allowfullscreen",
      "async",
      "autofocus",
      "autoplay",
      "checked",
      "controls",
      "default",
      "disabled",
      "formnovalidate",
      "hidden",
      "indeterminate",
      "ismap",
      "loop",
      "multiple",
      "muted",
      "nomodule",
      "novalidate",
      "open",
      "playsinline",
      "readonly",
      "required",
      "reversed",
      "seamless",
      "selected"
    ];
    ATTR_REGEX = /[&"]/g;
    CONTENT_REGEX = /[&<]/g;
    INVALID_ATTR_NAME_CHAR_REGEX = /[\s'">/=\u{FDD0}-\u{FDEF}\u{FFFE}\u{FFFF}\u{1FFFE}\u{1FFFF}\u{2FFFE}\u{2FFFF}\u{3FFFE}\u{3FFFF}\u{4FFFE}\u{4FFFF}\u{5FFFE}\u{5FFFF}\u{6FFFE}\u{6FFFF}\u{7FFFE}\u{7FFFF}\u{8FFFE}\u{8FFFF}\u{9FFFE}\u{9FFFF}\u{AFFFE}\u{AFFFF}\u{BFFFE}\u{BFFFF}\u{CFFFE}\u{CFFFF}\u{DFFFE}\u{DFFFF}\u{EFFFE}\u{EFFFF}\u{FFFFE}\u{FFFFF}\u{10FFFE}\u{10FFFF}]/u;
    VoidElements = /* @__PURE__ */ new Set([
      "area",
      "base",
      "br",
      "col",
      "embed",
      "hr",
      "img",
      "input",
      "keygen",
      "link",
      "menuitem",
      "meta",
      "param",
      "source",
      "track",
      "wbr"
    ]);
    on_destroy = [];
  }
});

// .svelte-kit/output/server/chunks/public.js
var PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY;
var init_public = __esm({
  ".svelte-kit/output/server/chunks/public.js"() {
    PUBLIC_SUPABASE_URL = "https://lorouhjvkprbagomovud.supabase.co";
    PUBLIC_SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxvcm91aGp2a3ByYmFnb21vdnVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzNDc0MTAsImV4cCI6MjAyMzkyMzQxMH0.O-VqmI6g75tQBHTFDpXV47wp8Oi0mjOUApDai8g7NWk";
  }
});

// node_modules/@supabase/node-fetch/browser.js
var browser_exports = {};
__export(browser_exports, {
  Headers: () => Headers2,
  Request: () => Request2,
  Response: () => Response2,
  default: () => browser_default,
  fetch: () => fetch2
});
var getGlobal, globalObject, fetch2, browser_default, Headers2, Request2, Response2;
var init_browser = __esm({
  "node_modules/@supabase/node-fetch/browser.js"() {
    "use strict";
    getGlobal = function() {
      if (typeof self !== "undefined") {
        return self;
      }
      if (typeof window !== "undefined") {
        return window;
      }
      if (typeof global !== "undefined") {
        return global;
      }
      throw new Error("unable to locate global object");
    };
    globalObject = getGlobal();
    fetch2 = globalObject.fetch;
    browser_default = globalObject.fetch.bind(globalObject);
    Headers2 = globalObject.Headers;
    Request2 = globalObject.Request;
    Response2 = globalObject.Response;
  }
});

// node_modules/@supabase/functions-js/dist/module/helper.js
var resolveFetch;
var init_helper = __esm({
  "node_modules/@supabase/functions-js/dist/module/helper.js"() {
    resolveFetch = (customFetch) => {
      let _fetch;
      if (customFetch) {
        _fetch = customFetch;
      } else if (typeof fetch === "undefined") {
        _fetch = (...args) => Promise.resolve().then(() => (init_browser(), browser_exports)).then(({ default: fetch3 }) => fetch3(...args));
      } else {
        _fetch = fetch;
      }
      return (...args) => _fetch(...args);
    };
  }
});

// node_modules/@supabase/functions-js/dist/module/types.js
var FunctionsError, FunctionsFetchError, FunctionsRelayError, FunctionsHttpError;
var init_types = __esm({
  "node_modules/@supabase/functions-js/dist/module/types.js"() {
    FunctionsError = class extends Error {
      constructor(message, name = "FunctionsError", context) {
        super(message);
        this.name = name;
        this.context = context;
      }
    };
    FunctionsFetchError = class extends FunctionsError {
      constructor(context) {
        super("Failed to send a request to the Edge Function", "FunctionsFetchError", context);
      }
    };
    FunctionsRelayError = class extends FunctionsError {
      constructor(context) {
        super("Relay Error invoking the Edge Function", "FunctionsRelayError", context);
      }
    };
    FunctionsHttpError = class extends FunctionsError {
      constructor(context) {
        super("Edge Function returned a non-2xx status code", "FunctionsHttpError", context);
      }
    };
  }
});

// node_modules/@supabase/functions-js/dist/module/FunctionsClient.js
var __awaiter, FunctionsClient;
var init_FunctionsClient = __esm({
  "node_modules/@supabase/functions-js/dist/module/FunctionsClient.js"() {
    init_helper();
    init_types();
    __awaiter = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P || (P = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    FunctionsClient = class {
      constructor(url, { headers: headers2 = {}, customFetch } = {}) {
        this.url = url;
        this.headers = headers2;
        this.fetch = resolveFetch(customFetch);
      }
      /**
       * Updates the authorization header
       * @param token - the new jwt token sent in the authorisation header
       */
      setAuth(token) {
        this.headers.Authorization = `Bearer ${token}`;
      }
      /**
       * Invokes a function
       * @param functionName - The name of the Function to invoke.
       * @param options - Options for invoking the Function.
       */
      invoke(functionName, options2 = {}) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
          try {
            const { headers: headers2, method, body: functionArgs } = options2;
            let _headers = {};
            let body2;
            if (functionArgs && (headers2 && !Object.prototype.hasOwnProperty.call(headers2, "Content-Type") || !headers2)) {
              if (typeof Blob !== "undefined" && functionArgs instanceof Blob || functionArgs instanceof ArrayBuffer) {
                _headers["Content-Type"] = "application/octet-stream";
                body2 = functionArgs;
              } else if (typeof functionArgs === "string") {
                _headers["Content-Type"] = "text/plain";
                body2 = functionArgs;
              } else if (typeof FormData !== "undefined" && functionArgs instanceof FormData) {
                body2 = functionArgs;
              } else {
                _headers["Content-Type"] = "application/json";
                body2 = JSON.stringify(functionArgs);
              }
            }
            const response = yield this.fetch(`${this.url}/${functionName}`, {
              method: method || "POST",
              // headers priority is (high to low):
              // 1. invoke-level headers
              // 2. client-level headers
              // 3. default Content-Type header
              headers: Object.assign(Object.assign(Object.assign({}, _headers), this.headers), headers2),
              body: body2
            }).catch((fetchError) => {
              throw new FunctionsFetchError(fetchError);
            });
            const isRelayError = response.headers.get("x-relay-error");
            if (isRelayError && isRelayError === "true") {
              throw new FunctionsRelayError(response);
            }
            if (!response.ok) {
              throw new FunctionsHttpError(response);
            }
            let responseType = ((_a = response.headers.get("Content-Type")) !== null && _a !== void 0 ? _a : "text/plain").split(";")[0].trim();
            let data2;
            if (responseType === "application/json") {
              data2 = yield response.json();
            } else if (responseType === "application/octet-stream") {
              data2 = yield response.blob();
            } else if (responseType === "multipart/form-data") {
              data2 = yield response.formData();
            } else {
              data2 = yield response.text();
            }
            return { data: data2, error: null };
          } catch (error) {
            return { data: null, error };
          }
        });
      }
    };
  }
});

// node_modules/@supabase/functions-js/dist/module/index.js
var init_module = __esm({
  "node_modules/@supabase/functions-js/dist/module/index.js"() {
    init_FunctionsClient();
  }
});

// node_modules/@supabase/postgrest-js/dist/module/PostgrestError.js
var PostgrestError;
var init_PostgrestError = __esm({
  "node_modules/@supabase/postgrest-js/dist/module/PostgrestError.js"() {
    PostgrestError = class extends Error {
      constructor(context) {
        super(context.message);
        this.name = "PostgrestError";
        this.details = context.details;
        this.hint = context.hint;
        this.code = context.code;
      }
    };
  }
});

// node_modules/@supabase/postgrest-js/dist/module/PostgrestBuilder.js
var PostgrestBuilder;
var init_PostgrestBuilder = __esm({
  "node_modules/@supabase/postgrest-js/dist/module/PostgrestBuilder.js"() {
    init_browser();
    init_PostgrestError();
    PostgrestBuilder = class {
      constructor(builder) {
        this.shouldThrowOnError = false;
        this.method = builder.method;
        this.url = builder.url;
        this.headers = builder.headers;
        this.schema = builder.schema;
        this.body = builder.body;
        this.shouldThrowOnError = builder.shouldThrowOnError;
        this.signal = builder.signal;
        this.isMaybeSingle = builder.isMaybeSingle;
        if (builder.fetch) {
          this.fetch = builder.fetch;
        } else if (typeof fetch === "undefined") {
          this.fetch = browser_default;
        } else {
          this.fetch = fetch;
        }
      }
      /**
       * If there's an error with the query, throwOnError will reject the promise by
       * throwing the error instead of returning it as part of a successful response.
       *
       * {@link https://github.com/supabase/supabase-js/issues/92}
       */
      throwOnError() {
        this.shouldThrowOnError = true;
        return this;
      }
      then(onfulfilled, onrejected) {
        if (this.schema === void 0) {
        } else if (["GET", "HEAD"].includes(this.method)) {
          this.headers["Accept-Profile"] = this.schema;
        } else {
          this.headers["Content-Profile"] = this.schema;
        }
        if (this.method !== "GET" && this.method !== "HEAD") {
          this.headers["Content-Type"] = "application/json";
        }
        const _fetch = this.fetch;
        let res = _fetch(this.url.toString(), {
          method: this.method,
          headers: this.headers,
          body: JSON.stringify(this.body),
          signal: this.signal
        }).then(async (res2) => {
          var _a, _b, _c;
          let error = null;
          let data2 = null;
          let count = null;
          let status = res2.status;
          let statusText = res2.statusText;
          if (res2.ok) {
            if (this.method !== "HEAD") {
              const body2 = await res2.text();
              if (body2 === "") {
              } else if (this.headers["Accept"] === "text/csv") {
                data2 = body2;
              } else if (this.headers["Accept"] && this.headers["Accept"].includes("application/vnd.pgrst.plan+text")) {
                data2 = body2;
              } else {
                data2 = JSON.parse(body2);
              }
            }
            const countHeader = (_a = this.headers["Prefer"]) === null || _a === void 0 ? void 0 : _a.match(/count=(exact|planned|estimated)/);
            const contentRange = (_b = res2.headers.get("content-range")) === null || _b === void 0 ? void 0 : _b.split("/");
            if (countHeader && contentRange && contentRange.length > 1) {
              count = parseInt(contentRange[1]);
            }
            if (this.isMaybeSingle && this.method === "GET" && Array.isArray(data2)) {
              if (data2.length > 1) {
                error = {
                  // https://github.com/PostgREST/postgrest/blob/a867d79c42419af16c18c3fb019eba8df992626f/src/PostgREST/Error.hs#L553
                  code: "PGRST116",
                  details: `Results contain ${data2.length} rows, application/vnd.pgrst.object+json requires 1 row`,
                  hint: null,
                  message: "JSON object requested, multiple (or no) rows returned"
                };
                data2 = null;
                count = null;
                status = 406;
                statusText = "Not Acceptable";
              } else if (data2.length === 1) {
                data2 = data2[0];
              } else {
                data2 = null;
              }
            }
          } else {
            const body2 = await res2.text();
            try {
              error = JSON.parse(body2);
              if (Array.isArray(error) && res2.status === 404) {
                data2 = [];
                error = null;
                status = 200;
                statusText = "OK";
              }
            } catch (_d) {
              if (res2.status === 404 && body2 === "") {
                status = 204;
                statusText = "No Content";
              } else {
                error = {
                  message: body2
                };
              }
            }
            if (error && this.isMaybeSingle && ((_c = error === null || error === void 0 ? void 0 : error.details) === null || _c === void 0 ? void 0 : _c.includes("0 rows"))) {
              error = null;
              status = 200;
              statusText = "OK";
            }
            if (error && this.shouldThrowOnError) {
              throw new PostgrestError(error);
            }
          }
          const postgrestResponse = {
            error,
            data: data2,
            count,
            status,
            statusText
          };
          return postgrestResponse;
        });
        if (!this.shouldThrowOnError) {
          res = res.catch((fetchError) => {
            var _a, _b, _c;
            return {
              error: {
                message: `${(_a = fetchError === null || fetchError === void 0 ? void 0 : fetchError.name) !== null && _a !== void 0 ? _a : "FetchError"}: ${fetchError === null || fetchError === void 0 ? void 0 : fetchError.message}`,
                details: `${(_b = fetchError === null || fetchError === void 0 ? void 0 : fetchError.stack) !== null && _b !== void 0 ? _b : ""}`,
                hint: "",
                code: `${(_c = fetchError === null || fetchError === void 0 ? void 0 : fetchError.code) !== null && _c !== void 0 ? _c : ""}`
              },
              data: null,
              count: null,
              status: 0,
              statusText: ""
            };
          });
        }
        return res.then(onfulfilled, onrejected);
      }
    };
  }
});

// node_modules/@supabase/postgrest-js/dist/module/PostgrestTransformBuilder.js
var PostgrestTransformBuilder;
var init_PostgrestTransformBuilder = __esm({
  "node_modules/@supabase/postgrest-js/dist/module/PostgrestTransformBuilder.js"() {
    init_PostgrestBuilder();
    PostgrestTransformBuilder = class extends PostgrestBuilder {
      /**
       * Perform a SELECT on the query result.
       *
       * By default, `.insert()`, `.update()`, `.upsert()`, and `.delete()` do not
       * return modified rows. By calling this method, modified rows are returned in
       * `data`.
       *
       * @param columns - The columns to retrieve, separated by commas
       */
      select(columns) {
        let quoted2 = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c) => {
          if (/\s/.test(c) && !quoted2) {
            return "";
          }
          if (c === '"') {
            quoted2 = !quoted2;
          }
          return c;
        }).join("");
        this.url.searchParams.set("select", cleanedColumns);
        if (this.headers["Prefer"]) {
          this.headers["Prefer"] += ",";
        }
        this.headers["Prefer"] += "return=representation";
        return this;
      }
      /**
       * Order the query result by `column`.
       *
       * You can call this method multiple times to order by multiple columns.
       *
       * You can order referenced tables, but it only affects the ordering of the
       * parent table if you use `!inner` in the query.
       *
       * @param column - The column to order by
       * @param options - Named parameters
       * @param options.ascending - If `true`, the result will be in ascending order
       * @param options.nullsFirst - If `true`, `null`s appear first. If `false`,
       * `null`s appear last.
       * @param options.referencedTable - Set this to order a referenced table by
       * its columns
       * @param options.foreignTable - Deprecated, use `options.referencedTable`
       * instead
       */
      order(column, { ascending = true, nullsFirst, foreignTable, referencedTable = foreignTable } = {}) {
        const key2 = referencedTable ? `${referencedTable}.order` : "order";
        const existingOrder = this.url.searchParams.get(key2);
        this.url.searchParams.set(key2, `${existingOrder ? `${existingOrder},` : ""}${column}.${ascending ? "asc" : "desc"}${nullsFirst === void 0 ? "" : nullsFirst ? ".nullsfirst" : ".nullslast"}`);
        return this;
      }
      /**
       * Limit the query result by `count`.
       *
       * @param count - The maximum number of rows to return
       * @param options - Named parameters
       * @param options.referencedTable - Set this to limit rows of referenced
       * tables instead of the parent table
       * @param options.foreignTable - Deprecated, use `options.referencedTable`
       * instead
       */
      limit(count, { foreignTable, referencedTable = foreignTable } = {}) {
        const key2 = typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
        this.url.searchParams.set(key2, `${count}`);
        return this;
      }
      /**
       * Limit the query result by starting at an offset (`from`) and ending at the offset (`from + to`).
       * Only records within this range are returned.
       * This respects the query order and if there is no order clause the range could behave unexpectedly.
       * The `from` and `to` values are 0-based and inclusive: `range(1, 3)` will include the second, third
       * and fourth rows of the query.
       *
       * @param from - The starting index from which to limit the result
       * @param to - The last index to which to limit the result
       * @param options - Named parameters
       * @param options.referencedTable - Set this to limit rows of referenced
       * tables instead of the parent table
       * @param options.foreignTable - Deprecated, use `options.referencedTable`
       * instead
       */
      range(from, to, { foreignTable, referencedTable = foreignTable } = {}) {
        const keyOffset = typeof referencedTable === "undefined" ? "offset" : `${referencedTable}.offset`;
        const keyLimit = typeof referencedTable === "undefined" ? "limit" : `${referencedTable}.limit`;
        this.url.searchParams.set(keyOffset, `${from}`);
        this.url.searchParams.set(keyLimit, `${to - from + 1}`);
        return this;
      }
      /**
       * Set the AbortSignal for the fetch request.
       *
       * @param signal - The AbortSignal to use for the fetch request
       */
      abortSignal(signal) {
        this.signal = signal;
        return this;
      }
      /**
       * Return `data` as a single object instead of an array of objects.
       *
       * Query result must be one row (e.g. using `.limit(1)`), otherwise this
       * returns an error.
       */
      single() {
        this.headers["Accept"] = "application/vnd.pgrst.object+json";
        return this;
      }
      /**
       * Return `data` as a single object instead of an array of objects.
       *
       * Query result must be zero or one row (e.g. using `.limit(1)`), otherwise
       * this returns an error.
       */
      maybeSingle() {
        if (this.method === "GET") {
          this.headers["Accept"] = "application/json";
        } else {
          this.headers["Accept"] = "application/vnd.pgrst.object+json";
        }
        this.isMaybeSingle = true;
        return this;
      }
      /**
       * Return `data` as a string in CSV format.
       */
      csv() {
        this.headers["Accept"] = "text/csv";
        return this;
      }
      /**
       * Return `data` as an object in [GeoJSON](https://geojson.org) format.
       */
      geojson() {
        this.headers["Accept"] = "application/geo+json";
        return this;
      }
      /**
       * Return `data` as the EXPLAIN plan for the query.
       *
       * You need to enable the
       * [db_plan_enabled](https://supabase.com/docs/guides/database/debugging-performance#enabling-explain)
       * setting before using this method.
       *
       * @param options - Named parameters
       *
       * @param options.analyze - If `true`, the query will be executed and the
       * actual run time will be returned
       *
       * @param options.verbose - If `true`, the query identifier will be returned
       * and `data` will include the output columns of the query
       *
       * @param options.settings - If `true`, include information on configuration
       * parameters that affect query planning
       *
       * @param options.buffers - If `true`, include information on buffer usage
       *
       * @param options.wal - If `true`, include information on WAL record generation
       *
       * @param options.format - The format of the output, can be `"text"` (default)
       * or `"json"`
       */
      explain({ analyze = false, verbose = false, settings = false, buffers = false, wal = false, format = "text" } = {}) {
        var _a;
        const options2 = [
          analyze ? "analyze" : null,
          verbose ? "verbose" : null,
          settings ? "settings" : null,
          buffers ? "buffers" : null,
          wal ? "wal" : null
        ].filter(Boolean).join("|");
        const forMediatype = (_a = this.headers["Accept"]) !== null && _a !== void 0 ? _a : "application/json";
        this.headers["Accept"] = `application/vnd.pgrst.plan+${format}; for="${forMediatype}"; options=${options2};`;
        if (format === "json")
          return this;
        else
          return this;
      }
      /**
       * Rollback the query.
       *
       * `data` will still be returned, but the query is not committed.
       */
      rollback() {
        var _a;
        if (((_a = this.headers["Prefer"]) !== null && _a !== void 0 ? _a : "").trim().length > 0) {
          this.headers["Prefer"] += ",tx=rollback";
        } else {
          this.headers["Prefer"] = "tx=rollback";
        }
        return this;
      }
      /**
       * Override the type of the returned `data`.
       *
       * @typeParam NewResult - The new result type to override with
       */
      returns() {
        return this;
      }
    };
  }
});

// node_modules/@supabase/postgrest-js/dist/module/PostgrestFilterBuilder.js
var PostgrestFilterBuilder;
var init_PostgrestFilterBuilder = __esm({
  "node_modules/@supabase/postgrest-js/dist/module/PostgrestFilterBuilder.js"() {
    init_PostgrestTransformBuilder();
    PostgrestFilterBuilder = class extends PostgrestTransformBuilder {
      /**
       * Match only rows where `column` is equal to `value`.
       *
       * To check if the value of `column` is NULL, you should use `.is()` instead.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      eq(column, value) {
        this.url.searchParams.append(column, `eq.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is not equal to `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      neq(column, value) {
        this.url.searchParams.append(column, `neq.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is greater than `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      gt(column, value) {
        this.url.searchParams.append(column, `gt.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is greater than or equal to `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      gte(column, value) {
        this.url.searchParams.append(column, `gte.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is less than `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      lt(column, value) {
        this.url.searchParams.append(column, `lt.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is less than or equal to `value`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      lte(column, value) {
        this.url.searchParams.append(column, `lte.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` matches `pattern` case-sensitively.
       *
       * @param column - The column to filter on
       * @param pattern - The pattern to match with
       */
      like(column, pattern2) {
        this.url.searchParams.append(column, `like.${pattern2}`);
        return this;
      }
      /**
       * Match only rows where `column` matches all of `patterns` case-sensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      likeAllOf(column, patterns) {
        this.url.searchParams.append(column, `like(all).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` matches any of `patterns` case-sensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      likeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `like(any).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` matches `pattern` case-insensitively.
       *
       * @param column - The column to filter on
       * @param pattern - The pattern to match with
       */
      ilike(column, pattern2) {
        this.url.searchParams.append(column, `ilike.${pattern2}`);
        return this;
      }
      /**
       * Match only rows where `column` matches all of `patterns` case-insensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      ilikeAllOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(all).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` matches any of `patterns` case-insensitively.
       *
       * @param column - The column to filter on
       * @param patterns - The patterns to match with
       */
      ilikeAnyOf(column, patterns) {
        this.url.searchParams.append(column, `ilike(any).{${patterns.join(",")}}`);
        return this;
      }
      /**
       * Match only rows where `column` IS `value`.
       *
       * For non-boolean columns, this is only relevant for checking if the value of
       * `column` is NULL by setting `value` to `null`.
       *
       * For boolean columns, you can also set `value` to `true` or `false` and it
       * will behave the same way as `.eq()`.
       *
       * @param column - The column to filter on
       * @param value - The value to filter with
       */
      is(column, value) {
        this.url.searchParams.append(column, `is.${value}`);
        return this;
      }
      /**
       * Match only rows where `column` is included in the `values` array.
       *
       * @param column - The column to filter on
       * @param values - The values array to filter with
       */
      in(column, values) {
        const cleanedValues = values.map((s2) => {
          if (typeof s2 === "string" && new RegExp("[,()]").test(s2))
            return `"${s2}"`;
          else
            return `${s2}`;
        }).join(",");
        this.url.searchParams.append(column, `in.(${cleanedValues})`);
        return this;
      }
      /**
       * Only relevant for jsonb, array, and range columns. Match only rows where
       * `column` contains every element appearing in `value`.
       *
       * @param column - The jsonb, array, or range column to filter on
       * @param value - The jsonb, array, or range value to filter with
       */
      contains(column, value) {
        if (typeof value === "string") {
          this.url.searchParams.append(column, `cs.${value}`);
        } else if (Array.isArray(value)) {
          this.url.searchParams.append(column, `cs.{${value.join(",")}}`);
        } else {
          this.url.searchParams.append(column, `cs.${JSON.stringify(value)}`);
        }
        return this;
      }
      /**
       * Only relevant for jsonb, array, and range columns. Match only rows where
       * every element appearing in `column` is contained by `value`.
       *
       * @param column - The jsonb, array, or range column to filter on
       * @param value - The jsonb, array, or range value to filter with
       */
      containedBy(column, value) {
        if (typeof value === "string") {
          this.url.searchParams.append(column, `cd.${value}`);
        } else if (Array.isArray(value)) {
          this.url.searchParams.append(column, `cd.{${value.join(",")}}`);
        } else {
          this.url.searchParams.append(column, `cd.${JSON.stringify(value)}`);
        }
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is greater than any element in `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeGt(column, range) {
        this.url.searchParams.append(column, `sr.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is either contained in `range` or greater than any element in
       * `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeGte(column, range) {
        this.url.searchParams.append(column, `nxl.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is less than any element in `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeLt(column, range) {
        this.url.searchParams.append(column, `sl.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where every element in
       * `column` is either contained in `range` or less than any element in
       * `range`.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeLte(column, range) {
        this.url.searchParams.append(column, `nxr.${range}`);
        return this;
      }
      /**
       * Only relevant for range columns. Match only rows where `column` is
       * mutually exclusive to `range` and there can be no element between the two
       * ranges.
       *
       * @param column - The range column to filter on
       * @param range - The range to filter with
       */
      rangeAdjacent(column, range) {
        this.url.searchParams.append(column, `adj.${range}`);
        return this;
      }
      /**
       * Only relevant for array and range columns. Match only rows where
       * `column` and `value` have an element in common.
       *
       * @param column - The array or range column to filter on
       * @param value - The array or range value to filter with
       */
      overlaps(column, value) {
        if (typeof value === "string") {
          this.url.searchParams.append(column, `ov.${value}`);
        } else {
          this.url.searchParams.append(column, `ov.{${value.join(",")}}`);
        }
        return this;
      }
      /**
       * Only relevant for text and tsvector columns. Match only rows where
       * `column` matches the query string in `query`.
       *
       * @param column - The text or tsvector column to filter on
       * @param query - The query text to match with
       * @param options - Named parameters
       * @param options.config - The text search configuration to use
       * @param options.type - Change how the `query` text is interpreted
       */
      textSearch(column, query, { config, type } = {}) {
        let typePart = "";
        if (type === "plain") {
          typePart = "pl";
        } else if (type === "phrase") {
          typePart = "ph";
        } else if (type === "websearch") {
          typePart = "w";
        }
        const configPart = config === void 0 ? "" : `(${config})`;
        this.url.searchParams.append(column, `${typePart}fts${configPart}.${query}`);
        return this;
      }
      /**
       * Match only rows where each column in `query` keys is equal to its
       * associated value. Shorthand for multiple `.eq()`s.
       *
       * @param query - The object to filter with, with column names as keys mapped
       * to their filter values
       */
      match(query) {
        Object.entries(query).forEach(([column, value]) => {
          this.url.searchParams.append(column, `eq.${value}`);
        });
        return this;
      }
      /**
       * Match only rows which doesn't satisfy the filter.
       *
       * Unlike most filters, `opearator` and `value` are used as-is and need to
       * follow [PostgREST
       * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
       * to make sure they are properly sanitized.
       *
       * @param column - The column to filter on
       * @param operator - The operator to be negated to filter with, following
       * PostgREST syntax
       * @param value - The value to filter with, following PostgREST syntax
       */
      not(column, operator, value) {
        this.url.searchParams.append(column, `not.${operator}.${value}`);
        return this;
      }
      /**
       * Match only rows which satisfy at least one of the filters.
       *
       * Unlike most filters, `filters` is used as-is and needs to follow [PostgREST
       * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
       * to make sure it's properly sanitized.
       *
       * It's currently not possible to do an `.or()` filter across multiple tables.
       *
       * @param filters - The filters to use, following PostgREST syntax
       * @param options - Named parameters
       * @param options.referencedTable - Set this to filter on referenced tables
       * instead of the parent table
       * @param options.foreignTable - Deprecated, use `referencedTable` instead
       */
      or(filters, { foreignTable, referencedTable = foreignTable } = {}) {
        const key2 = referencedTable ? `${referencedTable}.or` : "or";
        this.url.searchParams.append(key2, `(${filters})`);
        return this;
      }
      /**
       * Match only rows which satisfy the filter. This is an escape hatch - you
       * should use the specific filter methods wherever possible.
       *
       * Unlike most filters, `opearator` and `value` are used as-is and need to
       * follow [PostgREST
       * syntax](https://postgrest.org/en/stable/api.html#operators). You also need
       * to make sure they are properly sanitized.
       *
       * @param column - The column to filter on
       * @param operator - The operator to filter with, following PostgREST syntax
       * @param value - The value to filter with, following PostgREST syntax
       */
      filter(column, operator, value) {
        this.url.searchParams.append(column, `${operator}.${value}`);
        return this;
      }
    };
  }
});

// node_modules/@supabase/postgrest-js/dist/module/PostgrestQueryBuilder.js
var PostgrestQueryBuilder;
var init_PostgrestQueryBuilder = __esm({
  "node_modules/@supabase/postgrest-js/dist/module/PostgrestQueryBuilder.js"() {
    init_PostgrestFilterBuilder();
    PostgrestQueryBuilder = class {
      constructor(url, { headers: headers2 = {}, schema, fetch: fetch3 }) {
        this.url = url;
        this.headers = headers2;
        this.schema = schema;
        this.fetch = fetch3;
      }
      /**
       * Perform a SELECT query on the table or view.
       *
       * @param columns - The columns to retrieve, separated by commas. Columns can be renamed when returned with `customName:columnName`
       *
       * @param options - Named parameters
       *
       * @param options.head - When set to `true`, `data` will not be returned.
       * Useful if you only need the count.
       *
       * @param options.count - Count algorithm to use to count rows in the table or view.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      select(columns, { head: head2 = false, count } = {}) {
        const method = head2 ? "HEAD" : "GET";
        let quoted2 = false;
        const cleanedColumns = (columns !== null && columns !== void 0 ? columns : "*").split("").map((c) => {
          if (/\s/.test(c) && !quoted2) {
            return "";
          }
          if (c === '"') {
            quoted2 = !quoted2;
          }
          return c;
        }).join("");
        this.url.searchParams.set("select", cleanedColumns);
        if (count) {
          this.headers["Prefer"] = `count=${count}`;
        }
        return new PostgrestFilterBuilder({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
      /**
       * Perform an INSERT into the table or view.
       *
       * By default, inserted rows are not returned. To return it, chain the call
       * with `.select()`.
       *
       * @param values - The values to insert. Pass an object to insert a single row
       * or an array to insert multiple rows.
       *
       * @param options - Named parameters
       *
       * @param options.count - Count algorithm to use to count inserted rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       *
       * @param options.defaultToNull - Make missing fields default to `null`.
       * Otherwise, use the default value for the column. Only applies for bulk
       * inserts.
       */
      insert(values, { count, defaultToNull = true } = {}) {
        const method = "POST";
        const prefersHeaders = [];
        if (this.headers["Prefer"]) {
          prefersHeaders.push(this.headers["Prefer"]);
        }
        if (count) {
          prefersHeaders.push(`count=${count}`);
        }
        if (!defaultToNull) {
          prefersHeaders.push("missing=default");
        }
        this.headers["Prefer"] = prefersHeaders.join(",");
        if (Array.isArray(values)) {
          const columns = values.reduce((acc, x2) => acc.concat(Object.keys(x2)), []);
          if (columns.length > 0) {
            const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
            this.url.searchParams.set("columns", uniqueColumns.join(","));
          }
        }
        return new PostgrestFilterBuilder({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body: values,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
      /**
       * Perform an UPSERT on the table or view. Depending on the column(s) passed
       * to `onConflict`, `.upsert()` allows you to perform the equivalent of
       * `.insert()` if a row with the corresponding `onConflict` columns doesn't
       * exist, or if it does exist, perform an alternative action depending on
       * `ignoreDuplicates`.
       *
       * By default, upserted rows are not returned. To return it, chain the call
       * with `.select()`.
       *
       * @param values - The values to upsert with. Pass an object to upsert a
       * single row or an array to upsert multiple rows.
       *
       * @param options - Named parameters
       *
       * @param options.onConflict - Comma-separated UNIQUE column(s) to specify how
       * duplicate rows are determined. Two rows are duplicates if all the
       * `onConflict` columns are equal.
       *
       * @param options.ignoreDuplicates - If `true`, duplicate rows are ignored. If
       * `false`, duplicate rows are merged with existing rows.
       *
       * @param options.count - Count algorithm to use to count upserted rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       *
       * @param options.defaultToNull - Make missing fields default to `null`.
       * Otherwise, use the default value for the column. This only applies when
       * inserting new rows, not when merging with existing rows under
       * `ignoreDuplicates: false`. This also only applies when doing bulk upserts.
       */
      upsert(values, { onConflict, ignoreDuplicates = false, count, defaultToNull = true } = {}) {
        const method = "POST";
        const prefersHeaders = [`resolution=${ignoreDuplicates ? "ignore" : "merge"}-duplicates`];
        if (onConflict !== void 0)
          this.url.searchParams.set("on_conflict", onConflict);
        if (this.headers["Prefer"]) {
          prefersHeaders.push(this.headers["Prefer"]);
        }
        if (count) {
          prefersHeaders.push(`count=${count}`);
        }
        if (!defaultToNull) {
          prefersHeaders.push("missing=default");
        }
        this.headers["Prefer"] = prefersHeaders.join(",");
        if (Array.isArray(values)) {
          const columns = values.reduce((acc, x2) => acc.concat(Object.keys(x2)), []);
          if (columns.length > 0) {
            const uniqueColumns = [...new Set(columns)].map((column) => `"${column}"`);
            this.url.searchParams.set("columns", uniqueColumns.join(","));
          }
        }
        return new PostgrestFilterBuilder({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body: values,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
      /**
       * Perform an UPDATE on the table or view.
       *
       * By default, updated rows are not returned. To return it, chain the call
       * with `.select()` after filters.
       *
       * @param values - The values to update with
       *
       * @param options - Named parameters
       *
       * @param options.count - Count algorithm to use to count updated rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      update(values, { count } = {}) {
        const method = "PATCH";
        const prefersHeaders = [];
        if (this.headers["Prefer"]) {
          prefersHeaders.push(this.headers["Prefer"]);
        }
        if (count) {
          prefersHeaders.push(`count=${count}`);
        }
        this.headers["Prefer"] = prefersHeaders.join(",");
        return new PostgrestFilterBuilder({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          body: values,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
      /**
       * Perform a DELETE on the table or view.
       *
       * By default, deleted rows are not returned. To return it, chain the call
       * with `.select()` after filters.
       *
       * @param options - Named parameters
       *
       * @param options.count - Count algorithm to use to count deleted rows.
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      delete({ count } = {}) {
        const method = "DELETE";
        const prefersHeaders = [];
        if (count) {
          prefersHeaders.push(`count=${count}`);
        }
        if (this.headers["Prefer"]) {
          prefersHeaders.unshift(this.headers["Prefer"]);
        }
        this.headers["Prefer"] = prefersHeaders.join(",");
        return new PostgrestFilterBuilder({
          method,
          url: this.url,
          headers: this.headers,
          schema: this.schema,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
    };
  }
});

// node_modules/@supabase/postgrest-js/dist/module/version.js
var version;
var init_version = __esm({
  "node_modules/@supabase/postgrest-js/dist/module/version.js"() {
    version = "1.9.2";
  }
});

// node_modules/@supabase/postgrest-js/dist/module/constants.js
var DEFAULT_HEADERS;
var init_constants = __esm({
  "node_modules/@supabase/postgrest-js/dist/module/constants.js"() {
    init_version();
    DEFAULT_HEADERS = { "X-Client-Info": `postgrest-js/${version}` };
  }
});

// node_modules/@supabase/postgrest-js/dist/module/PostgrestClient.js
var PostgrestClient;
var init_PostgrestClient = __esm({
  "node_modules/@supabase/postgrest-js/dist/module/PostgrestClient.js"() {
    init_PostgrestQueryBuilder();
    init_PostgrestFilterBuilder();
    init_constants();
    PostgrestClient = class _PostgrestClient {
      // TODO: Add back shouldThrowOnError once we figure out the typings
      /**
       * Creates a PostgREST client.
       *
       * @param url - URL of the PostgREST endpoint
       * @param options - Named parameters
       * @param options.headers - Custom headers
       * @param options.schema - Postgres schema to switch to
       * @param options.fetch - Custom fetch
       */
      constructor(url, { headers: headers2 = {}, schema, fetch: fetch3 } = {}) {
        this.url = url;
        this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS), headers2);
        this.schemaName = schema;
        this.fetch = fetch3;
      }
      /**
       * Perform a query on a table or a view.
       *
       * @param relation - The table or view name to query
       */
      from(relation) {
        const url = new URL(`${this.url}/${relation}`);
        return new PostgrestQueryBuilder(url, {
          headers: Object.assign({}, this.headers),
          schema: this.schemaName,
          fetch: this.fetch
        });
      }
      /**
       * Select a schema to query or perform an function (rpc) call.
       *
       * The schema needs to be on the list of exposed schemas inside Supabase.
       *
       * @param schema - The schema to query
       */
      schema(schema) {
        return new _PostgrestClient(this.url, {
          headers: this.headers,
          schema,
          fetch: this.fetch
        });
      }
      /**
       * Perform a function call.
       *
       * @param fn - The function name to call
       * @param args - The arguments to pass to the function call
       * @param options - Named parameters
       * @param options.head - When set to `true`, `data` will not be returned.
       * Useful if you only need the count.
       * @param options.count - Count algorithm to use to count rows returned by the
       * function. Only applicable for [set-returning
       * functions](https://www.postgresql.org/docs/current/functions-srf.html).
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      rpc(fn, args = {}, { head: head2 = false, count } = {}) {
        let method;
        const url = new URL(`${this.url}/rpc/${fn}`);
        let body2;
        if (head2) {
          method = "HEAD";
          Object.entries(args).forEach(([name, value]) => {
            url.searchParams.append(name, `${value}`);
          });
        } else {
          method = "POST";
          body2 = args;
        }
        const headers2 = Object.assign({}, this.headers);
        if (count) {
          headers2["Prefer"] = `count=${count}`;
        }
        return new PostgrestFilterBuilder({
          method,
          url,
          headers: headers2,
          schema: this.schemaName,
          body: body2,
          fetch: this.fetch,
          allowEmpty: false
        });
      }
    };
  }
});

// node_modules/@supabase/postgrest-js/dist/module/index.js
var init_module2 = __esm({
  "node_modules/@supabase/postgrest-js/dist/module/index.js"() {
    init_PostgrestClient();
    init_PostgrestQueryBuilder();
    init_PostgrestFilterBuilder();
    init_PostgrestTransformBuilder();
    init_PostgrestBuilder();
  }
});

// node_modules/@supabase/realtime-js/dist/module/lib/version.js
var version2;
var init_version2 = __esm({
  "node_modules/@supabase/realtime-js/dist/module/lib/version.js"() {
    version2 = "2.9.3";
  }
});

// node_modules/@supabase/realtime-js/dist/module/lib/constants.js
var DEFAULT_HEADERS2, VSN, DEFAULT_TIMEOUT, WS_CLOSE_NORMAL, SOCKET_STATES, CHANNEL_STATES, CHANNEL_EVENTS, TRANSPORTS, CONNECTION_STATE;
var init_constants2 = __esm({
  "node_modules/@supabase/realtime-js/dist/module/lib/constants.js"() {
    init_version2();
    DEFAULT_HEADERS2 = { "X-Client-Info": `realtime-js/${version2}` };
    VSN = "1.0.0";
    DEFAULT_TIMEOUT = 1e4;
    WS_CLOSE_NORMAL = 1e3;
    (function(SOCKET_STATES2) {
      SOCKET_STATES2[SOCKET_STATES2["connecting"] = 0] = "connecting";
      SOCKET_STATES2[SOCKET_STATES2["open"] = 1] = "open";
      SOCKET_STATES2[SOCKET_STATES2["closing"] = 2] = "closing";
      SOCKET_STATES2[SOCKET_STATES2["closed"] = 3] = "closed";
    })(SOCKET_STATES || (SOCKET_STATES = {}));
    (function(CHANNEL_STATES2) {
      CHANNEL_STATES2["closed"] = "closed";
      CHANNEL_STATES2["errored"] = "errored";
      CHANNEL_STATES2["joined"] = "joined";
      CHANNEL_STATES2["joining"] = "joining";
      CHANNEL_STATES2["leaving"] = "leaving";
    })(CHANNEL_STATES || (CHANNEL_STATES = {}));
    (function(CHANNEL_EVENTS2) {
      CHANNEL_EVENTS2["close"] = "phx_close";
      CHANNEL_EVENTS2["error"] = "phx_error";
      CHANNEL_EVENTS2["join"] = "phx_join";
      CHANNEL_EVENTS2["reply"] = "phx_reply";
      CHANNEL_EVENTS2["leave"] = "phx_leave";
      CHANNEL_EVENTS2["access_token"] = "access_token";
    })(CHANNEL_EVENTS || (CHANNEL_EVENTS = {}));
    (function(TRANSPORTS2) {
      TRANSPORTS2["websocket"] = "websocket";
    })(TRANSPORTS || (TRANSPORTS = {}));
    (function(CONNECTION_STATE2) {
      CONNECTION_STATE2["Connecting"] = "connecting";
      CONNECTION_STATE2["Open"] = "open";
      CONNECTION_STATE2["Closing"] = "closing";
      CONNECTION_STATE2["Closed"] = "closed";
    })(CONNECTION_STATE || (CONNECTION_STATE = {}));
  }
});

// node_modules/@supabase/realtime-js/dist/module/lib/timer.js
var Timer;
var init_timer = __esm({
  "node_modules/@supabase/realtime-js/dist/module/lib/timer.js"() {
    Timer = class {
      constructor(callback, timerCalc) {
        this.callback = callback;
        this.timerCalc = timerCalc;
        this.timer = void 0;
        this.tries = 0;
        this.callback = callback;
        this.timerCalc = timerCalc;
      }
      reset() {
        this.tries = 0;
        clearTimeout(this.timer);
      }
      // Cancels any previous scheduleTimeout and schedules callback
      scheduleTimeout() {
        clearTimeout(this.timer);
        this.timer = setTimeout(() => {
          this.tries = this.tries + 1;
          this.callback();
        }, this.timerCalc(this.tries + 1));
      }
    };
  }
});

// node_modules/@supabase/realtime-js/dist/module/lib/serializer.js
var Serializer;
var init_serializer = __esm({
  "node_modules/@supabase/realtime-js/dist/module/lib/serializer.js"() {
    Serializer = class {
      constructor() {
        this.HEADER_LENGTH = 1;
      }
      decode(rawPayload, callback) {
        if (rawPayload.constructor === ArrayBuffer) {
          return callback(this._binaryDecode(rawPayload));
        }
        if (typeof rawPayload === "string") {
          return callback(JSON.parse(rawPayload));
        }
        return callback({});
      }
      _binaryDecode(buffer) {
        const view = new DataView(buffer);
        const decoder = new TextDecoder();
        return this._decodeBroadcast(buffer, view, decoder);
      }
      _decodeBroadcast(buffer, view, decoder) {
        const topicSize = view.getUint8(1);
        const eventSize = view.getUint8(2);
        let offset2 = this.HEADER_LENGTH + 2;
        const topic = decoder.decode(buffer.slice(offset2, offset2 + topicSize));
        offset2 = offset2 + topicSize;
        const event = decoder.decode(buffer.slice(offset2, offset2 + eventSize));
        offset2 = offset2 + eventSize;
        const data2 = JSON.parse(decoder.decode(buffer.slice(offset2, buffer.byteLength)));
        return { ref: null, topic, event, payload: data2 };
      }
    };
  }
});

// node_modules/@supabase/realtime-js/dist/module/lib/push.js
var Push;
var init_push = __esm({
  "node_modules/@supabase/realtime-js/dist/module/lib/push.js"() {
    init_constants2();
    Push = class {
      /**
       * Initializes the Push
       *
       * @param channel The Channel
       * @param event The event, for example `"phx_join"`
       * @param payload The payload, for example `{user_id: 123}`
       * @param timeout The push timeout in milliseconds
       */
      constructor(channel, event, payload = {}, timeout = DEFAULT_TIMEOUT) {
        this.channel = channel;
        this.event = event;
        this.payload = payload;
        this.timeout = timeout;
        this.sent = false;
        this.timeoutTimer = void 0;
        this.ref = "";
        this.receivedResp = null;
        this.recHooks = [];
        this.refEvent = null;
      }
      resend(timeout) {
        this.timeout = timeout;
        this._cancelRefEvent();
        this.ref = "";
        this.refEvent = null;
        this.receivedResp = null;
        this.sent = false;
        this.send();
      }
      send() {
        if (this._hasReceived("timeout")) {
          return;
        }
        this.startTimeout();
        this.sent = true;
        this.channel.socket.push({
          topic: this.channel.topic,
          event: this.event,
          payload: this.payload,
          ref: this.ref,
          join_ref: this.channel._joinRef()
        });
      }
      updatePayload(payload) {
        this.payload = Object.assign(Object.assign({}, this.payload), payload);
      }
      receive(status, callback) {
        var _a;
        if (this._hasReceived(status)) {
          callback((_a = this.receivedResp) === null || _a === void 0 ? void 0 : _a.response);
        }
        this.recHooks.push({ status, callback });
        return this;
      }
      startTimeout() {
        if (this.timeoutTimer) {
          return;
        }
        this.ref = this.channel.socket._makeRef();
        this.refEvent = this.channel._replyEventName(this.ref);
        const callback = (payload) => {
          this._cancelRefEvent();
          this._cancelTimeout();
          this.receivedResp = payload;
          this._matchReceive(payload);
        };
        this.channel._on(this.refEvent, {}, callback);
        this.timeoutTimer = setTimeout(() => {
          this.trigger("timeout", {});
        }, this.timeout);
      }
      trigger(status, response) {
        if (this.refEvent)
          this.channel._trigger(this.refEvent, { status, response });
      }
      destroy() {
        this._cancelRefEvent();
        this._cancelTimeout();
      }
      _cancelRefEvent() {
        if (!this.refEvent) {
          return;
        }
        this.channel._off(this.refEvent, {});
      }
      _cancelTimeout() {
        clearTimeout(this.timeoutTimer);
        this.timeoutTimer = void 0;
      }
      _matchReceive({ status, response }) {
        this.recHooks.filter((h) => h.status === status).forEach((h) => h.callback(response));
      }
      _hasReceived(status) {
        return this.receivedResp && this.receivedResp.status === status;
      }
    };
  }
});

// node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js
var REALTIME_PRESENCE_LISTEN_EVENTS, RealtimePresence;
var init_RealtimePresence = __esm({
  "node_modules/@supabase/realtime-js/dist/module/RealtimePresence.js"() {
    (function(REALTIME_PRESENCE_LISTEN_EVENTS2) {
      REALTIME_PRESENCE_LISTEN_EVENTS2["SYNC"] = "sync";
      REALTIME_PRESENCE_LISTEN_EVENTS2["JOIN"] = "join";
      REALTIME_PRESENCE_LISTEN_EVENTS2["LEAVE"] = "leave";
    })(REALTIME_PRESENCE_LISTEN_EVENTS || (REALTIME_PRESENCE_LISTEN_EVENTS = {}));
    RealtimePresence = class _RealtimePresence {
      /**
       * Initializes the Presence.
       *
       * @param channel - The RealtimeChannel
       * @param opts - The options,
       *        for example `{events: {state: 'state', diff: 'diff'}}`
       */
      constructor(channel, opts) {
        this.channel = channel;
        this.state = {};
        this.pendingDiffs = [];
        this.joinRef = null;
        this.caller = {
          onJoin: () => {
          },
          onLeave: () => {
          },
          onSync: () => {
          }
        };
        const events = (opts === null || opts === void 0 ? void 0 : opts.events) || {
          state: "presence_state",
          diff: "presence_diff"
        };
        this.channel._on(events.state, {}, (newState) => {
          const { onJoin, onLeave, onSync } = this.caller;
          this.joinRef = this.channel._joinRef();
          this.state = _RealtimePresence.syncState(this.state, newState, onJoin, onLeave);
          this.pendingDiffs.forEach((diff) => {
            this.state = _RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
          });
          this.pendingDiffs = [];
          onSync();
        });
        this.channel._on(events.diff, {}, (diff) => {
          const { onJoin, onLeave, onSync } = this.caller;
          if (this.inPendingSyncState()) {
            this.pendingDiffs.push(diff);
          } else {
            this.state = _RealtimePresence.syncDiff(this.state, diff, onJoin, onLeave);
            onSync();
          }
        });
        this.onJoin((key2, currentPresences, newPresences) => {
          this.channel._trigger("presence", {
            event: "join",
            key: key2,
            currentPresences,
            newPresences
          });
        });
        this.onLeave((key2, currentPresences, leftPresences) => {
          this.channel._trigger("presence", {
            event: "leave",
            key: key2,
            currentPresences,
            leftPresences
          });
        });
        this.onSync(() => {
          this.channel._trigger("presence", { event: "sync" });
        });
      }
      /**
       * Used to sync the list of presences on the server with the
       * client's state.
       *
       * An optional `onJoin` and `onLeave` callback can be provided to
       * react to changes in the client's local presences across
       * disconnects and reconnects with the server.
       *
       * @internal
       */
      static syncState(currentState, newState, onJoin, onLeave) {
        const state = this.cloneDeep(currentState);
        const transformedState = this.transformState(newState);
        const joins = {};
        const leaves = {};
        this.map(state, (key2, presences) => {
          if (!transformedState[key2]) {
            leaves[key2] = presences;
          }
        });
        this.map(transformedState, (key2, newPresences) => {
          const currentPresences = state[key2];
          if (currentPresences) {
            const newPresenceRefs = newPresences.map((m) => m.presence_ref);
            const curPresenceRefs = currentPresences.map((m) => m.presence_ref);
            const joinedPresences = newPresences.filter((m) => curPresenceRefs.indexOf(m.presence_ref) < 0);
            const leftPresences = currentPresences.filter((m) => newPresenceRefs.indexOf(m.presence_ref) < 0);
            if (joinedPresences.length > 0) {
              joins[key2] = joinedPresences;
            }
            if (leftPresences.length > 0) {
              leaves[key2] = leftPresences;
            }
          } else {
            joins[key2] = newPresences;
          }
        });
        return this.syncDiff(state, { joins, leaves }, onJoin, onLeave);
      }
      /**
       * Used to sync a diff of presence join and leave events from the
       * server, as they happen.
       *
       * Like `syncState`, `syncDiff` accepts optional `onJoin` and
       * `onLeave` callbacks to react to a user joining or leaving from a
       * device.
       *
       * @internal
       */
      static syncDiff(state, diff, onJoin, onLeave) {
        const { joins, leaves } = {
          joins: this.transformState(diff.joins),
          leaves: this.transformState(diff.leaves)
        };
        if (!onJoin) {
          onJoin = () => {
          };
        }
        if (!onLeave) {
          onLeave = () => {
          };
        }
        this.map(joins, (key2, newPresences) => {
          var _a;
          const currentPresences = (_a = state[key2]) !== null && _a !== void 0 ? _a : [];
          state[key2] = this.cloneDeep(newPresences);
          if (currentPresences.length > 0) {
            const joinedPresenceRefs = state[key2].map((m) => m.presence_ref);
            const curPresences = currentPresences.filter((m) => joinedPresenceRefs.indexOf(m.presence_ref) < 0);
            state[key2].unshift(...curPresences);
          }
          onJoin(key2, currentPresences, newPresences);
        });
        this.map(leaves, (key2, leftPresences) => {
          let currentPresences = state[key2];
          if (!currentPresences)
            return;
          const presenceRefsToRemove = leftPresences.map((m) => m.presence_ref);
          currentPresences = currentPresences.filter((m) => presenceRefsToRemove.indexOf(m.presence_ref) < 0);
          state[key2] = currentPresences;
          onLeave(key2, currentPresences, leftPresences);
          if (currentPresences.length === 0)
            delete state[key2];
        });
        return state;
      }
      /** @internal */
      static map(obj, func) {
        return Object.getOwnPropertyNames(obj).map((key2) => func(key2, obj[key2]));
      }
      /**
       * Remove 'metas' key
       * Change 'phx_ref' to 'presence_ref'
       * Remove 'phx_ref' and 'phx_ref_prev'
       *
       * @example
       * // returns {
       *  abc123: [
       *    { presence_ref: '2', user_id: 1 },
       *    { presence_ref: '3', user_id: 2 }
       *  ]
       * }
       * RealtimePresence.transformState({
       *  abc123: {
       *    metas: [
       *      { phx_ref: '2', phx_ref_prev: '1' user_id: 1 },
       *      { phx_ref: '3', user_id: 2 }
       *    ]
       *  }
       * })
       *
       * @internal
       */
      static transformState(state) {
        state = this.cloneDeep(state);
        return Object.getOwnPropertyNames(state).reduce((newState, key2) => {
          const presences = state[key2];
          if ("metas" in presences) {
            newState[key2] = presences.metas.map((presence) => {
              presence["presence_ref"] = presence["phx_ref"];
              delete presence["phx_ref"];
              delete presence["phx_ref_prev"];
              return presence;
            });
          } else {
            newState[key2] = presences;
          }
          return newState;
        }, {});
      }
      /** @internal */
      static cloneDeep(obj) {
        return JSON.parse(JSON.stringify(obj));
      }
      /** @internal */
      onJoin(callback) {
        this.caller.onJoin = callback;
      }
      /** @internal */
      onLeave(callback) {
        this.caller.onLeave = callback;
      }
      /** @internal */
      onSync(callback) {
        this.caller.onSync = callback;
      }
      /** @internal */
      inPendingSyncState() {
        return !this.joinRef || this.joinRef !== this.channel._joinRef();
      }
    };
  }
});

// node_modules/@supabase/realtime-js/dist/module/lib/transformers.js
var PostgresTypes, convertChangeData, convertColumn, convertCell, noop2, toBoolean, toNumber, toJson, toArray, toTimestampString;
var init_transformers = __esm({
  "node_modules/@supabase/realtime-js/dist/module/lib/transformers.js"() {
    (function(PostgresTypes2) {
      PostgresTypes2["abstime"] = "abstime";
      PostgresTypes2["bool"] = "bool";
      PostgresTypes2["date"] = "date";
      PostgresTypes2["daterange"] = "daterange";
      PostgresTypes2["float4"] = "float4";
      PostgresTypes2["float8"] = "float8";
      PostgresTypes2["int2"] = "int2";
      PostgresTypes2["int4"] = "int4";
      PostgresTypes2["int4range"] = "int4range";
      PostgresTypes2["int8"] = "int8";
      PostgresTypes2["int8range"] = "int8range";
      PostgresTypes2["json"] = "json";
      PostgresTypes2["jsonb"] = "jsonb";
      PostgresTypes2["money"] = "money";
      PostgresTypes2["numeric"] = "numeric";
      PostgresTypes2["oid"] = "oid";
      PostgresTypes2["reltime"] = "reltime";
      PostgresTypes2["text"] = "text";
      PostgresTypes2["time"] = "time";
      PostgresTypes2["timestamp"] = "timestamp";
      PostgresTypes2["timestamptz"] = "timestamptz";
      PostgresTypes2["timetz"] = "timetz";
      PostgresTypes2["tsrange"] = "tsrange";
      PostgresTypes2["tstzrange"] = "tstzrange";
    })(PostgresTypes || (PostgresTypes = {}));
    convertChangeData = (columns, record, options2 = {}) => {
      var _a;
      const skipTypes = (_a = options2.skipTypes) !== null && _a !== void 0 ? _a : [];
      return Object.keys(record).reduce((acc, rec_key) => {
        acc[rec_key] = convertColumn(rec_key, columns, record, skipTypes);
        return acc;
      }, {});
    };
    convertColumn = (columnName, columns, record, skipTypes) => {
      const column = columns.find((x2) => x2.name === columnName);
      const colType = column === null || column === void 0 ? void 0 : column.type;
      const value = record[columnName];
      if (colType && !skipTypes.includes(colType)) {
        return convertCell(colType, value);
      }
      return noop2(value);
    };
    convertCell = (type, value) => {
      if (type.charAt(0) === "_") {
        const dataType = type.slice(1, type.length);
        return toArray(value, dataType);
      }
      switch (type) {
        case PostgresTypes.bool:
          return toBoolean(value);
        case PostgresTypes.float4:
        case PostgresTypes.float8:
        case PostgresTypes.int2:
        case PostgresTypes.int4:
        case PostgresTypes.int8:
        case PostgresTypes.numeric:
        case PostgresTypes.oid:
          return toNumber(value);
        case PostgresTypes.json:
        case PostgresTypes.jsonb:
          return toJson(value);
        case PostgresTypes.timestamp:
          return toTimestampString(value);
        case PostgresTypes.abstime:
        case PostgresTypes.date:
        case PostgresTypes.daterange:
        case PostgresTypes.int4range:
        case PostgresTypes.int8range:
        case PostgresTypes.money:
        case PostgresTypes.reltime:
        case PostgresTypes.text:
        case PostgresTypes.time:
        case PostgresTypes.timestamptz:
        case PostgresTypes.timetz:
        case PostgresTypes.tsrange:
        case PostgresTypes.tstzrange:
          return noop2(value);
        default:
          return noop2(value);
      }
    };
    noop2 = (value) => {
      return value;
    };
    toBoolean = (value) => {
      switch (value) {
        case "t":
          return true;
        case "f":
          return false;
        default:
          return value;
      }
    };
    toNumber = (value) => {
      if (typeof value === "string") {
        const parsedValue = parseFloat(value);
        if (!Number.isNaN(parsedValue)) {
          return parsedValue;
        }
      }
      return value;
    };
    toJson = (value) => {
      if (typeof value === "string") {
        try {
          return JSON.parse(value);
        } catch (error) {
          console.log(`JSON parse error: ${error}`);
          return value;
        }
      }
      return value;
    };
    toArray = (value, type) => {
      if (typeof value !== "string") {
        return value;
      }
      const lastIdx = value.length - 1;
      const closeBrace = value[lastIdx];
      const openBrace = value[0];
      if (openBrace === "{" && closeBrace === "}") {
        let arr;
        const valTrim = value.slice(1, lastIdx);
        try {
          arr = JSON.parse("[" + valTrim + "]");
        } catch (_) {
          arr = valTrim ? valTrim.split(",") : [];
        }
        return arr.map((val) => convertCell(type, val));
      }
      return value;
    };
    toTimestampString = (value) => {
      if (typeof value === "string") {
        return value.replace(" ", "T");
      }
      return value;
    };
  }
});

// node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js
var REALTIME_POSTGRES_CHANGES_LISTEN_EVENT, REALTIME_LISTEN_TYPES, REALTIME_SUBSCRIBE_STATES, RealtimeChannel;
var init_RealtimeChannel = __esm({
  "node_modules/@supabase/realtime-js/dist/module/RealtimeChannel.js"() {
    init_constants2();
    init_push();
    init_timer();
    init_RealtimePresence();
    init_transformers();
    (function(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2) {
      REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["ALL"] = "*";
      REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["INSERT"] = "INSERT";
      REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["UPDATE"] = "UPDATE";
      REALTIME_POSTGRES_CHANGES_LISTEN_EVENT2["DELETE"] = "DELETE";
    })(REALTIME_POSTGRES_CHANGES_LISTEN_EVENT || (REALTIME_POSTGRES_CHANGES_LISTEN_EVENT = {}));
    (function(REALTIME_LISTEN_TYPES2) {
      REALTIME_LISTEN_TYPES2["BROADCAST"] = "broadcast";
      REALTIME_LISTEN_TYPES2["PRESENCE"] = "presence";
      REALTIME_LISTEN_TYPES2["POSTGRES_CHANGES"] = "postgres_changes";
    })(REALTIME_LISTEN_TYPES || (REALTIME_LISTEN_TYPES = {}));
    (function(REALTIME_SUBSCRIBE_STATES2) {
      REALTIME_SUBSCRIBE_STATES2["SUBSCRIBED"] = "SUBSCRIBED";
      REALTIME_SUBSCRIBE_STATES2["TIMED_OUT"] = "TIMED_OUT";
      REALTIME_SUBSCRIBE_STATES2["CLOSED"] = "CLOSED";
      REALTIME_SUBSCRIBE_STATES2["CHANNEL_ERROR"] = "CHANNEL_ERROR";
    })(REALTIME_SUBSCRIBE_STATES || (REALTIME_SUBSCRIBE_STATES = {}));
    RealtimeChannel = class _RealtimeChannel {
      constructor(topic, params = { config: {} }, socket) {
        this.topic = topic;
        this.params = params;
        this.socket = socket;
        this.bindings = {};
        this.state = CHANNEL_STATES.closed;
        this.joinedOnce = false;
        this.pushBuffer = [];
        this.subTopic = topic.replace(/^realtime:/i, "");
        this.params.config = Object.assign({
          broadcast: { ack: false, self: false },
          presence: { key: "" }
        }, params.config);
        this.timeout = this.socket.timeout;
        this.joinPush = new Push(this, CHANNEL_EVENTS.join, this.params, this.timeout);
        this.rejoinTimer = new Timer(() => this._rejoinUntilConnected(), this.socket.reconnectAfterMs);
        this.joinPush.receive("ok", () => {
          this.state = CHANNEL_STATES.joined;
          this.rejoinTimer.reset();
          this.pushBuffer.forEach((pushEvent) => pushEvent.send());
          this.pushBuffer = [];
        });
        this._onClose(() => {
          this.rejoinTimer.reset();
          this.socket.log("channel", `close ${this.topic} ${this._joinRef()}`);
          this.state = CHANNEL_STATES.closed;
          this.socket._remove(this);
        });
        this._onError((reason) => {
          if (this._isLeaving() || this._isClosed()) {
            return;
          }
          this.socket.log("channel", `error ${this.topic}`, reason);
          this.state = CHANNEL_STATES.errored;
          this.rejoinTimer.scheduleTimeout();
        });
        this.joinPush.receive("timeout", () => {
          if (!this._isJoining()) {
            return;
          }
          this.socket.log("channel", `timeout ${this.topic}`, this.joinPush.timeout);
          this.state = CHANNEL_STATES.errored;
          this.rejoinTimer.scheduleTimeout();
        });
        this._on(CHANNEL_EVENTS.reply, {}, (payload, ref) => {
          this._trigger(this._replyEventName(ref), payload);
        });
        this.presence = new RealtimePresence(this);
        this.broadcastEndpointURL = this._broadcastEndpointURL();
      }
      /** Subscribe registers your client with the server */
      subscribe(callback, timeout = this.timeout) {
        var _a, _b;
        if (!this.socket.isConnected()) {
          this.socket.connect();
        }
        if (this.joinedOnce) {
          throw `tried to subscribe multiple times. 'subscribe' can only be called a single time per channel instance`;
        } else {
          const { config: { broadcast, presence } } = this.params;
          this._onError((e) => callback && callback("CHANNEL_ERROR", e));
          this._onClose(() => callback && callback("CLOSED"));
          const accessTokenPayload = {};
          const config = {
            broadcast,
            presence,
            postgres_changes: (_b = (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.map((r2) => r2.filter)) !== null && _b !== void 0 ? _b : []
          };
          if (this.socket.accessToken) {
            accessTokenPayload.access_token = this.socket.accessToken;
          }
          this.updateJoinPayload(Object.assign({ config }, accessTokenPayload));
          this.joinedOnce = true;
          this._rejoin(timeout);
          this.joinPush.receive("ok", ({ postgres_changes: serverPostgresFilters }) => {
            var _a2;
            this.socket.accessToken && this.socket.setAuth(this.socket.accessToken);
            if (serverPostgresFilters === void 0) {
              callback && callback("SUBSCRIBED");
              return;
            } else {
              const clientPostgresBindings = this.bindings.postgres_changes;
              const bindingsLen = (_a2 = clientPostgresBindings === null || clientPostgresBindings === void 0 ? void 0 : clientPostgresBindings.length) !== null && _a2 !== void 0 ? _a2 : 0;
              const newPostgresBindings = [];
              for (let i2 = 0; i2 < bindingsLen; i2++) {
                const clientPostgresBinding = clientPostgresBindings[i2];
                const { filter: { event, schema, table, filter } } = clientPostgresBinding;
                const serverPostgresFilter = serverPostgresFilters && serverPostgresFilters[i2];
                if (serverPostgresFilter && serverPostgresFilter.event === event && serverPostgresFilter.schema === schema && serverPostgresFilter.table === table && serverPostgresFilter.filter === filter) {
                  newPostgresBindings.push(Object.assign(Object.assign({}, clientPostgresBinding), { id: serverPostgresFilter.id }));
                } else {
                  this.unsubscribe();
                  callback && callback("CHANNEL_ERROR", new Error("mismatch between server and client bindings for postgres changes"));
                  return;
                }
              }
              this.bindings.postgres_changes = newPostgresBindings;
              callback && callback("SUBSCRIBED");
              return;
            }
          }).receive("error", (error) => {
            callback && callback("CHANNEL_ERROR", new Error(JSON.stringify(Object.values(error).join(", ") || "error")));
            return;
          }).receive("timeout", () => {
            callback && callback("TIMED_OUT");
            return;
          });
        }
        return this;
      }
      presenceState() {
        return this.presence.state;
      }
      async track(payload, opts = {}) {
        return await this.send({
          type: "presence",
          event: "track",
          payload
        }, opts.timeout || this.timeout);
      }
      async untrack(opts = {}) {
        return await this.send({
          type: "presence",
          event: "untrack"
        }, opts);
      }
      on(type, filter, callback) {
        return this._on(type, filter, callback);
      }
      /**
       * Sends a message into the channel.
       *
       * @param args Arguments to send to channel
       * @param args.type The type of event to send
       * @param args.event The name of the event being sent
       * @param args.payload Payload to be sent
       * @param opts Options to be used during the send process
       */
      async send(args, opts = {}) {
        var _a, _b;
        if (!this._canPush() && args.type === "broadcast") {
          const { event, payload: endpoint_payload } = args;
          const options2 = {
            method: "POST",
            headers: {
              apikey: (_a = this.socket.apiKey) !== null && _a !== void 0 ? _a : "",
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              messages: [
                { topic: this.subTopic, event, payload: endpoint_payload }
              ]
            })
          };
          try {
            const response = await this._fetchWithTimeout(this.broadcastEndpointURL, options2, (_b = opts.timeout) !== null && _b !== void 0 ? _b : this.timeout);
            if (response.ok) {
              return "ok";
            } else {
              return "error";
            }
          } catch (error) {
            if (error.name === "AbortError") {
              return "timed out";
            } else {
              return "error";
            }
          }
        } else {
          return new Promise((resolve2) => {
            var _a2, _b2, _c;
            const push2 = this._push(args.type, args, opts.timeout || this.timeout);
            if (args.type === "broadcast" && !((_c = (_b2 = (_a2 = this.params) === null || _a2 === void 0 ? void 0 : _a2.config) === null || _b2 === void 0 ? void 0 : _b2.broadcast) === null || _c === void 0 ? void 0 : _c.ack)) {
              resolve2("ok");
            }
            push2.receive("ok", () => resolve2("ok"));
            push2.receive("timeout", () => resolve2("timed out"));
          });
        }
      }
      updateJoinPayload(payload) {
        this.joinPush.updatePayload(payload);
      }
      /**
       * Leaves the channel.
       *
       * Unsubscribes from server events, and instructs channel to terminate on server.
       * Triggers onClose() hooks.
       *
       * To receive leave acknowledgements, use the a `receive` hook to bind to the server ack, ie:
       * channel.unsubscribe().receive("ok", () => alert("left!") )
       */
      unsubscribe(timeout = this.timeout) {
        this.state = CHANNEL_STATES.leaving;
        const onClose = () => {
          this.socket.log("channel", `leave ${this.topic}`);
          this._trigger(CHANNEL_EVENTS.close, "leave", this._joinRef());
        };
        this.rejoinTimer.reset();
        this.joinPush.destroy();
        return new Promise((resolve2) => {
          const leavePush = new Push(this, CHANNEL_EVENTS.leave, {}, timeout);
          leavePush.receive("ok", () => {
            onClose();
            resolve2("ok");
          }).receive("timeout", () => {
            onClose();
            resolve2("timed out");
          }).receive("error", () => {
            resolve2("error");
          });
          leavePush.send();
          if (!this._canPush()) {
            leavePush.trigger("ok", {});
          }
        });
      }
      /** @internal */
      _broadcastEndpointURL() {
        let url = this.socket.endPoint;
        url = url.replace(/^ws/i, "http");
        url = url.replace(/(\/socket\/websocket|\/socket|\/websocket)\/?$/i, "");
        return url.replace(/\/+$/, "") + "/api/broadcast";
      }
      async _fetchWithTimeout(url, options2, timeout) {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        const response = await this.socket.fetch(url, Object.assign(Object.assign({}, options2), { signal: controller.signal }));
        clearTimeout(id);
        return response;
      }
      /** @internal */
      _push(event, payload, timeout = this.timeout) {
        if (!this.joinedOnce) {
          throw `tried to push '${event}' to '${this.topic}' before joining. Use channel.subscribe() before pushing events`;
        }
        let pushEvent = new Push(this, event, payload, timeout);
        if (this._canPush()) {
          pushEvent.send();
        } else {
          pushEvent.startTimeout();
          this.pushBuffer.push(pushEvent);
        }
        return pushEvent;
      }
      /**
       * Overridable message hook
       *
       * Receives all events for specialized message handling before dispatching to the channel callbacks.
       * Must return the payload, modified or unmodified.
       *
       * @internal
       */
      _onMessage(_event, payload, _ref) {
        return payload;
      }
      /** @internal */
      _isMember(topic) {
        return this.topic === topic;
      }
      /** @internal */
      _joinRef() {
        return this.joinPush.ref;
      }
      /** @internal */
      _trigger(type, payload, ref) {
        var _a, _b;
        const typeLower = type.toLocaleLowerCase();
        const { close, error, leave, join } = CHANNEL_EVENTS;
        const events = [close, error, leave, join];
        if (ref && events.indexOf(typeLower) >= 0 && ref !== this._joinRef()) {
          return;
        }
        let handledPayload = this._onMessage(typeLower, payload, ref);
        if (payload && !handledPayload) {
          throw "channel onMessage callbacks must return the payload, modified or unmodified";
        }
        if (["insert", "update", "delete"].includes(typeLower)) {
          (_a = this.bindings.postgres_changes) === null || _a === void 0 ? void 0 : _a.filter((bind) => {
            var _a2, _b2, _c;
            return ((_a2 = bind.filter) === null || _a2 === void 0 ? void 0 : _a2.event) === "*" || ((_c = (_b2 = bind.filter) === null || _b2 === void 0 ? void 0 : _b2.event) === null || _c === void 0 ? void 0 : _c.toLocaleLowerCase()) === typeLower;
          }).map((bind) => bind.callback(handledPayload, ref));
        } else {
          (_b = this.bindings[typeLower]) === null || _b === void 0 ? void 0 : _b.filter((bind) => {
            var _a2, _b2, _c, _d, _e, _f;
            if (["broadcast", "presence", "postgres_changes"].includes(typeLower)) {
              if ("id" in bind) {
                const bindId = bind.id;
                const bindEvent = (_a2 = bind.filter) === null || _a2 === void 0 ? void 0 : _a2.event;
                return bindId && ((_b2 = payload.ids) === null || _b2 === void 0 ? void 0 : _b2.includes(bindId)) && (bindEvent === "*" || (bindEvent === null || bindEvent === void 0 ? void 0 : bindEvent.toLocaleLowerCase()) === ((_c = payload.data) === null || _c === void 0 ? void 0 : _c.type.toLocaleLowerCase()));
              } else {
                const bindEvent = (_e = (_d = bind === null || bind === void 0 ? void 0 : bind.filter) === null || _d === void 0 ? void 0 : _d.event) === null || _e === void 0 ? void 0 : _e.toLocaleLowerCase();
                return bindEvent === "*" || bindEvent === ((_f = payload === null || payload === void 0 ? void 0 : payload.event) === null || _f === void 0 ? void 0 : _f.toLocaleLowerCase());
              }
            } else {
              return bind.type.toLocaleLowerCase() === typeLower;
            }
          }).map((bind) => {
            if (typeof handledPayload === "object" && "ids" in handledPayload) {
              const postgresChanges = handledPayload.data;
              const { schema, table, commit_timestamp, type: type2, errors } = postgresChanges;
              const enrichedPayload = {
                schema,
                table,
                commit_timestamp,
                eventType: type2,
                new: {},
                old: {},
                errors
              };
              handledPayload = Object.assign(Object.assign({}, enrichedPayload), this._getPayloadRecords(postgresChanges));
            }
            bind.callback(handledPayload, ref);
          });
        }
      }
      /** @internal */
      _isClosed() {
        return this.state === CHANNEL_STATES.closed;
      }
      /** @internal */
      _isJoined() {
        return this.state === CHANNEL_STATES.joined;
      }
      /** @internal */
      _isJoining() {
        return this.state === CHANNEL_STATES.joining;
      }
      /** @internal */
      _isLeaving() {
        return this.state === CHANNEL_STATES.leaving;
      }
      /** @internal */
      _replyEventName(ref) {
        return `chan_reply_${ref}`;
      }
      /** @internal */
      _on(type, filter, callback) {
        const typeLower = type.toLocaleLowerCase();
        const binding = {
          type: typeLower,
          filter,
          callback
        };
        if (this.bindings[typeLower]) {
          this.bindings[typeLower].push(binding);
        } else {
          this.bindings[typeLower] = [binding];
        }
        return this;
      }
      /** @internal */
      _off(type, filter) {
        const typeLower = type.toLocaleLowerCase();
        this.bindings[typeLower] = this.bindings[typeLower].filter((bind) => {
          var _a;
          return !(((_a = bind.type) === null || _a === void 0 ? void 0 : _a.toLocaleLowerCase()) === typeLower && _RealtimeChannel.isEqual(bind.filter, filter));
        });
        return this;
      }
      /** @internal */
      static isEqual(obj1, obj2) {
        if (Object.keys(obj1).length !== Object.keys(obj2).length) {
          return false;
        }
        for (const k in obj1) {
          if (obj1[k] !== obj2[k]) {
            return false;
          }
        }
        return true;
      }
      /** @internal */
      _rejoinUntilConnected() {
        this.rejoinTimer.scheduleTimeout();
        if (this.socket.isConnected()) {
          this._rejoin();
        }
      }
      /**
       * Registers a callback that will be executed when the channel closes.
       *
       * @internal
       */
      _onClose(callback) {
        this._on(CHANNEL_EVENTS.close, {}, callback);
      }
      /**
       * Registers a callback that will be executed when the channel encounteres an error.
       *
       * @internal
       */
      _onError(callback) {
        this._on(CHANNEL_EVENTS.error, {}, (reason) => callback(reason));
      }
      /**
       * Returns `true` if the socket is connected and the channel has been joined.
       *
       * @internal
       */
      _canPush() {
        return this.socket.isConnected() && this._isJoined();
      }
      /** @internal */
      _rejoin(timeout = this.timeout) {
        if (this._isLeaving()) {
          return;
        }
        this.socket._leaveOpenTopic(this.topic);
        this.state = CHANNEL_STATES.joining;
        this.joinPush.resend(timeout);
      }
      /** @internal */
      _getPayloadRecords(payload) {
        const records = {
          new: {},
          old: {}
        };
        if (payload.type === "INSERT" || payload.type === "UPDATE") {
          records.new = convertChangeData(payload.columns, payload.record);
        }
        if (payload.type === "UPDATE" || payload.type === "DELETE") {
          records.old = convertChangeData(payload.columns, payload.old_record);
        }
        return records;
      }
    };
  }
});

// node_modules/ws/browser.js
var require_browser = __commonJS({
  "node_modules/ws/browser.js"(exports, module) {
    "use strict";
    module.exports = function() {
      throw new Error(
        "ws does not work in the browser. Browser clients must use the native WebSocket object"
      );
    };
  }
});

// node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js
var noop3, NATIVE_WEBSOCKET_AVAILABLE, RealtimeClient, WSWebSocketDummy;
var init_RealtimeClient = __esm({
  "node_modules/@supabase/realtime-js/dist/module/RealtimeClient.js"() {
    init_constants2();
    init_timer();
    init_serializer();
    init_RealtimeChannel();
    noop3 = () => {
    };
    NATIVE_WEBSOCKET_AVAILABLE = typeof WebSocket !== "undefined";
    RealtimeClient = class {
      /**
       * Initializes the Socket.
       *
       * @param endPoint The string WebSocket endpoint, ie, "ws://example.com/socket", "wss://example.com", "/socket" (inherited host & protocol)
       * @param options.transport The Websocket Transport, for example WebSocket.
       * @param options.timeout The default timeout in milliseconds to trigger push timeouts.
       * @param options.params The optional params to pass when connecting.
       * @param options.headers The optional headers to pass when connecting.
       * @param options.heartbeatIntervalMs The millisec interval to send a heartbeat message.
       * @param options.logger The optional function for specialized logging, ie: logger: (kind, msg, data) => { console.log(`${kind}: ${msg}`, data) }
       * @param options.encode The function to encode outgoing messages. Defaults to JSON: (payload, callback) => callback(JSON.stringify(payload))
       * @param options.decode The function to decode incoming messages. Defaults to Serializer's decode.
       * @param options.reconnectAfterMs he optional function that returns the millsec reconnect interval. Defaults to stepped backoff off.
       */
      constructor(endPoint, options2) {
        var _a;
        this.accessToken = null;
        this.apiKey = null;
        this.channels = [];
        this.endPoint = "";
        this.headers = DEFAULT_HEADERS2;
        this.params = {};
        this.timeout = DEFAULT_TIMEOUT;
        this.heartbeatIntervalMs = 3e4;
        this.heartbeatTimer = void 0;
        this.pendingHeartbeatRef = null;
        this.ref = 0;
        this.logger = noop3;
        this.conn = null;
        this.sendBuffer = [];
        this.serializer = new Serializer();
        this.stateChangeCallbacks = {
          open: [],
          close: [],
          error: [],
          message: []
        };
        this._resolveFetch = (customFetch) => {
          let _fetch;
          if (customFetch) {
            _fetch = customFetch;
          } else if (typeof fetch === "undefined") {
            _fetch = (...args) => Promise.resolve().then(() => (init_browser(), browser_exports)).then(({ default: fetch3 }) => fetch3(...args));
          } else {
            _fetch = fetch;
          }
          return (...args) => _fetch(...args);
        };
        this.endPoint = `${endPoint}/${TRANSPORTS.websocket}`;
        if (options2 === null || options2 === void 0 ? void 0 : options2.transport) {
          this.transport = options2.transport;
        } else {
          this.transport = null;
        }
        if (options2 === null || options2 === void 0 ? void 0 : options2.params)
          this.params = options2.params;
        if (options2 === null || options2 === void 0 ? void 0 : options2.headers)
          this.headers = Object.assign(Object.assign({}, this.headers), options2.headers);
        if (options2 === null || options2 === void 0 ? void 0 : options2.timeout)
          this.timeout = options2.timeout;
        if (options2 === null || options2 === void 0 ? void 0 : options2.logger)
          this.logger = options2.logger;
        if (options2 === null || options2 === void 0 ? void 0 : options2.heartbeatIntervalMs)
          this.heartbeatIntervalMs = options2.heartbeatIntervalMs;
        const accessToken = (_a = options2 === null || options2 === void 0 ? void 0 : options2.params) === null || _a === void 0 ? void 0 : _a.apikey;
        if (accessToken) {
          this.accessToken = accessToken;
          this.apiKey = accessToken;
        }
        this.reconnectAfterMs = (options2 === null || options2 === void 0 ? void 0 : options2.reconnectAfterMs) ? options2.reconnectAfterMs : (tries) => {
          return [1e3, 2e3, 5e3, 1e4][tries - 1] || 1e4;
        };
        this.encode = (options2 === null || options2 === void 0 ? void 0 : options2.encode) ? options2.encode : (payload, callback) => {
          return callback(JSON.stringify(payload));
        };
        this.decode = (options2 === null || options2 === void 0 ? void 0 : options2.decode) ? options2.decode : this.serializer.decode.bind(this.serializer);
        this.reconnectTimer = new Timer(async () => {
          this.disconnect();
          this.connect();
        }, this.reconnectAfterMs);
        this.fetch = this._resolveFetch(options2 === null || options2 === void 0 ? void 0 : options2.fetch);
      }
      /**
       * Connects the socket, unless already connected.
       */
      connect() {
        if (this.conn) {
          return;
        }
        if (this.transport) {
          this.conn = new this.transport(this._endPointURL(), void 0, {
            headers: this.headers
          });
          return;
        }
        if (NATIVE_WEBSOCKET_AVAILABLE) {
          this.conn = new WebSocket(this._endPointURL());
          this.setupConnection();
          return;
        }
        this.conn = new WSWebSocketDummy(this._endPointURL(), void 0, {
          close: () => {
            this.conn = null;
          }
        });
        Promise.resolve().then(() => __toESM(require_browser())).then(({ default: WS }) => {
          this.conn = new WS(this._endPointURL(), void 0, {
            headers: this.headers
          });
          this.setupConnection();
        });
      }
      /**
       * Disconnects the socket.
       *
       * @param code A numeric status code to send on disconnect.
       * @param reason A custom reason for the disconnect.
       */
      disconnect(code, reason) {
        if (this.conn) {
          this.conn.onclose = function() {
          };
          if (code) {
            this.conn.close(code, reason !== null && reason !== void 0 ? reason : "");
          } else {
            this.conn.close();
          }
          this.conn = null;
          this.heartbeatTimer && clearInterval(this.heartbeatTimer);
          this.reconnectTimer.reset();
        }
      }
      /**
       * Returns all created channels
       */
      getChannels() {
        return this.channels;
      }
      /**
       * Unsubscribes and removes a single channel
       * @param channel A RealtimeChannel instance
       */
      async removeChannel(channel) {
        const status = await channel.unsubscribe();
        if (this.channels.length === 0) {
          this.disconnect();
        }
        return status;
      }
      /**
       * Unsubscribes and removes all channels
       */
      async removeAllChannels() {
        const values_1 = await Promise.all(this.channels.map((channel) => channel.unsubscribe()));
        this.disconnect();
        return values_1;
      }
      /**
       * Logs the message.
       *
       * For customized logging, `this.logger` can be overridden.
       */
      log(kind, msg, data2) {
        this.logger(kind, msg, data2);
      }
      /**
       * Returns the current state of the socket.
       */
      connectionState() {
        switch (this.conn && this.conn.readyState) {
          case SOCKET_STATES.connecting:
            return CONNECTION_STATE.Connecting;
          case SOCKET_STATES.open:
            return CONNECTION_STATE.Open;
          case SOCKET_STATES.closing:
            return CONNECTION_STATE.Closing;
          default:
            return CONNECTION_STATE.Closed;
        }
      }
      /**
       * Returns `true` is the connection is open.
       */
      isConnected() {
        return this.connectionState() === CONNECTION_STATE.Open;
      }
      channel(topic, params = { config: {} }) {
        const chan = new RealtimeChannel(`realtime:${topic}`, params, this);
        this.channels.push(chan);
        return chan;
      }
      /**
       * Push out a message if the socket is connected.
       *
       * If the socket is not connected, the message gets enqueued within a local buffer, and sent out when a connection is next established.
       */
      push(data2) {
        const { topic, event, payload, ref } = data2;
        const callback = () => {
          this.encode(data2, (result) => {
            var _a;
            (_a = this.conn) === null || _a === void 0 ? void 0 : _a.send(result);
          });
        };
        this.log("push", `${topic} ${event} (${ref})`, payload);
        if (this.isConnected()) {
          callback();
        } else {
          this.sendBuffer.push(callback);
        }
      }
      /**
       * Sets the JWT access token used for channel subscription authorization and Realtime RLS.
       *
       * @param token A JWT string.
       */
      setAuth(token) {
        this.accessToken = token;
        this.channels.forEach((channel) => {
          token && channel.updateJoinPayload({ access_token: token });
          if (channel.joinedOnce && channel._isJoined()) {
            channel._push(CHANNEL_EVENTS.access_token, { access_token: token });
          }
        });
      }
      /**
       * Return the next message ref, accounting for overflows
       *
       * @internal
       */
      _makeRef() {
        let newRef = this.ref + 1;
        if (newRef === this.ref) {
          this.ref = 0;
        } else {
          this.ref = newRef;
        }
        return this.ref.toString();
      }
      /**
       * Unsubscribe from channels with the specified topic.
       *
       * @internal
       */
      _leaveOpenTopic(topic) {
        let dupChannel = this.channels.find((c) => c.topic === topic && (c._isJoined() || c._isJoining()));
        if (dupChannel) {
          this.log("transport", `leaving duplicate topic "${topic}"`);
          dupChannel.unsubscribe();
        }
      }
      /**
       * Removes a subscription from the socket.
       *
       * @param channel An open subscription.
       *
       * @internal
       */
      _remove(channel) {
        this.channels = this.channels.filter((c) => c._joinRef() !== channel._joinRef());
      }
      /**
       * Sets up connection handlers.
       *
       * @internal
       */
      setupConnection() {
        if (this.conn) {
          this.conn.binaryType = "arraybuffer";
          this.conn.onopen = () => this._onConnOpen();
          this.conn.onerror = (error) => this._onConnError(error);
          this.conn.onmessage = (event) => this._onConnMessage(event);
          this.conn.onclose = (event) => this._onConnClose(event);
        }
      }
      /**
       * Returns the URL of the websocket.
       *
       * @internal
       */
      _endPointURL() {
        return this._appendParams(this.endPoint, Object.assign({}, this.params, { vsn: VSN }));
      }
      /** @internal */
      _onConnMessage(rawMessage) {
        this.decode(rawMessage.data, (msg) => {
          let { topic, event, payload, ref } = msg;
          if (ref && ref === this.pendingHeartbeatRef || event === (payload === null || payload === void 0 ? void 0 : payload.type)) {
            this.pendingHeartbeatRef = null;
          }
          this.log("receive", `${payload.status || ""} ${topic} ${event} ${ref && "(" + ref + ")" || ""}`, payload);
          this.channels.filter((channel) => channel._isMember(topic)).forEach((channel) => channel._trigger(event, payload, ref));
          this.stateChangeCallbacks.message.forEach((callback) => callback(msg));
        });
      }
      /** @internal */
      _onConnOpen() {
        this.log("transport", `connected to ${this._endPointURL()}`);
        this._flushSendBuffer();
        this.reconnectTimer.reset();
        this.heartbeatTimer && clearInterval(this.heartbeatTimer);
        this.heartbeatTimer = setInterval(() => this._sendHeartbeat(), this.heartbeatIntervalMs);
        this.stateChangeCallbacks.open.forEach((callback) => callback());
      }
      /** @internal */
      _onConnClose(event) {
        this.log("transport", "close", event);
        this._triggerChanError();
        this.heartbeatTimer && clearInterval(this.heartbeatTimer);
        this.reconnectTimer.scheduleTimeout();
        this.stateChangeCallbacks.close.forEach((callback) => callback(event));
      }
      /** @internal */
      _onConnError(error) {
        this.log("transport", error.message);
        this._triggerChanError();
        this.stateChangeCallbacks.error.forEach((callback) => callback(error));
      }
      /** @internal */
      _triggerChanError() {
        this.channels.forEach((channel) => channel._trigger(CHANNEL_EVENTS.error));
      }
      /** @internal */
      _appendParams(url, params) {
        if (Object.keys(params).length === 0) {
          return url;
        }
        const prefix2 = url.match(/\?/) ? "&" : "?";
        const query = new URLSearchParams(params);
        return `${url}${prefix2}${query}`;
      }
      /** @internal */
      _flushSendBuffer() {
        if (this.isConnected() && this.sendBuffer.length > 0) {
          this.sendBuffer.forEach((callback) => callback());
          this.sendBuffer = [];
        }
      }
      /** @internal */
      _sendHeartbeat() {
        var _a;
        if (!this.isConnected()) {
          return;
        }
        if (this.pendingHeartbeatRef) {
          this.pendingHeartbeatRef = null;
          this.log("transport", "heartbeat timeout. Attempting to re-establish connection");
          (_a = this.conn) === null || _a === void 0 ? void 0 : _a.close(WS_CLOSE_NORMAL, "hearbeat timeout");
          return;
        }
        this.pendingHeartbeatRef = this._makeRef();
        this.push({
          topic: "phoenix",
          event: "heartbeat",
          payload: {},
          ref: this.pendingHeartbeatRef
        });
        this.setAuth(this.accessToken);
      }
    };
    WSWebSocketDummy = class {
      constructor(address, _protocols, options2) {
        this.binaryType = "arraybuffer";
        this.onclose = () => {
        };
        this.onerror = () => {
        };
        this.onmessage = () => {
        };
        this.onopen = () => {
        };
        this.readyState = SOCKET_STATES.connecting;
        this.send = () => {
        };
        this.url = null;
        this.url = address;
        this.close = options2.close;
      }
    };
  }
});

// node_modules/@supabase/realtime-js/dist/module/index.js
var init_module3 = __esm({
  "node_modules/@supabase/realtime-js/dist/module/index.js"() {
    init_RealtimeClient();
    init_RealtimeChannel();
    init_RealtimePresence();
  }
});

// node_modules/@supabase/storage-js/dist/module/lib/errors.js
function isStorageError(error) {
  return typeof error === "object" && error !== null && "__isStorageError" in error;
}
var StorageError, StorageApiError, StorageUnknownError;
var init_errors = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/errors.js"() {
    StorageError = class extends Error {
      constructor(message) {
        super(message);
        this.__isStorageError = true;
        this.name = "StorageError";
      }
    };
    StorageApiError = class extends StorageError {
      constructor(message, status) {
        super(message);
        this.name = "StorageApiError";
        this.status = status;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status
        };
      }
    };
    StorageUnknownError = class extends StorageError {
      constructor(message, originalError) {
        super(message);
        this.name = "StorageUnknownError";
        this.originalError = originalError;
      }
    };
  }
});

// node_modules/@supabase/storage-js/dist/module/lib/helpers.js
var __awaiter2, resolveFetch2, resolveResponse;
var init_helpers = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/helpers.js"() {
    __awaiter2 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P || (P = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    resolveFetch2 = (customFetch) => {
      let _fetch;
      if (customFetch) {
        _fetch = customFetch;
      } else if (typeof fetch === "undefined") {
        _fetch = (...args) => Promise.resolve().then(() => (init_browser(), browser_exports)).then(({ default: fetch3 }) => fetch3(...args));
      } else {
        _fetch = fetch;
      }
      return (...args) => _fetch(...args);
    };
    resolveResponse = () => __awaiter2(void 0, void 0, void 0, function* () {
      if (typeof Response === "undefined") {
        return (yield Promise.resolve().then(() => (init_browser(), browser_exports))).Response;
      }
      return Response;
    });
  }
});

// node_modules/@supabase/storage-js/dist/module/lib/fetch.js
function _handleRequest(fetcher, method, url, options2, parameters, body2) {
  return __awaiter3(this, void 0, void 0, function* () {
    return new Promise((resolve2, reject) => {
      fetcher(url, _getRequestParams(method, options2, parameters, body2)).then((result) => {
        if (!result.ok)
          throw result;
        if (options2 === null || options2 === void 0 ? void 0 : options2.noResolveJson)
          return result;
        return result.json();
      }).then((data2) => resolve2(data2)).catch((error) => handleError(error, reject));
    });
  });
}
function get2(fetcher, url, options2, parameters) {
  return __awaiter3(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "GET", url, options2, parameters);
  });
}
function post(fetcher, url, body2, options2, parameters) {
  return __awaiter3(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "POST", url, options2, parameters, body2);
  });
}
function put(fetcher, url, body2, options2, parameters) {
  return __awaiter3(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "PUT", url, options2, parameters, body2);
  });
}
function remove(fetcher, url, body2, options2, parameters) {
  return __awaiter3(this, void 0, void 0, function* () {
    return _handleRequest(fetcher, "DELETE", url, options2, parameters, body2);
  });
}
var __awaiter3, _getErrorMessage, handleError, _getRequestParams;
var init_fetch = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/fetch.js"() {
    init_errors();
    init_helpers();
    __awaiter3 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P || (P = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    _getErrorMessage = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
    handleError = (error, reject) => __awaiter3(void 0, void 0, void 0, function* () {
      const Res = yield resolveResponse();
      if (error instanceof Res) {
        error.json().then((err) => {
          reject(new StorageApiError(_getErrorMessage(err), error.status || 500));
        }).catch((err) => {
          reject(new StorageUnknownError(_getErrorMessage(err), err));
        });
      } else {
        reject(new StorageUnknownError(_getErrorMessage(error), error));
      }
    });
    _getRequestParams = (method, options2, parameters, body2) => {
      const params = { method, headers: (options2 === null || options2 === void 0 ? void 0 : options2.headers) || {} };
      if (method === "GET") {
        return params;
      }
      params.headers = Object.assign({ "Content-Type": "application/json" }, options2 === null || options2 === void 0 ? void 0 : options2.headers);
      params.body = JSON.stringify(body2);
      return Object.assign(Object.assign({}, params), parameters);
    };
  }
});

// node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js
var __awaiter4, DEFAULT_SEARCH_OPTIONS, DEFAULT_FILE_OPTIONS, StorageFileApi;
var init_StorageFileApi = __esm({
  "node_modules/@supabase/storage-js/dist/module/packages/StorageFileApi.js"() {
    init_errors();
    init_fetch();
    init_helpers();
    __awaiter4 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P || (P = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    DEFAULT_SEARCH_OPTIONS = {
      limit: 100,
      offset: 0,
      sortBy: {
        column: "name",
        order: "asc"
      }
    };
    DEFAULT_FILE_OPTIONS = {
      cacheControl: "3600",
      contentType: "text/plain;charset=UTF-8",
      upsert: false
    };
    StorageFileApi = class {
      constructor(url, headers2 = {}, bucketId, fetch3) {
        this.url = url;
        this.headers = headers2;
        this.bucketId = bucketId;
        this.fetch = resolveFetch2(fetch3);
      }
      /**
       * Uploads a file to an existing bucket or replaces an existing file at the specified path with a new one.
       *
       * @param method HTTP method.
       * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
       * @param fileBody The body of the file to be stored in the bucket.
       */
      uploadOrUpdate(method, path, fileBody, fileOptions) {
        return __awaiter4(this, void 0, void 0, function* () {
          try {
            let body2;
            const options2 = Object.assign(Object.assign({}, DEFAULT_FILE_OPTIONS), fileOptions);
            const headers2 = Object.assign(Object.assign({}, this.headers), method === "POST" && { "x-upsert": String(options2.upsert) });
            if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
              body2 = new FormData();
              body2.append("cacheControl", options2.cacheControl);
              body2.append("", fileBody);
            } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
              body2 = fileBody;
              body2.append("cacheControl", options2.cacheControl);
            } else {
              body2 = fileBody;
              headers2["cache-control"] = `max-age=${options2.cacheControl}`;
              headers2["content-type"] = options2.contentType;
            }
            const cleanPath = this._removeEmptyFolders(path);
            const _path = this._getFinalPath(cleanPath);
            const res = yield this.fetch(`${this.url}/object/${_path}`, Object.assign({ method, body: body2, headers: headers2 }, (options2 === null || options2 === void 0 ? void 0 : options2.duplex) ? { duplex: options2.duplex } : {}));
            const data2 = yield res.json();
            if (res.ok) {
              return {
                data: { path: cleanPath, id: data2.Id, fullPath: data2.Key },
                error: null
              };
            } else {
              const error = data2;
              return { data: null, error };
            }
          } catch (error) {
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Uploads a file to an existing bucket.
       *
       * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
       * @param fileBody The body of the file to be stored in the bucket.
       */
      upload(path, fileBody, fileOptions) {
        return __awaiter4(this, void 0, void 0, function* () {
          return this.uploadOrUpdate("POST", path, fileBody, fileOptions);
        });
      }
      /**
       * Upload a file with a token generated from `createSignedUploadUrl`.
       * @param path The file path, including the file name. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to upload.
       * @param token The token generated from `createSignedUploadUrl`
       * @param fileBody The body of the file to be stored in the bucket.
       */
      uploadToSignedUrl(path, token, fileBody, fileOptions) {
        return __awaiter4(this, void 0, void 0, function* () {
          const cleanPath = this._removeEmptyFolders(path);
          const _path = this._getFinalPath(cleanPath);
          const url = new URL(this.url + `/object/upload/sign/${_path}`);
          url.searchParams.set("token", token);
          try {
            let body2;
            const options2 = Object.assign({ upsert: DEFAULT_FILE_OPTIONS.upsert }, fileOptions);
            const headers2 = Object.assign(Object.assign({}, this.headers), { "x-upsert": String(options2.upsert) });
            if (typeof Blob !== "undefined" && fileBody instanceof Blob) {
              body2 = new FormData();
              body2.append("cacheControl", options2.cacheControl);
              body2.append("", fileBody);
            } else if (typeof FormData !== "undefined" && fileBody instanceof FormData) {
              body2 = fileBody;
              body2.append("cacheControl", options2.cacheControl);
            } else {
              body2 = fileBody;
              headers2["cache-control"] = `max-age=${options2.cacheControl}`;
              headers2["content-type"] = options2.contentType;
            }
            const res = yield this.fetch(url.toString(), {
              method: "PUT",
              body: body2,
              headers: headers2
            });
            const data2 = yield res.json();
            if (res.ok) {
              return {
                data: { path: cleanPath, fullPath: data2.Key },
                error: null
              };
            } else {
              const error = data2;
              return { data: null, error };
            }
          } catch (error) {
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Creates a signed upload URL.
       * Signed upload URLs can be used to upload files to the bucket without further authentication.
       * They are valid for 2 hours.
       * @param path The file path, including the current file name. For example `folder/image.png`.
       */
      createSignedUploadUrl(path) {
        return __awaiter4(this, void 0, void 0, function* () {
          try {
            let _path = this._getFinalPath(path);
            const data2 = yield post(this.fetch, `${this.url}/object/upload/sign/${_path}`, {}, { headers: this.headers });
            const url = new URL(this.url + data2.url);
            const token = url.searchParams.get("token");
            if (!token) {
              throw new StorageError("No token returned by API");
            }
            return { data: { signedUrl: url.toString(), path, token }, error: null };
          } catch (error) {
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Replaces an existing file at the specified path with a new one.
       *
       * @param path The relative file path. Should be of the format `folder/subfolder/filename.png`. The bucket must already exist before attempting to update.
       * @param fileBody The body of the file to be stored in the bucket.
       */
      update(path, fileBody, fileOptions) {
        return __awaiter4(this, void 0, void 0, function* () {
          return this.uploadOrUpdate("PUT", path, fileBody, fileOptions);
        });
      }
      /**
       * Moves an existing file to a new path in the same bucket.
       *
       * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
       * @param toPath The new file path, including the new file name. For example `folder/image-new.png`.
       */
      move(fromPath, toPath) {
        return __awaiter4(this, void 0, void 0, function* () {
          try {
            const data2 = yield post(this.fetch, `${this.url}/object/move`, { bucketId: this.bucketId, sourceKey: fromPath, destinationKey: toPath }, { headers: this.headers });
            return { data: data2, error: null };
          } catch (error) {
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Copies an existing file to a new path in the same bucket.
       *
       * @param fromPath The original file path, including the current file name. For example `folder/image.png`.
       * @param toPath The new file path, including the new file name. For example `folder/image-copy.png`.
       */
      copy(fromPath, toPath) {
        return __awaiter4(this, void 0, void 0, function* () {
          try {
            const data2 = yield post(this.fetch, `${this.url}/object/copy`, { bucketId: this.bucketId, sourceKey: fromPath, destinationKey: toPath }, { headers: this.headers });
            return { data: { path: data2.Key }, error: null };
          } catch (error) {
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Creates a signed URL. Use a signed URL to share a file for a fixed amount of time.
       *
       * @param path The file path, including the current file name. For example `folder/image.png`.
       * @param expiresIn The number of seconds until the signed URL expires. For example, `60` for a URL which is valid for one minute.
       * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
       * @param options.transform Transform the asset before serving it to the client.
       */
      createSignedUrl(path, expiresIn, options2) {
        return __awaiter4(this, void 0, void 0, function* () {
          try {
            let _path = this._getFinalPath(path);
            let data2 = yield post(this.fetch, `${this.url}/object/sign/${_path}`, Object.assign({ expiresIn }, (options2 === null || options2 === void 0 ? void 0 : options2.transform) ? { transform: options2.transform } : {}), { headers: this.headers });
            const downloadQueryParam = (options2 === null || options2 === void 0 ? void 0 : options2.download) ? `&download=${options2.download === true ? "" : options2.download}` : "";
            const signedUrl = encodeURI(`${this.url}${data2.signedURL}${downloadQueryParam}`);
            data2 = { signedUrl };
            return { data: data2, error: null };
          } catch (error) {
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Creates multiple signed URLs. Use a signed URL to share a file for a fixed amount of time.
       *
       * @param paths The file paths to be downloaded, including the current file names. For example `['folder/image.png', 'folder2/image2.png']`.
       * @param expiresIn The number of seconds until the signed URLs expire. For example, `60` for URLs which are valid for one minute.
       * @param options.download triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
       */
      createSignedUrls(paths, expiresIn, options2) {
        return __awaiter4(this, void 0, void 0, function* () {
          try {
            const data2 = yield post(this.fetch, `${this.url}/object/sign/${this.bucketId}`, { expiresIn, paths }, { headers: this.headers });
            const downloadQueryParam = (options2 === null || options2 === void 0 ? void 0 : options2.download) ? `&download=${options2.download === true ? "" : options2.download}` : "";
            return {
              data: data2.map((datum) => Object.assign(Object.assign({}, datum), { signedUrl: datum.signedURL ? encodeURI(`${this.url}${datum.signedURL}${downloadQueryParam}`) : null })),
              error: null
            };
          } catch (error) {
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Downloads a file from a private bucket. For public buckets, make a request to the URL returned from `getPublicUrl` instead.
       *
       * @param path The full path and file name of the file to be downloaded. For example `folder/image.png`.
       * @param options.transform Transform the asset before serving it to the client.
       */
      download(path, options2) {
        return __awaiter4(this, void 0, void 0, function* () {
          const wantsTransformation = typeof (options2 === null || options2 === void 0 ? void 0 : options2.transform) !== "undefined";
          const renderPath = wantsTransformation ? "render/image/authenticated" : "object";
          const transformationQuery = this.transformOptsToQueryString((options2 === null || options2 === void 0 ? void 0 : options2.transform) || {});
          const queryString = transformationQuery ? `?${transformationQuery}` : "";
          try {
            const _path = this._getFinalPath(path);
            const res = yield get2(this.fetch, `${this.url}/${renderPath}/${_path}${queryString}`, {
              headers: this.headers,
              noResolveJson: true
            });
            const data2 = yield res.blob();
            return { data: data2, error: null };
          } catch (error) {
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * A simple convenience function to get the URL for an asset in a public bucket. If you do not want to use this function, you can construct the public URL by concatenating the bucket URL with the path to the asset.
       * This function does not verify if the bucket is public. If a public URL is created for a bucket which is not public, you will not be able to download the asset.
       *
       * @param path The path and name of the file to generate the public URL for. For example `folder/image.png`.
       * @param options.download Triggers the file as a download if set to true. Set this parameter as the name of the file if you want to trigger the download with a different filename.
       * @param options.transform Transform the asset before serving it to the client.
       */
      getPublicUrl(path, options2) {
        const _path = this._getFinalPath(path);
        const _queryString = [];
        const downloadQueryParam = (options2 === null || options2 === void 0 ? void 0 : options2.download) ? `download=${options2.download === true ? "" : options2.download}` : "";
        if (downloadQueryParam !== "") {
          _queryString.push(downloadQueryParam);
        }
        const wantsTransformation = typeof (options2 === null || options2 === void 0 ? void 0 : options2.transform) !== "undefined";
        const renderPath = wantsTransformation ? "render/image" : "object";
        const transformationQuery = this.transformOptsToQueryString((options2 === null || options2 === void 0 ? void 0 : options2.transform) || {});
        if (transformationQuery !== "") {
          _queryString.push(transformationQuery);
        }
        let queryString = _queryString.join("&");
        if (queryString !== "") {
          queryString = `?${queryString}`;
        }
        return {
          data: { publicUrl: encodeURI(`${this.url}/${renderPath}/public/${_path}${queryString}`) }
        };
      }
      /**
       * Deletes files within the same bucket
       *
       * @param paths An array of files to delete, including the path and file name. For example [`'folder/image.png'`].
       */
      remove(paths) {
        return __awaiter4(this, void 0, void 0, function* () {
          try {
            const data2 = yield remove(this.fetch, `${this.url}/object/${this.bucketId}`, { prefixes: paths }, { headers: this.headers });
            return { data: data2, error: null };
          } catch (error) {
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Get file metadata
       * @param id the file id to retrieve metadata
       */
      // async getMetadata(
      //   id: string
      // ): Promise<
      //   | {
      //       data: Metadata
      //       error: null
      //     }
      //   | {
      //       data: null
      //       error: StorageError
      //     }
      // > {
      //   try {
      //     const data = await get(this.fetch, `${this.url}/metadata/${id}`, { headers: this.headers })
      //     return { data, error: null }
      //   } catch (error) {
      //     if (isStorageError(error)) {
      //       return { data: null, error }
      //     }
      //     throw error
      //   }
      // }
      /**
       * Update file metadata
       * @param id the file id to update metadata
       * @param meta the new file metadata
       */
      // async updateMetadata(
      //   id: string,
      //   meta: Metadata
      // ): Promise<
      //   | {
      //       data: Metadata
      //       error: null
      //     }
      //   | {
      //       data: null
      //       error: StorageError
      //     }
      // > {
      //   try {
      //     const data = await post(
      //       this.fetch,
      //       `${this.url}/metadata/${id}`,
      //       { ...meta },
      //       { headers: this.headers }
      //     )
      //     return { data, error: null }
      //   } catch (error) {
      //     if (isStorageError(error)) {
      //       return { data: null, error }
      //     }
      //     throw error
      //   }
      // }
      /**
       * Lists all the files within a bucket.
       * @param path The folder path.
       */
      list(path, options2, parameters) {
        return __awaiter4(this, void 0, void 0, function* () {
          try {
            const body2 = Object.assign(Object.assign(Object.assign({}, DEFAULT_SEARCH_OPTIONS), options2), { prefix: path || "" });
            const data2 = yield post(this.fetch, `${this.url}/object/list/${this.bucketId}`, body2, { headers: this.headers }, parameters);
            return { data: data2, error: null };
          } catch (error) {
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      _getFinalPath(path) {
        return `${this.bucketId}/${path}`;
      }
      _removeEmptyFolders(path) {
        return path.replace(/^\/|\/$/g, "").replace(/\/+/g, "/");
      }
      transformOptsToQueryString(transform) {
        const params = [];
        if (transform.width) {
          params.push(`width=${transform.width}`);
        }
        if (transform.height) {
          params.push(`height=${transform.height}`);
        }
        if (transform.resize) {
          params.push(`resize=${transform.resize}`);
        }
        if (transform.format) {
          params.push(`format=${transform.format}`);
        }
        if (transform.quality) {
          params.push(`quality=${transform.quality}`);
        }
        return params.join("&");
      }
    };
  }
});

// node_modules/@supabase/storage-js/dist/module/lib/version.js
var version3;
var init_version3 = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/version.js"() {
    version3 = "2.5.5";
  }
});

// node_modules/@supabase/storage-js/dist/module/lib/constants.js
var DEFAULT_HEADERS3;
var init_constants3 = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/constants.js"() {
    init_version3();
    DEFAULT_HEADERS3 = { "X-Client-Info": `storage-js/${version3}` };
  }
});

// node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js
var __awaiter5, StorageBucketApi;
var init_StorageBucketApi = __esm({
  "node_modules/@supabase/storage-js/dist/module/packages/StorageBucketApi.js"() {
    init_constants3();
    init_errors();
    init_fetch();
    init_helpers();
    __awaiter5 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P || (P = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    StorageBucketApi = class {
      constructor(url, headers2 = {}, fetch3) {
        this.url = url;
        this.headers = Object.assign(Object.assign({}, DEFAULT_HEADERS3), headers2);
        this.fetch = resolveFetch2(fetch3);
      }
      /**
       * Retrieves the details of all Storage buckets within an existing project.
       */
      listBuckets() {
        return __awaiter5(this, void 0, void 0, function* () {
          try {
            const data2 = yield get2(this.fetch, `${this.url}/bucket`, { headers: this.headers });
            return { data: data2, error: null };
          } catch (error) {
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Retrieves the details of an existing Storage bucket.
       *
       * @param id The unique identifier of the bucket you would like to retrieve.
       */
      getBucket(id) {
        return __awaiter5(this, void 0, void 0, function* () {
          try {
            const data2 = yield get2(this.fetch, `${this.url}/bucket/${id}`, { headers: this.headers });
            return { data: data2, error: null };
          } catch (error) {
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Creates a new Storage bucket
       *
       * @param id A unique identifier for the bucket you are creating.
       * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations. By default, buckets are private.
       * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
       * The global file size limit takes precedence over this value.
       * The default value is null, which doesn't set a per bucket file size limit.
       * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
       * The default value is null, which allows files with all mime types to be uploaded.
       * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
       * @returns newly created bucket id
       */
      createBucket(id, options2 = {
        public: false
      }) {
        return __awaiter5(this, void 0, void 0, function* () {
          try {
            const data2 = yield post(this.fetch, `${this.url}/bucket`, {
              id,
              name: id,
              public: options2.public,
              file_size_limit: options2.fileSizeLimit,
              allowed_mime_types: options2.allowedMimeTypes
            }, { headers: this.headers });
            return { data: data2, error: null };
          } catch (error) {
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Updates a Storage bucket
       *
       * @param id A unique identifier for the bucket you are updating.
       * @param options.public The visibility of the bucket. Public buckets don't require an authorization token to download objects, but still require a valid token for all other operations.
       * @param options.fileSizeLimit specifies the max file size in bytes that can be uploaded to this bucket.
       * The global file size limit takes precedence over this value.
       * The default value is null, which doesn't set a per bucket file size limit.
       * @param options.allowedMimeTypes specifies the allowed mime types that this bucket can accept during upload.
       * The default value is null, which allows files with all mime types to be uploaded.
       * Each mime type specified can be a wildcard, e.g. image/*, or a specific mime type, e.g. image/png.
       */
      updateBucket(id, options2) {
        return __awaiter5(this, void 0, void 0, function* () {
          try {
            const data2 = yield put(this.fetch, `${this.url}/bucket/${id}`, {
              id,
              name: id,
              public: options2.public,
              file_size_limit: options2.fileSizeLimit,
              allowed_mime_types: options2.allowedMimeTypes
            }, { headers: this.headers });
            return { data: data2, error: null };
          } catch (error) {
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Removes all objects inside a single bucket.
       *
       * @param id The unique identifier of the bucket you would like to empty.
       */
      emptyBucket(id) {
        return __awaiter5(this, void 0, void 0, function* () {
          try {
            const data2 = yield post(this.fetch, `${this.url}/bucket/${id}/empty`, {}, { headers: this.headers });
            return { data: data2, error: null };
          } catch (error) {
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * Deletes an existing bucket. A bucket can't be deleted with existing objects inside it.
       * You must first `empty()` the bucket.
       *
       * @param id The unique identifier of the bucket you would like to delete.
       */
      deleteBucket(id) {
        return __awaiter5(this, void 0, void 0, function* () {
          try {
            const data2 = yield remove(this.fetch, `${this.url}/bucket/${id}`, {}, { headers: this.headers });
            return { data: data2, error: null };
          } catch (error) {
            if (isStorageError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
    };
  }
});

// node_modules/@supabase/storage-js/dist/module/StorageClient.js
var StorageClient;
var init_StorageClient = __esm({
  "node_modules/@supabase/storage-js/dist/module/StorageClient.js"() {
    init_StorageFileApi();
    init_StorageBucketApi();
    StorageClient = class extends StorageBucketApi {
      constructor(url, headers2 = {}, fetch3) {
        super(url, headers2, fetch3);
      }
      /**
       * Perform file operation in a bucket.
       *
       * @param id The bucket id to operate on.
       */
      from(id) {
        return new StorageFileApi(this.url, this.headers, id, this.fetch);
      }
    };
  }
});

// node_modules/@supabase/storage-js/dist/module/lib/types.js
var init_types2 = __esm({
  "node_modules/@supabase/storage-js/dist/module/lib/types.js"() {
  }
});

// node_modules/@supabase/storage-js/dist/module/index.js
var init_module4 = __esm({
  "node_modules/@supabase/storage-js/dist/module/index.js"() {
    init_StorageClient();
    init_types2();
    init_errors();
  }
});

// node_modules/@supabase/supabase-js/dist/module/lib/version.js
var version4;
var init_version4 = __esm({
  "node_modules/@supabase/supabase-js/dist/module/lib/version.js"() {
    version4 = "2.39.7";
  }
});

// node_modules/@supabase/supabase-js/dist/module/lib/constants.js
var JS_ENV, DEFAULT_HEADERS4, DEFAULT_GLOBAL_OPTIONS, DEFAULT_DB_OPTIONS, DEFAULT_AUTH_OPTIONS, DEFAULT_REALTIME_OPTIONS;
var init_constants4 = __esm({
  "node_modules/@supabase/supabase-js/dist/module/lib/constants.js"() {
    init_version4();
    JS_ENV = "";
    if (typeof Deno !== "undefined") {
      JS_ENV = "deno";
    } else if (typeof document !== "undefined") {
      JS_ENV = "web";
    } else if (typeof navigator !== "undefined" && navigator.product === "ReactNative") {
      JS_ENV = "react-native";
    } else {
      JS_ENV = "node";
    }
    DEFAULT_HEADERS4 = { "X-Client-Info": `supabase-js-${JS_ENV}/${version4}` };
    DEFAULT_GLOBAL_OPTIONS = {
      headers: DEFAULT_HEADERS4
    };
    DEFAULT_DB_OPTIONS = {
      schema: "public"
    };
    DEFAULT_AUTH_OPTIONS = {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      flowType: "implicit"
    };
    DEFAULT_REALTIME_OPTIONS = {};
  }
});

// node_modules/@supabase/supabase-js/dist/module/lib/fetch.js
var __awaiter6, resolveFetch3, resolveHeadersConstructor, fetchWithAuth;
var init_fetch2 = __esm({
  "node_modules/@supabase/supabase-js/dist/module/lib/fetch.js"() {
    init_browser();
    __awaiter6 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P || (P = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    resolveFetch3 = (customFetch) => {
      let _fetch;
      if (customFetch) {
        _fetch = customFetch;
      } else if (typeof fetch === "undefined") {
        _fetch = browser_default;
      } else {
        _fetch = fetch;
      }
      return (...args) => _fetch(...args);
    };
    resolveHeadersConstructor = () => {
      if (typeof Headers === "undefined") {
        return Headers2;
      }
      return Headers;
    };
    fetchWithAuth = (supabaseKey, getAccessToken, customFetch) => {
      const fetch3 = resolveFetch3(customFetch);
      const HeadersConstructor = resolveHeadersConstructor();
      return (input, init2) => __awaiter6(void 0, void 0, void 0, function* () {
        var _a;
        const accessToken = (_a = yield getAccessToken()) !== null && _a !== void 0 ? _a : supabaseKey;
        let headers2 = new HeadersConstructor(init2 === null || init2 === void 0 ? void 0 : init2.headers);
        if (!headers2.has("apikey")) {
          headers2.set("apikey", supabaseKey);
        }
        if (!headers2.has("Authorization")) {
          headers2.set("Authorization", `Bearer ${accessToken}`);
        }
        return fetch3(input, Object.assign(Object.assign({}, init2), { headers: headers2 }));
      });
    };
  }
});

// node_modules/@supabase/supabase-js/dist/module/lib/helpers.js
function stripTrailingSlash(url) {
  return url.replace(/\/$/, "");
}
function applySettingDefaults(options2, defaults2) {
  const { db: dbOptions, auth: authOptions, realtime: realtimeOptions, global: globalOptions } = options2;
  const { db: DEFAULT_DB_OPTIONS2, auth: DEFAULT_AUTH_OPTIONS2, realtime: DEFAULT_REALTIME_OPTIONS2, global: DEFAULT_GLOBAL_OPTIONS2 } = defaults2;
  return {
    db: Object.assign(Object.assign({}, DEFAULT_DB_OPTIONS2), dbOptions),
    auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS2), authOptions),
    realtime: Object.assign(Object.assign({}, DEFAULT_REALTIME_OPTIONS2), realtimeOptions),
    global: Object.assign(Object.assign({}, DEFAULT_GLOBAL_OPTIONS2), globalOptions)
  };
}
var init_helpers2 = __esm({
  "node_modules/@supabase/supabase-js/dist/module/lib/helpers.js"() {
  }
});

// node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js
function expiresAt(expiresIn) {
  const timeNow = Math.round(Date.now() / 1e3);
  return timeNow + expiresIn;
}
function uuid() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    const r2 = Math.random() * 16 | 0, v = c == "x" ? r2 : r2 & 3 | 8;
    return v.toString(16);
  });
}
function parseParametersFromURL(href) {
  const result = {};
  const url = new URL(href);
  if (url.hash && url.hash[0] === "#") {
    try {
      const hashSearchParams = new URLSearchParams(url.hash.substring(1));
      hashSearchParams.forEach((value, key2) => {
        result[key2] = value;
      });
    } catch (e) {
    }
  }
  url.searchParams.forEach((value, key2) => {
    result[key2] = value;
  });
  return result;
}
function decodeBase64URL(value) {
  const key2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let base642 = "";
  let chr1, chr2, chr3;
  let enc1, enc2, enc3, enc4;
  let i2 = 0;
  value = value.replace("-", "+").replace("_", "/");
  while (i2 < value.length) {
    enc1 = key2.indexOf(value.charAt(i2++));
    enc2 = key2.indexOf(value.charAt(i2++));
    enc3 = key2.indexOf(value.charAt(i2++));
    enc4 = key2.indexOf(value.charAt(i2++));
    chr1 = enc1 << 2 | enc2 >> 4;
    chr2 = (enc2 & 15) << 4 | enc3 >> 2;
    chr3 = (enc3 & 3) << 6 | enc4;
    base642 = base642 + String.fromCharCode(chr1);
    if (enc3 != 64 && chr2 != 0) {
      base642 = base642 + String.fromCharCode(chr2);
    }
    if (enc4 != 64 && chr3 != 0) {
      base642 = base642 + String.fromCharCode(chr3);
    }
  }
  return base642;
}
function decodeJWTPayload(token) {
  const base64UrlRegex = /^([a-z0-9_-]{4})*($|[a-z0-9_-]{3}=?$|[a-z0-9_-]{2}(==)?$)$/i;
  const parts = token.split(".");
  if (parts.length !== 3) {
    throw new Error("JWT is not valid: not a JWT structure");
  }
  if (!base64UrlRegex.test(parts[1])) {
    throw new Error("JWT is not valid: payload is not in base64url format");
  }
  const base64Url = parts[1];
  return JSON.parse(decodeBase64URL(base64Url));
}
async function sleep(time) {
  return await new Promise((accept) => {
    setTimeout(() => accept(null), time);
  });
}
function retryable(fn, isRetryable) {
  const promise = new Promise((accept, reject) => {
    ;
    (async () => {
      for (let attempt = 0; attempt < Infinity; attempt++) {
        try {
          const result = await fn(attempt);
          if (!isRetryable(attempt, null, result)) {
            accept(result);
            return;
          }
        } catch (e) {
          if (!isRetryable(attempt, e)) {
            reject(e);
            return;
          }
        }
      }
    })();
  });
  return promise;
}
function dec2hex(dec) {
  return ("0" + dec.toString(16)).substr(-2);
}
function generatePKCEVerifier() {
  const verifierLength = 56;
  const array2 = new Uint32Array(verifierLength);
  if (typeof crypto === "undefined") {
    const charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    const charSetLen = charSet.length;
    let verifier = "";
    for (let i2 = 0; i2 < verifierLength; i2++) {
      verifier += charSet.charAt(Math.floor(Math.random() * charSetLen));
    }
    return verifier;
  }
  crypto.getRandomValues(array2);
  return Array.from(array2, dec2hex).join("");
}
async function sha256(randomString) {
  const encoder3 = new TextEncoder();
  const encodedData = encoder3.encode(randomString);
  const hash2 = await crypto.subtle.digest("SHA-256", encodedData);
  const bytes = new Uint8Array(hash2);
  return Array.from(bytes).map((c) => String.fromCharCode(c)).join("");
}
function base64urlencode(str) {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
async function generatePKCEChallenge(verifier) {
  const hasCryptoSupport = typeof crypto !== "undefined" && typeof crypto.subtle !== "undefined" && typeof TextEncoder !== "undefined";
  if (!hasCryptoSupport) {
    console.warn("WebCrypto API is not supported. Code challenge method will default to use plain instead of sha256.");
    return verifier;
  }
  const hashed = await sha256(verifier);
  return base64urlencode(hashed);
}
var isBrowser, localStorageWriteTests, supportsLocalStorage, resolveFetch4, looksLikeFetchResponse, setItemAsync, getItemAsync, removeItemAsync, Deferred;
var init_helpers3 = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/lib/helpers.js"() {
    isBrowser = () => typeof document !== "undefined";
    localStorageWriteTests = {
      tested: false,
      writable: false
    };
    supportsLocalStorage = () => {
      if (!isBrowser()) {
        return false;
      }
      try {
        if (typeof globalThis.localStorage !== "object") {
          return false;
        }
      } catch (e) {
        return false;
      }
      if (localStorageWriteTests.tested) {
        return localStorageWriteTests.writable;
      }
      const randomKey = `lswt-${Math.random()}${Math.random()}`;
      try {
        globalThis.localStorage.setItem(randomKey, randomKey);
        globalThis.localStorage.removeItem(randomKey);
        localStorageWriteTests.tested = true;
        localStorageWriteTests.writable = true;
      } catch (e) {
        localStorageWriteTests.tested = true;
        localStorageWriteTests.writable = false;
      }
      return localStorageWriteTests.writable;
    };
    resolveFetch4 = (customFetch) => {
      let _fetch;
      if (customFetch) {
        _fetch = customFetch;
      } else if (typeof fetch === "undefined") {
        _fetch = (...args) => Promise.resolve().then(() => (init_browser(), browser_exports)).then(({ default: fetch3 }) => fetch3(...args));
      } else {
        _fetch = fetch;
      }
      return (...args) => _fetch(...args);
    };
    looksLikeFetchResponse = (maybeResponse) => {
      return typeof maybeResponse === "object" && maybeResponse !== null && "status" in maybeResponse && "ok" in maybeResponse && "json" in maybeResponse && typeof maybeResponse.json === "function";
    };
    setItemAsync = async (storage, key2, data2) => {
      await storage.setItem(key2, JSON.stringify(data2));
    };
    getItemAsync = async (storage, key2) => {
      const value = await storage.getItem(key2);
      if (!value) {
        return null;
      }
      try {
        return JSON.parse(value);
      } catch (_a) {
        return value;
      }
    };
    removeItemAsync = async (storage, key2) => {
      await storage.removeItem(key2);
    };
    Deferred = class _Deferred {
      constructor() {
        ;
        this.promise = new _Deferred.promiseConstructor((res, rej) => {
          ;
          this.resolve = res;
          this.reject = rej;
        });
      }
    };
    Deferred.promiseConstructor = Promise;
  }
});

// node_modules/@supabase/gotrue-js/dist/module/lib/errors.js
function isAuthError(error) {
  return typeof error === "object" && error !== null && "__isAuthError" in error;
}
function isAuthApiError(error) {
  return isAuthError(error) && error.name === "AuthApiError";
}
function isAuthRetryableFetchError(error) {
  return isAuthError(error) && error.name === "AuthRetryableFetchError";
}
var AuthError, AuthApiError, AuthUnknownError, CustomAuthError, AuthSessionMissingError, AuthInvalidTokenResponseError, AuthInvalidCredentialsError, AuthImplicitGrantRedirectError, AuthPKCEGrantCodeExchangeError, AuthRetryableFetchError, AuthWeakPasswordError;
var init_errors2 = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/lib/errors.js"() {
    AuthError = class extends Error {
      constructor(message, status) {
        super(message);
        this.__isAuthError = true;
        this.name = "AuthError";
        this.status = status;
      }
    };
    AuthApiError = class extends AuthError {
      constructor(message, status) {
        super(message, status);
        this.name = "AuthApiError";
        this.status = status;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status
        };
      }
    };
    AuthUnknownError = class extends AuthError {
      constructor(message, originalError) {
        super(message);
        this.name = "AuthUnknownError";
        this.originalError = originalError;
      }
    };
    CustomAuthError = class extends AuthError {
      constructor(message, name, status) {
        super(message);
        this.name = name;
        this.status = status;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status
        };
      }
    };
    AuthSessionMissingError = class extends CustomAuthError {
      constructor() {
        super("Auth session missing!", "AuthSessionMissingError", 400);
      }
    };
    AuthInvalidTokenResponseError = class extends CustomAuthError {
      constructor() {
        super("Auth session or user missing", "AuthInvalidTokenResponseError", 500);
      }
    };
    AuthInvalidCredentialsError = class extends CustomAuthError {
      constructor(message) {
        super(message, "AuthInvalidCredentialsError", 400);
      }
    };
    AuthImplicitGrantRedirectError = class extends CustomAuthError {
      constructor(message, details = null) {
        super(message, "AuthImplicitGrantRedirectError", 500);
        this.details = null;
        this.details = details;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status,
          details: this.details
        };
      }
    };
    AuthPKCEGrantCodeExchangeError = class extends CustomAuthError {
      constructor(message, details = null) {
        super(message, "AuthPKCEGrantCodeExchangeError", 500);
        this.details = null;
        this.details = details;
      }
      toJSON() {
        return {
          name: this.name,
          message: this.message,
          status: this.status,
          details: this.details
        };
      }
    };
    AuthRetryableFetchError = class extends CustomAuthError {
      constructor(message, status) {
        super(message, "AuthRetryableFetchError", status);
      }
    };
    AuthWeakPasswordError = class extends CustomAuthError {
      constructor(message, status, reasons) {
        super(message, "AuthWeakPasswordError", status);
        this.reasons = reasons;
      }
    };
  }
});

// node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js
async function handleError2(error) {
  if (!looksLikeFetchResponse(error)) {
    throw new AuthRetryableFetchError(_getErrorMessage2(error), 0);
  }
  if (NETWORK_ERROR_CODES.includes(error.status)) {
    throw new AuthRetryableFetchError(_getErrorMessage2(error), error.status);
  }
  let data2;
  try {
    data2 = await error.json();
  } catch (e) {
    throw new AuthUnknownError(_getErrorMessage2(e), e);
  }
  if (typeof data2 === "object" && data2 && typeof data2.weak_password === "object" && data2.weak_password && Array.isArray(data2.weak_password.reasons) && data2.weak_password.reasons.length && data2.weak_password.reasons.reduce((a2, i2) => a2 && typeof i2 === "string", true)) {
    throw new AuthWeakPasswordError(_getErrorMessage2(data2), error.status, data2.weak_password.reasons);
  }
  throw new AuthApiError(_getErrorMessage2(data2), error.status || 500);
}
async function _request(fetcher, method, url, options2) {
  var _a;
  const headers2 = Object.assign({}, options2 === null || options2 === void 0 ? void 0 : options2.headers);
  if (options2 === null || options2 === void 0 ? void 0 : options2.jwt) {
    headers2["Authorization"] = `Bearer ${options2.jwt}`;
  }
  const qs = (_a = options2 === null || options2 === void 0 ? void 0 : options2.query) !== null && _a !== void 0 ? _a : {};
  if (options2 === null || options2 === void 0 ? void 0 : options2.redirectTo) {
    qs["redirect_to"] = options2.redirectTo;
  }
  const queryString = Object.keys(qs).length ? "?" + new URLSearchParams(qs).toString() : "";
  const data2 = await _handleRequest2(fetcher, method, url + queryString, { headers: headers2, noResolveJson: options2 === null || options2 === void 0 ? void 0 : options2.noResolveJson }, {}, options2 === null || options2 === void 0 ? void 0 : options2.body);
  return (options2 === null || options2 === void 0 ? void 0 : options2.xform) ? options2 === null || options2 === void 0 ? void 0 : options2.xform(data2) : { data: Object.assign({}, data2), error: null };
}
async function _handleRequest2(fetcher, method, url, options2, parameters, body2) {
  const requestParams = _getRequestParams2(method, options2, parameters, body2);
  let result;
  try {
    result = await fetcher(url, requestParams);
  } catch (e) {
    console.error(e);
    throw new AuthRetryableFetchError(_getErrorMessage2(e), 0);
  }
  if (!result.ok) {
    await handleError2(result);
  }
  if (options2 === null || options2 === void 0 ? void 0 : options2.noResolveJson) {
    return result;
  }
  try {
    return await result.json();
  } catch (e) {
    await handleError2(e);
  }
}
function _sessionResponse(data2) {
  var _a;
  let session = null;
  if (hasSession(data2)) {
    session = Object.assign({}, data2);
    if (!data2.expires_at) {
      session.expires_at = expiresAt(data2.expires_in);
    }
  }
  const user = (_a = data2.user) !== null && _a !== void 0 ? _a : data2;
  return { data: { session, user }, error: null };
}
function _sessionResponsePassword(data2) {
  const response = _sessionResponse(data2);
  if (!response.error && data2.weak_password && typeof data2.weak_password === "object" && Array.isArray(data2.weak_password.reasons) && data2.weak_password.reasons.length && data2.weak_password.message && typeof data2.weak_password.message === "string" && data2.weak_password.reasons.reduce((a2, i2) => a2 && typeof i2 === "string", true)) {
    response.data.weak_password = data2.weak_password;
  }
  return response;
}
function _userResponse(data2) {
  var _a;
  const user = (_a = data2.user) !== null && _a !== void 0 ? _a : data2;
  return { data: { user }, error: null };
}
function _ssoResponse(data2) {
  return { data: data2, error: null };
}
function _generateLinkResponse(data2) {
  const { action_link, email_otp, hashed_token, redirect_to, verification_type } = data2, rest = __rest(data2, ["action_link", "email_otp", "hashed_token", "redirect_to", "verification_type"]);
  const properties = {
    action_link,
    email_otp,
    hashed_token,
    redirect_to,
    verification_type
  };
  const user = Object.assign({}, rest);
  return {
    data: {
      properties,
      user
    },
    error: null
  };
}
function _noResolveJsonResponse(data2) {
  return data2;
}
function hasSession(data2) {
  return data2.access_token && data2.refresh_token && data2.expires_in;
}
var __rest, _getErrorMessage2, NETWORK_ERROR_CODES, _getRequestParams2;
var init_fetch3 = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/lib/fetch.js"() {
    init_helpers3();
    init_errors2();
    __rest = function(s2, e) {
      var t = {};
      for (var p2 in s2)
        if (Object.prototype.hasOwnProperty.call(s2, p2) && e.indexOf(p2) < 0)
          t[p2] = s2[p2];
      if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
          if (e.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2]))
            t[p2[i2]] = s2[p2[i2]];
        }
      return t;
    };
    _getErrorMessage2 = (err) => err.msg || err.message || err.error_description || err.error || JSON.stringify(err);
    NETWORK_ERROR_CODES = [502, 503, 504];
    _getRequestParams2 = (method, options2, parameters, body2) => {
      const params = { method, headers: (options2 === null || options2 === void 0 ? void 0 : options2.headers) || {} };
      if (method === "GET") {
        return params;
      }
      params.headers = Object.assign({ "Content-Type": "application/json;charset=UTF-8" }, options2 === null || options2 === void 0 ? void 0 : options2.headers);
      params.body = JSON.stringify(body2);
      return Object.assign(Object.assign({}, params), parameters);
    };
  }
});

// node_modules/@supabase/gotrue-js/dist/module/GoTrueAdminApi.js
var __rest2, GoTrueAdminApi;
var init_GoTrueAdminApi = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/GoTrueAdminApi.js"() {
    init_fetch3();
    init_helpers3();
    init_errors2();
    __rest2 = function(s2, e) {
      var t = {};
      for (var p2 in s2)
        if (Object.prototype.hasOwnProperty.call(s2, p2) && e.indexOf(p2) < 0)
          t[p2] = s2[p2];
      if (s2 != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i2 = 0, p2 = Object.getOwnPropertySymbols(s2); i2 < p2.length; i2++) {
          if (e.indexOf(p2[i2]) < 0 && Object.prototype.propertyIsEnumerable.call(s2, p2[i2]))
            t[p2[i2]] = s2[p2[i2]];
        }
      return t;
    };
    GoTrueAdminApi = class {
      constructor({ url = "", headers: headers2 = {}, fetch: fetch3 }) {
        this.url = url;
        this.headers = headers2;
        this.fetch = resolveFetch4(fetch3);
        this.mfa = {
          listFactors: this._listFactors.bind(this),
          deleteFactor: this._deleteFactor.bind(this)
        };
      }
      /**
       * Removes a logged-in session.
       * @param jwt A valid, logged-in JWT.
       * @param scope The logout sope.
       */
      async signOut(jwt, scope = "global") {
        try {
          await _request(this.fetch, "POST", `${this.url}/logout?scope=${scope}`, {
            headers: this.headers,
            jwt,
            noResolveJson: true
          });
          return { data: null, error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      /**
       * Sends an invite link to an email address.
       * @param email The email address of the user.
       * @param options Additional options to be included when inviting.
       */
      async inviteUserByEmail(email, options2 = {}) {
        try {
          return await _request(this.fetch, "POST", `${this.url}/invite`, {
            body: { email, data: options2.data },
            headers: this.headers,
            redirectTo: options2.redirectTo,
            xform: _userResponse
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null }, error };
          }
          throw error;
        }
      }
      /**
       * Generates email links and OTPs to be sent via a custom email provider.
       * @param email The user's email.
       * @param options.password User password. For signup only.
       * @param options.data Optional user metadata. For signup only.
       * @param options.redirectTo The redirect url which should be appended to the generated link
       */
      async generateLink(params) {
        try {
          const { options: options2 } = params, rest = __rest2(params, ["options"]);
          const body2 = Object.assign(Object.assign({}, rest), options2);
          if ("newEmail" in rest) {
            body2.new_email = rest === null || rest === void 0 ? void 0 : rest.newEmail;
            delete body2["newEmail"];
          }
          return await _request(this.fetch, "POST", `${this.url}/admin/generate_link`, {
            body: body2,
            headers: this.headers,
            xform: _generateLinkResponse,
            redirectTo: options2 === null || options2 === void 0 ? void 0 : options2.redirectTo
          });
        } catch (error) {
          if (isAuthError(error)) {
            return {
              data: {
                properties: null,
                user: null
              },
              error
            };
          }
          throw error;
        }
      }
      // User Admin API
      /**
       * Creates a new user.
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       */
      async createUser(attributes) {
        try {
          return await _request(this.fetch, "POST", `${this.url}/admin/users`, {
            body: attributes,
            headers: this.headers,
            xform: _userResponse
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null }, error };
          }
          throw error;
        }
      }
      /**
       * Get a list of users.
       *
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       * @param params An object which supports `page` and `perPage` as numbers, to alter the paginated results.
       */
      async listUsers(params) {
        var _a, _b, _c, _d, _e, _f, _g;
        try {
          const pagination = { nextPage: null, lastPage: 0, total: 0 };
          const response = await _request(this.fetch, "GET", `${this.url}/admin/users`, {
            headers: this.headers,
            noResolveJson: true,
            query: {
              page: (_b = (_a = params === null || params === void 0 ? void 0 : params.page) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "",
              per_page: (_d = (_c = params === null || params === void 0 ? void 0 : params.perPage) === null || _c === void 0 ? void 0 : _c.toString()) !== null && _d !== void 0 ? _d : ""
            },
            xform: _noResolveJsonResponse
          });
          if (response.error)
            throw response.error;
          const users = await response.json();
          const total = (_e = response.headers.get("x-total-count")) !== null && _e !== void 0 ? _e : 0;
          const links = (_g = (_f = response.headers.get("link")) === null || _f === void 0 ? void 0 : _f.split(",")) !== null && _g !== void 0 ? _g : [];
          if (links.length > 0) {
            links.forEach((link) => {
              const page2 = parseInt(link.split(";")[0].split("=")[1].substring(0, 1));
              const rel = JSON.parse(link.split(";")[1].split("=")[1]);
              pagination[`${rel}Page`] = page2;
            });
            pagination.total = parseInt(total);
          }
          return { data: Object.assign(Object.assign({}, users), pagination), error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { users: [] }, error };
          }
          throw error;
        }
      }
      /**
       * Get user by id.
       *
       * @param uid The user's unique identifier
       *
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       */
      async getUserById(uid) {
        try {
          return await _request(this.fetch, "GET", `${this.url}/admin/users/${uid}`, {
            headers: this.headers,
            xform: _userResponse
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null }, error };
          }
          throw error;
        }
      }
      /**
       * Updates the user data.
       *
       * @param attributes The data you want to update.
       *
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       */
      async updateUserById(uid, attributes) {
        try {
          return await _request(this.fetch, "PUT", `${this.url}/admin/users/${uid}`, {
            body: attributes,
            headers: this.headers,
            xform: _userResponse
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null }, error };
          }
          throw error;
        }
      }
      /**
       * Delete a user. Requires a `service_role` key.
       *
       * @param id The user id you want to remove.
       * @param shouldSoftDelete If true, then the user will be soft-deleted (setting `deleted_at` to the current timestamp and disabling their account while preserving their data) from the auth schema.
       * Defaults to false for backward compatibility.
       *
       * This function should only be called on a server. Never expose your `service_role` key in the browser.
       */
      async deleteUser(id, shouldSoftDelete = false) {
        try {
          return await _request(this.fetch, "DELETE", `${this.url}/admin/users/${id}`, {
            headers: this.headers,
            body: {
              should_soft_delete: shouldSoftDelete
            },
            xform: _userResponse
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null }, error };
          }
          throw error;
        }
      }
      async _listFactors(params) {
        try {
          const { data: data2, error } = await _request(this.fetch, "GET", `${this.url}/admin/users/${params.userId}/factors`, {
            headers: this.headers,
            xform: (factors) => {
              return { data: { factors }, error: null };
            }
          });
          return { data: data2, error };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      async _deleteFactor(params) {
        try {
          const data2 = await _request(this.fetch, "DELETE", `${this.url}/admin/users/${params.userId}/factors/${params.id}`, {
            headers: this.headers
          });
          return { data: data2, error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
    };
  }
});

// node_modules/@supabase/gotrue-js/dist/module/lib/version.js
var version5;
var init_version5 = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/lib/version.js"() {
    version5 = "0.0.0";
  }
});

// node_modules/@supabase/gotrue-js/dist/module/lib/constants.js
var GOTRUE_URL, STORAGE_KEY, DEFAULT_HEADERS5, EXPIRY_MARGIN;
var init_constants5 = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/lib/constants.js"() {
    init_version5();
    GOTRUE_URL = "http://localhost:9999";
    STORAGE_KEY = "supabase.auth.token";
    DEFAULT_HEADERS5 = { "X-Client-Info": `gotrue-js/${version5}` };
    EXPIRY_MARGIN = 10;
  }
});

// node_modules/@supabase/gotrue-js/dist/module/lib/local-storage.js
function memoryLocalStorageAdapter(store = {}) {
  return {
    getItem: (key2) => {
      return store[key2] || null;
    },
    setItem: (key2, value) => {
      store[key2] = value;
    },
    removeItem: (key2) => {
      delete store[key2];
    }
  };
}
var localStorageAdapter;
var init_local_storage = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/lib/local-storage.js"() {
    init_helpers3();
    localStorageAdapter = {
      getItem: (key2) => {
        if (!supportsLocalStorage()) {
          return null;
        }
        return globalThis.localStorage.getItem(key2);
      },
      setItem: (key2, value) => {
        if (!supportsLocalStorage()) {
          return;
        }
        globalThis.localStorage.setItem(key2, value);
      },
      removeItem: (key2) => {
        if (!supportsLocalStorage()) {
          return;
        }
        globalThis.localStorage.removeItem(key2);
      }
    };
  }
});

// node_modules/@supabase/gotrue-js/dist/module/lib/polyfills.js
function polyfillGlobalThis() {
  if (typeof globalThis === "object")
    return;
  try {
    Object.defineProperty(Object.prototype, "__magic__", {
      get: function() {
        return this;
      },
      configurable: true
    });
    __magic__.globalThis = __magic__;
    delete Object.prototype.__magic__;
  } catch (e) {
    if (typeof self !== "undefined") {
      self.globalThis = self;
    }
  }
}
var init_polyfills = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/lib/polyfills.js"() {
  }
});

// node_modules/@supabase/gotrue-js/dist/module/lib/locks.js
async function navigatorLock(name, acquireTimeout, fn) {
  if (internals.debug) {
    console.log("@supabase/gotrue-js: navigatorLock: acquire lock", name, acquireTimeout);
  }
  const abortController = new globalThis.AbortController();
  if (acquireTimeout > 0) {
    setTimeout(() => {
      abortController.abort();
      if (internals.debug) {
        console.log("@supabase/gotrue-js: navigatorLock acquire timed out", name);
      }
    }, acquireTimeout);
  }
  return await globalThis.navigator.locks.request(name, acquireTimeout === 0 ? {
    mode: "exclusive",
    ifAvailable: true
  } : {
    mode: "exclusive",
    signal: abortController.signal
  }, async (lock) => {
    if (lock) {
      if (internals.debug) {
        console.log("@supabase/gotrue-js: navigatorLock: acquired", name, lock.name);
      }
      try {
        return await fn();
      } finally {
        if (internals.debug) {
          console.log("@supabase/gotrue-js: navigatorLock: released", name, lock.name);
        }
      }
    } else {
      if (acquireTimeout === 0) {
        if (internals.debug) {
          console.log("@supabase/gotrue-js: navigatorLock: not immediately available", name);
        }
        throw new NavigatorLockAcquireTimeoutError(`Acquiring an exclusive Navigator LockManager lock "${name}" immediately failed`);
      } else {
        if (internals.debug) {
          try {
            const result = await globalThis.navigator.locks.query();
            console.log("@supabase/gotrue-js: Navigator LockManager state", JSON.stringify(result, null, "  "));
          } catch (e) {
            console.warn("@supabase/gotrue-js: Error when querying Navigator LockManager state", e);
          }
        }
        console.warn("@supabase/gotrue-js: Navigator LockManager returned a null lock when using #request without ifAvailable set to true, it appears this browser is not following the LockManager spec https://developer.mozilla.org/en-US/docs/Web/API/LockManager/request");
        return await fn();
      }
    }
  });
}
var internals, LockAcquireTimeoutError, NavigatorLockAcquireTimeoutError;
var init_locks = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/lib/locks.js"() {
    init_helpers3();
    internals = {
      /**
       * @experimental
       */
      debug: !!(globalThis && supportsLocalStorage() && globalThis.localStorage && globalThis.localStorage.getItem("supabase.gotrue-js.locks.debug") === "true")
    };
    LockAcquireTimeoutError = class extends Error {
      constructor(message) {
        super(message);
        this.isAcquireTimeout = true;
      }
    };
    NavigatorLockAcquireTimeoutError = class extends LockAcquireTimeoutError {
    };
  }
});

// node_modules/@supabase/gotrue-js/dist/module/GoTrueClient.js
async function lockNoOp(name, acquireTimeout, fn) {
  return await fn();
}
var DEFAULT_OPTIONS, AUTO_REFRESH_TICK_DURATION, AUTO_REFRESH_TICK_THRESHOLD, GoTrueClient;
var init_GoTrueClient = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/GoTrueClient.js"() {
    init_GoTrueAdminApi();
    init_constants5();
    init_errors2();
    init_fetch3();
    init_helpers3();
    init_local_storage();
    init_polyfills();
    init_version5();
    init_locks();
    polyfillGlobalThis();
    DEFAULT_OPTIONS = {
      url: GOTRUE_URL,
      storageKey: STORAGE_KEY,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
      headers: DEFAULT_HEADERS5,
      flowType: "implicit",
      debug: false
    };
    AUTO_REFRESH_TICK_DURATION = 30 * 1e3;
    AUTO_REFRESH_TICK_THRESHOLD = 3;
    GoTrueClient = class _GoTrueClient {
      /**
       * Create a new client for use in the browser.
       */
      constructor(options2) {
        var _a, _b;
        this.memoryStorage = null;
        this.stateChangeEmitters = /* @__PURE__ */ new Map();
        this.autoRefreshTicker = null;
        this.visibilityChangedCallback = null;
        this.refreshingDeferred = null;
        this.initializePromise = null;
        this.detectSessionInUrl = true;
        this.lockAcquired = false;
        this.pendingInLock = [];
        this.broadcastChannel = null;
        this.logger = console.log;
        this.instanceID = _GoTrueClient.nextInstanceID;
        _GoTrueClient.nextInstanceID += 1;
        if (this.instanceID > 0 && isBrowser()) {
          console.warn("Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produce undefined behavior when used concurrently under the same storage key.");
        }
        const settings = Object.assign(Object.assign({}, DEFAULT_OPTIONS), options2);
        this.logDebugMessages = !!settings.debug;
        if (typeof settings.debug === "function") {
          this.logger = settings.debug;
        }
        this.persistSession = settings.persistSession;
        this.storageKey = settings.storageKey;
        this.autoRefreshToken = settings.autoRefreshToken;
        this.admin = new GoTrueAdminApi({
          url: settings.url,
          headers: settings.headers,
          fetch: settings.fetch
        });
        this.url = settings.url;
        this.headers = settings.headers;
        this.fetch = resolveFetch4(settings.fetch);
        this.lock = settings.lock || lockNoOp;
        this.detectSessionInUrl = settings.detectSessionInUrl;
        this.flowType = settings.flowType;
        if (settings.lock) {
          this.lock = settings.lock;
        } else if (isBrowser() && ((_a = globalThis === null || globalThis === void 0 ? void 0 : globalThis.navigator) === null || _a === void 0 ? void 0 : _a.locks)) {
          this.lock = navigatorLock;
        } else {
          this.lock = lockNoOp;
        }
        this.mfa = {
          verify: this._verify.bind(this),
          enroll: this._enroll.bind(this),
          unenroll: this._unenroll.bind(this),
          challenge: this._challenge.bind(this),
          listFactors: this._listFactors.bind(this),
          challengeAndVerify: this._challengeAndVerify.bind(this),
          getAuthenticatorAssuranceLevel: this._getAuthenticatorAssuranceLevel.bind(this)
        };
        if (this.persistSession) {
          if (settings.storage) {
            this.storage = settings.storage;
          } else {
            if (supportsLocalStorage()) {
              this.storage = localStorageAdapter;
            } else {
              this.memoryStorage = {};
              this.storage = memoryLocalStorageAdapter(this.memoryStorage);
            }
          }
        } else {
          this.memoryStorage = {};
          this.storage = memoryLocalStorageAdapter(this.memoryStorage);
        }
        if (isBrowser() && globalThis.BroadcastChannel && this.persistSession && this.storageKey) {
          try {
            this.broadcastChannel = new globalThis.BroadcastChannel(this.storageKey);
          } catch (e) {
            console.error("Failed to create a new BroadcastChannel, multi-tab state changes will not be available", e);
          }
          (_b = this.broadcastChannel) === null || _b === void 0 ? void 0 : _b.addEventListener("message", async (event) => {
            this._debug("received broadcast notification from other tab or client", event);
            await this._notifyAllSubscribers(event.data.event, event.data.session, false);
          });
        }
        this.initialize();
      }
      _debug(...args) {
        if (this.logDebugMessages) {
          this.logger(`GoTrueClient@${this.instanceID} (${version5}) ${(/* @__PURE__ */ new Date()).toISOString()}`, ...args);
        }
        return this;
      }
      /**
       * Initializes the client session either from the url or from storage.
       * This method is automatically called when instantiating the client, but should also be called
       * manually when checking for an error from an auth redirect (oauth, magiclink, password recovery, etc).
       */
      async initialize() {
        if (this.initializePromise) {
          return await this.initializePromise;
        }
        this.initializePromise = (async () => {
          return await this._acquireLock(-1, async () => {
            return await this._initialize();
          });
        })();
        return await this.initializePromise;
      }
      /**
       * IMPORTANT:
       * 1. Never throw in this method, as it is called from the constructor
       * 2. Never return a session from this method as it would be cached over
       *    the whole lifetime of the client
       */
      async _initialize() {
        try {
          const isPKCEFlow = isBrowser() ? await this._isPKCEFlow() : false;
          this._debug("#_initialize()", "begin", "is PKCE flow", isPKCEFlow);
          if (isPKCEFlow || this.detectSessionInUrl && this._isImplicitGrantFlow()) {
            const { data: data2, error } = await this._getSessionFromURL(isPKCEFlow);
            if (error) {
              this._debug("#_initialize()", "error detecting session from URL", error);
              if ((error === null || error === void 0 ? void 0 : error.message) === "Identity is already linked" || (error === null || error === void 0 ? void 0 : error.message) === "Identity is already linked to another user") {
                return { error };
              }
              await this._removeSession();
              return { error };
            }
            const { session, redirectType } = data2;
            this._debug("#_initialize()", "detected session in URL", session, "redirect type", redirectType);
            await this._saveSession(session);
            setTimeout(async () => {
              if (redirectType === "recovery") {
                await this._notifyAllSubscribers("PASSWORD_RECOVERY", session);
              } else {
                await this._notifyAllSubscribers("SIGNED_IN", session);
              }
            }, 0);
            return { error: null };
          }
          await this._recoverAndRefresh();
          return { error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { error };
          }
          return {
            error: new AuthUnknownError("Unexpected error during initialization", error)
          };
        } finally {
          await this._handleVisibilityChange();
          this._debug("#_initialize()", "end");
        }
      }
      /**
       * Creates a new user.
       *
       * Be aware that if a user account exists in the system you may get back an
       * error message that attempts to hide this information from the user.
       * This method has support for PKCE via email signups. The PKCE flow cannot be used when autoconfirm is enabled.
       *
       * @returns A logged-in session if the server has "autoconfirm" ON
       * @returns A user if the server has "autoconfirm" OFF
       */
      async signUp(credentials) {
        var _a, _b, _c;
        try {
          await this._removeSession();
          let res;
          if ("email" in credentials) {
            const { email, password, options: options2 } = credentials;
            let codeChallenge = null;
            let codeChallengeMethod = null;
            if (this.flowType === "pkce") {
              const codeVerifier = generatePKCEVerifier();
              await setItemAsync(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
              codeChallenge = await generatePKCEChallenge(codeVerifier);
              codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
            }
            res = await _request(this.fetch, "POST", `${this.url}/signup`, {
              headers: this.headers,
              redirectTo: options2 === null || options2 === void 0 ? void 0 : options2.emailRedirectTo,
              body: {
                email,
                password,
                data: (_a = options2 === null || options2 === void 0 ? void 0 : options2.data) !== null && _a !== void 0 ? _a : {},
                gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken },
                code_challenge: codeChallenge,
                code_challenge_method: codeChallengeMethod
              },
              xform: _sessionResponse
            });
          } else if ("phone" in credentials) {
            const { phone, password, options: options2 } = credentials;
            res = await _request(this.fetch, "POST", `${this.url}/signup`, {
              headers: this.headers,
              body: {
                phone,
                password,
                data: (_b = options2 === null || options2 === void 0 ? void 0 : options2.data) !== null && _b !== void 0 ? _b : {},
                channel: (_c = options2 === null || options2 === void 0 ? void 0 : options2.channel) !== null && _c !== void 0 ? _c : "sms",
                gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken }
              },
              xform: _sessionResponse
            });
          } else {
            throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
          }
          const { data: data2, error } = res;
          if (error || !data2) {
            return { data: { user: null, session: null }, error };
          }
          const session = data2.session;
          const user = data2.user;
          if (data2.session) {
            await this._saveSession(data2.session);
            await this._notifyAllSubscribers("SIGNED_IN", session);
          }
          return { data: { user, session }, error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null, session: null }, error };
          }
          throw error;
        }
      }
      /**
       * Log in an existing user with an email and password or phone and password.
       *
       * Be aware that you may get back an error message that will not distinguish
       * between the cases where the account does not exist or that the
       * email/phone and password combination is wrong or that the account can only
       * be accessed via social login.
       */
      async signInWithPassword(credentials) {
        try {
          await this._removeSession();
          let res;
          if ("email" in credentials) {
            const { email, password, options: options2 } = credentials;
            res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
              headers: this.headers,
              body: {
                email,
                password,
                gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken }
              },
              xform: _sessionResponsePassword
            });
          } else if ("phone" in credentials) {
            const { phone, password, options: options2 } = credentials;
            res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=password`, {
              headers: this.headers,
              body: {
                phone,
                password,
                gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken }
              },
              xform: _sessionResponsePassword
            });
          } else {
            throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a password");
          }
          const { data: data2, error } = res;
          if (error) {
            return { data: { user: null, session: null }, error };
          } else if (!data2 || !data2.session || !data2.user) {
            return { data: { user: null, session: null }, error: new AuthInvalidTokenResponseError() };
          }
          if (data2.session) {
            await this._saveSession(data2.session);
            await this._notifyAllSubscribers("SIGNED_IN", data2.session);
          }
          return {
            data: Object.assign({ user: data2.user, session: data2.session }, data2.weak_password ? { weakPassword: data2.weak_password } : null),
            error
          };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null, session: null }, error };
          }
          throw error;
        }
      }
      /**
       * Log in an existing user via a third-party provider.
       * This method supports the PKCE flow.
       */
      async signInWithOAuth(credentials) {
        var _a, _b, _c, _d;
        await this._removeSession();
        return await this._handleProviderSignIn(credentials.provider, {
          redirectTo: (_a = credentials.options) === null || _a === void 0 ? void 0 : _a.redirectTo,
          scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
          queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
          skipBrowserRedirect: (_d = credentials.options) === null || _d === void 0 ? void 0 : _d.skipBrowserRedirect
        });
      }
      /**
       * Log in an existing user by exchanging an Auth Code issued during the PKCE flow.
       */
      async exchangeCodeForSession(authCode) {
        await this.initializePromise;
        return this._acquireLock(-1, async () => {
          return this._exchangeCodeForSession(authCode);
        });
      }
      async _exchangeCodeForSession(authCode) {
        const storageItem = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
        const [codeVerifier, redirectType] = (storageItem !== null && storageItem !== void 0 ? storageItem : "").split("/");
        const { data: data2, error } = await _request(this.fetch, "POST", `${this.url}/token?grant_type=pkce`, {
          headers: this.headers,
          body: {
            auth_code: authCode,
            code_verifier: codeVerifier
          },
          xform: _sessionResponse
        });
        await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
        if (error) {
          return { data: { user: null, session: null, redirectType: null }, error };
        } else if (!data2 || !data2.session || !data2.user) {
          return {
            data: { user: null, session: null, redirectType: null },
            error: new AuthInvalidTokenResponseError()
          };
        }
        if (data2.session) {
          await this._saveSession(data2.session);
          await this._notifyAllSubscribers("SIGNED_IN", data2.session);
        }
        return { data: Object.assign(Object.assign({}, data2), { redirectType: redirectType !== null && redirectType !== void 0 ? redirectType : null }), error };
      }
      /**
       * Allows signing in with an OIDC ID token. The authentication provider used
       * should be enabled and configured.
       */
      async signInWithIdToken(credentials) {
        await this._removeSession();
        try {
          const { options: options2, provider, token, access_token, nonce } = credentials;
          const res = await _request(this.fetch, "POST", `${this.url}/token?grant_type=id_token`, {
            headers: this.headers,
            body: {
              provider,
              id_token: token,
              access_token,
              nonce,
              gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken }
            },
            xform: _sessionResponse
          });
          const { data: data2, error } = res;
          if (error) {
            return { data: { user: null, session: null }, error };
          } else if (!data2 || !data2.session || !data2.user) {
            return {
              data: { user: null, session: null },
              error: new AuthInvalidTokenResponseError()
            };
          }
          if (data2.session) {
            await this._saveSession(data2.session);
            await this._notifyAllSubscribers("SIGNED_IN", data2.session);
          }
          return { data: data2, error };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null, session: null }, error };
          }
          throw error;
        }
      }
      /**
       * Log in a user using magiclink or a one-time password (OTP).
       *
       * If the `{{ .ConfirmationURL }}` variable is specified in the email template, a magiclink will be sent.
       * If the `{{ .Token }}` variable is specified in the email template, an OTP will be sent.
       * If you're using phone sign-ins, only an OTP will be sent. You won't be able to send a magiclink for phone sign-ins.
       *
       * Be aware that you may get back an error message that will not distinguish
       * between the cases where the account does not exist or, that the account
       * can only be accessed via social login.
       *
       * Do note that you will need to configure a Whatsapp sender on Twilio
       * if you are using phone sign in with the 'whatsapp' channel. The whatsapp
       * channel is not supported on other providers
       * at this time.
       * This method supports PKCE when an email is passed.
       */
      async signInWithOtp(credentials) {
        var _a, _b, _c, _d, _e;
        try {
          await this._removeSession();
          if ("email" in credentials) {
            const { email, options: options2 } = credentials;
            let codeChallenge = null;
            let codeChallengeMethod = null;
            if (this.flowType === "pkce") {
              const codeVerifier = generatePKCEVerifier();
              await setItemAsync(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
              codeChallenge = await generatePKCEChallenge(codeVerifier);
              codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
            }
            const { error } = await _request(this.fetch, "POST", `${this.url}/otp`, {
              headers: this.headers,
              body: {
                email,
                data: (_a = options2 === null || options2 === void 0 ? void 0 : options2.data) !== null && _a !== void 0 ? _a : {},
                create_user: (_b = options2 === null || options2 === void 0 ? void 0 : options2.shouldCreateUser) !== null && _b !== void 0 ? _b : true,
                gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken },
                code_challenge: codeChallenge,
                code_challenge_method: codeChallengeMethod
              },
              redirectTo: options2 === null || options2 === void 0 ? void 0 : options2.emailRedirectTo
            });
            return { data: { user: null, session: null }, error };
          }
          if ("phone" in credentials) {
            const { phone, options: options2 } = credentials;
            const { data: data2, error } = await _request(this.fetch, "POST", `${this.url}/otp`, {
              headers: this.headers,
              body: {
                phone,
                data: (_c = options2 === null || options2 === void 0 ? void 0 : options2.data) !== null && _c !== void 0 ? _c : {},
                create_user: (_d = options2 === null || options2 === void 0 ? void 0 : options2.shouldCreateUser) !== null && _d !== void 0 ? _d : true,
                gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken },
                channel: (_e = options2 === null || options2 === void 0 ? void 0 : options2.channel) !== null && _e !== void 0 ? _e : "sms"
              }
            });
            return { data: { user: null, session: null, messageId: data2 === null || data2 === void 0 ? void 0 : data2.message_id }, error };
          }
          throw new AuthInvalidCredentialsError("You must provide either an email or phone number.");
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null, session: null }, error };
          }
          throw error;
        }
      }
      /**
       * Log in a user given a User supplied OTP or TokenHash received through mobile or email.
       */
      async verifyOtp(params) {
        var _a, _b;
        try {
          if (params.type !== "email_change" && params.type !== "phone_change") {
            await this._removeSession();
          }
          let redirectTo = void 0;
          let captchaToken = void 0;
          if ("options" in params) {
            redirectTo = (_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo;
            captchaToken = (_b = params.options) === null || _b === void 0 ? void 0 : _b.captchaToken;
          }
          const { data: data2, error } = await _request(this.fetch, "POST", `${this.url}/verify`, {
            headers: this.headers,
            body: Object.assign(Object.assign({}, params), { gotrue_meta_security: { captcha_token: captchaToken } }),
            redirectTo,
            xform: _sessionResponse
          });
          if (error) {
            throw error;
          }
          if (!data2) {
            throw new Error("An error occurred on token verification.");
          }
          const session = data2.session;
          const user = data2.user;
          if (session === null || session === void 0 ? void 0 : session.access_token) {
            await this._saveSession(session);
            await this._notifyAllSubscribers(params.type == "recovery" ? "PASSWORD_RECOVERY" : "SIGNED_IN", session);
          }
          return { data: { user, session }, error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null, session: null }, error };
          }
          throw error;
        }
      }
      /**
       * Attempts a single-sign on using an enterprise Identity Provider. A
       * successful SSO attempt will redirect the current page to the identity
       * provider authorization page. The redirect URL is implementation and SSO
       * protocol specific.
       *
       * You can use it by providing a SSO domain. Typically you can extract this
       * domain by asking users for their email address. If this domain is
       * registered on the Auth instance the redirect will use that organization's
       * currently active SSO Identity Provider for the login.
       *
       * If you have built an organization-specific login page, you can use the
       * organization's SSO Identity Provider UUID directly instead.
       */
      async signInWithSSO(params) {
        var _a, _b, _c;
        try {
          await this._removeSession();
          let codeChallenge = null;
          let codeChallengeMethod = null;
          if (this.flowType === "pkce") {
            const codeVerifier = generatePKCEVerifier();
            await setItemAsync(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
            codeChallenge = await generatePKCEChallenge(codeVerifier);
            codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
          }
          return await _request(this.fetch, "POST", `${this.url}/sso`, {
            body: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, "providerId" in params ? { provider_id: params.providerId } : null), "domain" in params ? { domain: params.domain } : null), { redirect_to: (_b = (_a = params.options) === null || _a === void 0 ? void 0 : _a.redirectTo) !== null && _b !== void 0 ? _b : void 0 }), ((_c = params === null || params === void 0 ? void 0 : params.options) === null || _c === void 0 ? void 0 : _c.captchaToken) ? { gotrue_meta_security: { captcha_token: params.options.captchaToken } } : null), { skip_http_redirect: true, code_challenge: codeChallenge, code_challenge_method: codeChallengeMethod }),
            headers: this.headers,
            xform: _ssoResponse
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      /**
       * Sends a reauthentication OTP to the user's email or phone number.
       * Requires the user to be signed-in.
       */
      async reauthenticate() {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
          return await this._reauthenticate();
        });
      }
      async _reauthenticate() {
        try {
          return await this._useSession(async (result) => {
            const { data: { session }, error: sessionError } = result;
            if (sessionError)
              throw sessionError;
            if (!session)
              throw new AuthSessionMissingError();
            const { error } = await _request(this.fetch, "GET", `${this.url}/reauthenticate`, {
              headers: this.headers,
              jwt: session.access_token
            });
            return { data: { user: null, session: null }, error };
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null, session: null }, error };
          }
          throw error;
        }
      }
      /**
       * Resends an existing signup confirmation email, email change email, SMS OTP or phone change OTP.
       */
      async resend(credentials) {
        try {
          if (credentials.type != "email_change" && credentials.type != "phone_change") {
            await this._removeSession();
          }
          const endpoint = `${this.url}/resend`;
          if ("email" in credentials) {
            const { email, type, options: options2 } = credentials;
            const { error } = await _request(this.fetch, "POST", endpoint, {
              headers: this.headers,
              body: {
                email,
                type,
                gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken }
              },
              redirectTo: options2 === null || options2 === void 0 ? void 0 : options2.emailRedirectTo
            });
            return { data: { user: null, session: null }, error };
          } else if ("phone" in credentials) {
            const { phone, type, options: options2 } = credentials;
            const { data: data2, error } = await _request(this.fetch, "POST", endpoint, {
              headers: this.headers,
              body: {
                phone,
                type,
                gotrue_meta_security: { captcha_token: options2 === null || options2 === void 0 ? void 0 : options2.captchaToken }
              }
            });
            return { data: { user: null, session: null, messageId: data2 === null || data2 === void 0 ? void 0 : data2.message_id }, error };
          }
          throw new AuthInvalidCredentialsError("You must provide either an email or phone number and a type");
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null, session: null }, error };
          }
          throw error;
        }
      }
      /**
       * Returns the session, refreshing it if necessary.
       * The session returned can be null if the session is not detected which can happen in the event a user is not signed-in or has logged out.
       */
      async getSession() {
        await this.initializePromise;
        return this._acquireLock(-1, async () => {
          return this._useSession(async (result) => {
            return result;
          });
        });
      }
      /**
       * Acquires a global lock based on the storage key.
       */
      async _acquireLock(acquireTimeout, fn) {
        this._debug("#_acquireLock", "begin", acquireTimeout);
        try {
          if (this.lockAcquired) {
            const last2 = this.pendingInLock.length ? this.pendingInLock[this.pendingInLock.length - 1] : Promise.resolve();
            const result = (async () => {
              await last2;
              return await fn();
            })();
            this.pendingInLock.push((async () => {
              try {
                await result;
              } catch (e) {
              }
            })());
            return result;
          }
          return await this.lock(`lock:${this.storageKey}`, acquireTimeout, async () => {
            this._debug("#_acquireLock", "lock acquired for storage key", this.storageKey);
            try {
              this.lockAcquired = true;
              const result = fn();
              this.pendingInLock.push((async () => {
                try {
                  await result;
                } catch (e) {
                }
              })());
              await result;
              while (this.pendingInLock.length) {
                const waitOn = [...this.pendingInLock];
                await Promise.all(waitOn);
                this.pendingInLock.splice(0, waitOn.length);
              }
              return await result;
            } finally {
              this._debug("#_acquireLock", "lock released for storage key", this.storageKey);
              this.lockAcquired = false;
            }
          });
        } finally {
          this._debug("#_acquireLock", "end");
        }
      }
      /**
       * Use instead of {@link #getSession} inside the library. It is
       * semantically usually what you want, as getting a session involves some
       * processing afterwards that requires only one client operating on the
       * session at once across multiple tabs or processes.
       */
      async _useSession(fn) {
        this._debug("#_useSession", "begin");
        try {
          const result = await this.__loadSession();
          return await fn(result);
        } finally {
          this._debug("#_useSession", "end");
        }
      }
      /**
       * NEVER USE DIRECTLY!
       *
       * Always use {@link #_useSession}.
       */
      async __loadSession() {
        this._debug("#__loadSession()", "begin");
        if (!this.lockAcquired) {
          this._debug("#__loadSession()", "used outside of an acquired lock!", new Error().stack);
        }
        try {
          let currentSession = null;
          const maybeSession = await getItemAsync(this.storage, this.storageKey);
          this._debug("#getSession()", "session from storage", maybeSession);
          if (maybeSession !== null) {
            if (this._isValidSession(maybeSession)) {
              currentSession = maybeSession;
            } else {
              this._debug("#getSession()", "session from storage is not valid");
              await this._removeSession();
            }
          }
          if (!currentSession) {
            return { data: { session: null }, error: null };
          }
          const hasExpired = currentSession.expires_at ? currentSession.expires_at <= Date.now() / 1e3 : false;
          this._debug("#__loadSession()", `session has${hasExpired ? "" : " not"} expired`, "expires_at", currentSession.expires_at);
          if (!hasExpired) {
            return { data: { session: currentSession }, error: null };
          }
          const { session, error } = await this._callRefreshToken(currentSession.refresh_token);
          if (error) {
            return { data: { session: null }, error };
          }
          return { data: { session }, error: null };
        } finally {
          this._debug("#__loadSession()", "end");
        }
      }
      /**
       * Gets the current user details if there is an existing session.
       * @param jwt Takes in an optional access token jwt. If no jwt is provided, getUser() will attempt to get the jwt from the current session.
       */
      async getUser(jwt) {
        if (jwt) {
          return await this._getUser(jwt);
        }
        await this.initializePromise;
        return this._acquireLock(-1, async () => {
          return await this._getUser();
        });
      }
      async _getUser(jwt) {
        try {
          if (jwt) {
            return await _request(this.fetch, "GET", `${this.url}/user`, {
              headers: this.headers,
              jwt,
              xform: _userResponse
            });
          }
          return await this._useSession(async (result) => {
            var _a, _b;
            const { data: data2, error } = result;
            if (error) {
              throw error;
            }
            return await _request(this.fetch, "GET", `${this.url}/user`, {
              headers: this.headers,
              jwt: (_b = (_a = data2.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : void 0,
              xform: _userResponse
            });
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null }, error };
          }
          throw error;
        }
      }
      /**
       * Updates user data for a logged in user.
       */
      async updateUser(attributes, options2 = {}) {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
          return await this._updateUser(attributes, options2);
        });
      }
      async _updateUser(attributes, options2 = {}) {
        try {
          return await this._useSession(async (result) => {
            const { data: sessionData, error: sessionError } = result;
            if (sessionError) {
              throw sessionError;
            }
            if (!sessionData.session) {
              throw new AuthSessionMissingError();
            }
            const session = sessionData.session;
            let codeChallenge = null;
            let codeChallengeMethod = null;
            if (this.flowType === "pkce" && attributes.email != null) {
              const codeVerifier = generatePKCEVerifier();
              await setItemAsync(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
              codeChallenge = await generatePKCEChallenge(codeVerifier);
              codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
            }
            const { data: data2, error: userError } = await _request(this.fetch, "PUT", `${this.url}/user`, {
              headers: this.headers,
              redirectTo: options2 === null || options2 === void 0 ? void 0 : options2.emailRedirectTo,
              body: Object.assign(Object.assign({}, attributes), { code_challenge: codeChallenge, code_challenge_method: codeChallengeMethod }),
              jwt: session.access_token,
              xform: _userResponse
            });
            if (userError)
              throw userError;
            session.user = data2.user;
            await this._saveSession(session);
            await this._notifyAllSubscribers("USER_UPDATED", session);
            return { data: { user: session.user }, error: null };
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null }, error };
          }
          throw error;
        }
      }
      /**
       * Decodes a JWT (without performing any validation).
       */
      _decodeJWT(jwt) {
        return decodeJWTPayload(jwt);
      }
      /**
       * Sets the session data from the current session. If the current session is expired, setSession will take care of refreshing it to obtain a new session.
       * If the refresh token or access token in the current session is invalid, an error will be thrown.
       * @param currentSession The current session that minimally contains an access token and refresh token.
       */
      async setSession(currentSession) {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
          return await this._setSession(currentSession);
        });
      }
      async _setSession(currentSession) {
        try {
          if (!currentSession.access_token || !currentSession.refresh_token) {
            throw new AuthSessionMissingError();
          }
          const timeNow = Date.now() / 1e3;
          let expiresAt2 = timeNow;
          let hasExpired = true;
          let session = null;
          const payload = decodeJWTPayload(currentSession.access_token);
          if (payload.exp) {
            expiresAt2 = payload.exp;
            hasExpired = expiresAt2 <= timeNow;
          }
          if (hasExpired) {
            const { session: refreshedSession, error } = await this._callRefreshToken(currentSession.refresh_token);
            if (error) {
              return { data: { user: null, session: null }, error };
            }
            if (!refreshedSession) {
              return { data: { user: null, session: null }, error: null };
            }
            session = refreshedSession;
          } else {
            const { data: data2, error } = await this._getUser(currentSession.access_token);
            if (error) {
              throw error;
            }
            session = {
              access_token: currentSession.access_token,
              refresh_token: currentSession.refresh_token,
              user: data2.user,
              token_type: "bearer",
              expires_in: expiresAt2 - timeNow,
              expires_at: expiresAt2
            };
            await this._saveSession(session);
            await this._notifyAllSubscribers("SIGNED_IN", session);
          }
          return { data: { user: session.user, session }, error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { session: null, user: null }, error };
          }
          throw error;
        }
      }
      /**
       * Returns a new session, regardless of expiry status.
       * Takes in an optional current session. If not passed in, then refreshSession() will attempt to retrieve it from getSession().
       * If the current session's refresh token is invalid, an error will be thrown.
       * @param currentSession The current session. If passed in, it must contain a refresh token.
       */
      async refreshSession(currentSession) {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
          return await this._refreshSession(currentSession);
        });
      }
      async _refreshSession(currentSession) {
        try {
          return await this._useSession(async (result) => {
            var _a;
            if (!currentSession) {
              const { data: data2, error: error2 } = result;
              if (error2) {
                throw error2;
              }
              currentSession = (_a = data2.session) !== null && _a !== void 0 ? _a : void 0;
            }
            if (!(currentSession === null || currentSession === void 0 ? void 0 : currentSession.refresh_token)) {
              throw new AuthSessionMissingError();
            }
            const { session, error } = await this._callRefreshToken(currentSession.refresh_token);
            if (error) {
              return { data: { user: null, session: null }, error };
            }
            if (!session) {
              return { data: { user: null, session: null }, error: null };
            }
            return { data: { user: session.user, session }, error: null };
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { user: null, session: null }, error };
          }
          throw error;
        }
      }
      /**
       * Gets the session data from a URL string
       */
      async _getSessionFromURL(isPKCEFlow) {
        try {
          if (!isBrowser())
            throw new AuthImplicitGrantRedirectError("No browser detected.");
          if (this.flowType === "implicit" && !this._isImplicitGrantFlow()) {
            throw new AuthImplicitGrantRedirectError("Not a valid implicit grant flow url.");
          } else if (this.flowType == "pkce" && !isPKCEFlow) {
            throw new AuthPKCEGrantCodeExchangeError("Not a valid PKCE flow url.");
          }
          const params = parseParametersFromURL(window.location.href);
          if (isPKCEFlow) {
            if (!params.code)
              throw new AuthPKCEGrantCodeExchangeError("No code detected.");
            const { data: data3, error: error2 } = await this._exchangeCodeForSession(params.code);
            if (error2)
              throw error2;
            const url = new URL(window.location.href);
            url.searchParams.delete("code");
            window.history.replaceState(window.history.state, "", url.toString());
            return { data: { session: data3.session, redirectType: null }, error: null };
          }
          if (params.error || params.error_description || params.error_code) {
            throw new AuthImplicitGrantRedirectError(params.error_description || "Error in URL with unspecified error_description", {
              error: params.error || "unspecified_error",
              code: params.error_code || "unspecified_code"
            });
          }
          const { provider_token, provider_refresh_token, access_token, refresh_token, expires_in, expires_at, token_type } = params;
          if (!access_token || !expires_in || !refresh_token || !token_type) {
            throw new AuthImplicitGrantRedirectError("No session defined in URL");
          }
          const timeNow = Math.round(Date.now() / 1e3);
          const expiresIn = parseInt(expires_in);
          let expiresAt2 = timeNow + expiresIn;
          if (expires_at) {
            expiresAt2 = parseInt(expires_at);
          }
          const actuallyExpiresIn = expiresAt2 - timeNow;
          if (actuallyExpiresIn * 1e3 <= AUTO_REFRESH_TICK_DURATION) {
            console.warn(`@supabase/gotrue-js: Session as retrieved from URL expires in ${actuallyExpiresIn}s, should have been closer to ${expiresIn}s`);
          }
          const issuedAt = expiresAt2 - expiresIn;
          if (timeNow - issuedAt >= 120) {
            console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued over 120s ago, URL could be stale", issuedAt, expiresAt2, timeNow);
          } else if (timeNow - issuedAt < 0) {
            console.warn("@supabase/gotrue-js: Session as retrieved from URL was issued in the future? Check the device clok for skew", issuedAt, expiresAt2, timeNow);
          }
          const { data: data2, error } = await this._getUser(access_token);
          if (error)
            throw error;
          const session = {
            provider_token,
            provider_refresh_token,
            access_token,
            expires_in: expiresIn,
            expires_at: expiresAt2,
            refresh_token,
            token_type,
            user: data2.user
          };
          window.location.hash = "";
          this._debug("#_getSessionFromURL()", "clearing window.location.hash");
          return { data: { session, redirectType: params.type }, error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { session: null, redirectType: null }, error };
          }
          throw error;
        }
      }
      /**
       * Checks if the current URL contains parameters given by an implicit oauth grant flow (https://www.rfc-editor.org/rfc/rfc6749.html#section-4.2)
       */
      _isImplicitGrantFlow() {
        const params = parseParametersFromURL(window.location.href);
        return !!(isBrowser() && (params.access_token || params.error_description));
      }
      /**
       * Checks if the current URL and backing storage contain parameters given by a PKCE flow
       */
      async _isPKCEFlow() {
        const params = parseParametersFromURL(window.location.href);
        const currentStorageContent = await getItemAsync(this.storage, `${this.storageKey}-code-verifier`);
        return !!(params.code && currentStorageContent);
      }
      /**
       * Inside a browser context, `signOut()` will remove the logged in user from the browser session and log them out - removing all items from localstorage and then trigger a `"SIGNED_OUT"` event.
       *
       * For server-side management, you can revoke all refresh tokens for a user by passing a user's JWT through to `auth.api.signOut(JWT: string)`.
       * There is no way to revoke a user's access token jwt until it expires. It is recommended to set a shorter expiry on the jwt for this reason.
       *
       * If using `others` scope, no `SIGNED_OUT` event is fired!
       */
      async signOut(options2 = { scope: "global" }) {
        await this.initializePromise;
        return await this._acquireLock(-1, async () => {
          return await this._signOut(options2);
        });
      }
      async _signOut({ scope } = { scope: "global" }) {
        return await this._useSession(async (result) => {
          var _a;
          const { data: data2, error: sessionError } = result;
          if (sessionError) {
            return { error: sessionError };
          }
          const accessToken = (_a = data2.session) === null || _a === void 0 ? void 0 : _a.access_token;
          if (accessToken) {
            const { error } = await this.admin.signOut(accessToken, scope);
            if (error) {
              if (!(isAuthApiError(error) && (error.status === 404 || error.status === 401))) {
                return { error };
              }
            }
          }
          if (scope !== "others") {
            await this._removeSession();
            await removeItemAsync(this.storage, `${this.storageKey}-code-verifier`);
            await this._notifyAllSubscribers("SIGNED_OUT", null);
          }
          return { error: null };
        });
      }
      /**
       * Receive a notification every time an auth event happens.
       * @param callback A callback function to be invoked when an auth event happens.
       */
      onAuthStateChange(callback) {
        const id = uuid();
        const subscription = {
          id,
          callback,
          unsubscribe: () => {
            this._debug("#unsubscribe()", "state change callback with id removed", id);
            this.stateChangeEmitters.delete(id);
          }
        };
        this._debug("#onAuthStateChange()", "registered callback with id", id);
        this.stateChangeEmitters.set(id, subscription);
        (async () => {
          await this.initializePromise;
          await this._acquireLock(-1, async () => {
            this._emitInitialSession(id);
          });
        })();
        return { data: { subscription } };
      }
      async _emitInitialSession(id) {
        return await this._useSession(async (result) => {
          var _a, _b;
          try {
            const { data: { session }, error } = result;
            if (error)
              throw error;
            await ((_a = this.stateChangeEmitters.get(id)) === null || _a === void 0 ? void 0 : _a.callback("INITIAL_SESSION", session));
            this._debug("INITIAL_SESSION", "callback id", id, "session", session);
          } catch (err) {
            await ((_b = this.stateChangeEmitters.get(id)) === null || _b === void 0 ? void 0 : _b.callback("INITIAL_SESSION", null));
            this._debug("INITIAL_SESSION", "callback id", id, "error", err);
            console.error(err);
          }
        });
      }
      /**
       * Sends a password reset request to an email address. This method supports the PKCE flow.
       *
       * @param email The email address of the user.
       * @param options.redirectTo The URL to send the user to after they click the password reset link.
       * @param options.captchaToken Verification token received when the user completes the captcha on the site.
       */
      async resetPasswordForEmail(email, options2 = {}) {
        let codeChallenge = null;
        let codeChallengeMethod = null;
        if (this.flowType === "pkce") {
          const codeVerifier = generatePKCEVerifier();
          await setItemAsync(this.storage, `${this.storageKey}-code-verifier`, `${codeVerifier}/PASSWORD_RECOVERY`);
          codeChallenge = await generatePKCEChallenge(codeVerifier);
          codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
        }
        try {
          return await _request(this.fetch, "POST", `${this.url}/recover`, {
            body: {
              email,
              code_challenge: codeChallenge,
              code_challenge_method: codeChallengeMethod,
              gotrue_meta_security: { captcha_token: options2.captchaToken }
            },
            headers: this.headers,
            redirectTo: options2.redirectTo
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      /**
       * Gets all the identities linked to a user.
       */
      async getUserIdentities() {
        var _a;
        try {
          const { data: data2, error } = await this.getUser();
          if (error)
            throw error;
          return { data: { identities: (_a = data2.user.identities) !== null && _a !== void 0 ? _a : [] }, error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      /**
       * Links an oauth identity to an existing user.
       * This method supports the PKCE flow.
       */
      async linkIdentity(credentials) {
        var _a;
        try {
          const { data: data2, error } = await this._useSession(async (result) => {
            var _a2, _b, _c, _d, _e;
            const { data: data3, error: error2 } = result;
            if (error2)
              throw error2;
            const url = await this._getUrlForProvider(`${this.url}/user/identities/authorize`, credentials.provider, {
              redirectTo: (_a2 = credentials.options) === null || _a2 === void 0 ? void 0 : _a2.redirectTo,
              scopes: (_b = credentials.options) === null || _b === void 0 ? void 0 : _b.scopes,
              queryParams: (_c = credentials.options) === null || _c === void 0 ? void 0 : _c.queryParams,
              skipBrowserRedirect: true
            });
            return await _request(this.fetch, "GET", url, {
              headers: this.headers,
              jwt: (_e = (_d = data3.session) === null || _d === void 0 ? void 0 : _d.access_token) !== null && _e !== void 0 ? _e : void 0
            });
          });
          if (error)
            throw error;
          if (isBrowser() && !((_a = credentials.options) === null || _a === void 0 ? void 0 : _a.skipBrowserRedirect)) {
            window.location.assign(data2 === null || data2 === void 0 ? void 0 : data2.url);
          }
          return { data: { provider: credentials.provider, url: data2 === null || data2 === void 0 ? void 0 : data2.url }, error: null };
        } catch (error) {
          if (isAuthError(error)) {
            return { data: { provider: credentials.provider, url: null }, error };
          }
          throw error;
        }
      }
      /**
       * Unlinks an identity from a user by deleting it. The user will no longer be able to sign in with that identity once it's unlinked.
       */
      async unlinkIdentity(identity) {
        try {
          return await this._useSession(async (result) => {
            var _a, _b;
            const { data: data2, error } = result;
            if (error) {
              throw error;
            }
            return await _request(this.fetch, "DELETE", `${this.url}/user/identities/${identity.identity_id}`, {
              headers: this.headers,
              jwt: (_b = (_a = data2.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : void 0
            });
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      /**
       * Generates a new JWT.
       * @param refreshToken A valid refresh token that was returned on login.
       */
      async _refreshAccessToken(refreshToken) {
        const debugName = `#_refreshAccessToken(${refreshToken.substring(0, 5)}...)`;
        this._debug(debugName, "begin");
        try {
          const startedAt = Date.now();
          return await retryable(async (attempt) => {
            await sleep(attempt * 200);
            this._debug(debugName, "refreshing attempt", attempt);
            return await _request(this.fetch, "POST", `${this.url}/token?grant_type=refresh_token`, {
              body: { refresh_token: refreshToken },
              headers: this.headers,
              xform: _sessionResponse
            });
          }, (attempt, _, result) => result && result.error && isAuthRetryableFetchError(result.error) && // retryable only if the request can be sent before the backoff overflows the tick duration
          Date.now() + (attempt + 1) * 200 - startedAt < AUTO_REFRESH_TICK_DURATION);
        } catch (error) {
          this._debug(debugName, "error", error);
          if (isAuthError(error)) {
            return { data: { session: null, user: null }, error };
          }
          throw error;
        } finally {
          this._debug(debugName, "end");
        }
      }
      _isValidSession(maybeSession) {
        const isValidSession = typeof maybeSession === "object" && maybeSession !== null && "access_token" in maybeSession && "refresh_token" in maybeSession && "expires_at" in maybeSession;
        return isValidSession;
      }
      async _handleProviderSignIn(provider, options2) {
        const url = await this._getUrlForProvider(`${this.url}/authorize`, provider, {
          redirectTo: options2.redirectTo,
          scopes: options2.scopes,
          queryParams: options2.queryParams
        });
        this._debug("#_handleProviderSignIn()", "provider", provider, "options", options2, "url", url);
        if (isBrowser() && !options2.skipBrowserRedirect) {
          window.location.assign(url);
        }
        return { data: { provider, url }, error: null };
      }
      /**
       * Recovers the session from LocalStorage and refreshes
       * Note: this method is async to accommodate for AsyncStorage e.g. in React native.
       */
      async _recoverAndRefresh() {
        var _a;
        const debugName = "#_recoverAndRefresh()";
        this._debug(debugName, "begin");
        try {
          const currentSession = await getItemAsync(this.storage, this.storageKey);
          this._debug(debugName, "session from storage", currentSession);
          if (!this._isValidSession(currentSession)) {
            this._debug(debugName, "session is not valid");
            if (currentSession !== null) {
              await this._removeSession();
            }
            return;
          }
          const timeNow = Math.round(Date.now() / 1e3);
          const expiresWithMargin = ((_a = currentSession.expires_at) !== null && _a !== void 0 ? _a : Infinity) < timeNow + EXPIRY_MARGIN;
          this._debug(debugName, `session has${expiresWithMargin ? "" : " not"} expired with margin of ${EXPIRY_MARGIN}s`);
          if (expiresWithMargin) {
            if (this.autoRefreshToken && currentSession.refresh_token) {
              const { error } = await this._callRefreshToken(currentSession.refresh_token);
              if (error) {
                console.error(error);
                if (!isAuthRetryableFetchError(error)) {
                  this._debug(debugName, "refresh failed with a non-retryable error, removing the session", error);
                  await this._removeSession();
                }
              }
            }
          } else {
            await this._notifyAllSubscribers("SIGNED_IN", currentSession);
          }
        } catch (err) {
          this._debug(debugName, "error", err);
          console.error(err);
          return;
        } finally {
          this._debug(debugName, "end");
        }
      }
      async _callRefreshToken(refreshToken) {
        var _a, _b;
        if (!refreshToken) {
          throw new AuthSessionMissingError();
        }
        if (this.refreshingDeferred) {
          return this.refreshingDeferred.promise;
        }
        const debugName = `#_callRefreshToken(${refreshToken.substring(0, 5)}...)`;
        this._debug(debugName, "begin");
        try {
          this.refreshingDeferred = new Deferred();
          const { data: data2, error } = await this._refreshAccessToken(refreshToken);
          if (error)
            throw error;
          if (!data2.session)
            throw new AuthSessionMissingError();
          await this._saveSession(data2.session);
          await this._notifyAllSubscribers("TOKEN_REFRESHED", data2.session);
          const result = { session: data2.session, error: null };
          this.refreshingDeferred.resolve(result);
          return result;
        } catch (error) {
          this._debug(debugName, "error", error);
          if (isAuthError(error)) {
            const result = { session: null, error };
            if (!isAuthRetryableFetchError(error)) {
              await this._removeSession();
              await this._notifyAllSubscribers("SIGNED_OUT", null);
            }
            (_a = this.refreshingDeferred) === null || _a === void 0 ? void 0 : _a.resolve(result);
            return result;
          }
          (_b = this.refreshingDeferred) === null || _b === void 0 ? void 0 : _b.reject(error);
          throw error;
        } finally {
          this.refreshingDeferred = null;
          this._debug(debugName, "end");
        }
      }
      async _notifyAllSubscribers(event, session, broadcast = true) {
        const debugName = `#_notifyAllSubscribers(${event})`;
        this._debug(debugName, "begin", session, `broadcast = ${broadcast}`);
        try {
          if (this.broadcastChannel && broadcast) {
            this.broadcastChannel.postMessage({ event, session });
          }
          const errors = [];
          const promises = Array.from(this.stateChangeEmitters.values()).map(async (x2) => {
            try {
              await x2.callback(event, session);
            } catch (e) {
              errors.push(e);
            }
          });
          await Promise.all(promises);
          if (errors.length > 0) {
            for (let i2 = 0; i2 < errors.length; i2 += 1) {
              console.error(errors[i2]);
            }
            throw errors[0];
          }
        } finally {
          this._debug(debugName, "end");
        }
      }
      /**
       * set currentSession and currentUser
       * process to _startAutoRefreshToken if possible
       */
      async _saveSession(session) {
        this._debug("#_saveSession()", session);
        await setItemAsync(this.storage, this.storageKey, session);
      }
      async _removeSession() {
        this._debug("#_removeSession()");
        await removeItemAsync(this.storage, this.storageKey);
      }
      /**
       * Removes any registered visibilitychange callback.
       *
       * {@see #startAutoRefresh}
       * {@see #stopAutoRefresh}
       */
      _removeVisibilityChangedCallback() {
        this._debug("#_removeVisibilityChangedCallback()");
        const callback = this.visibilityChangedCallback;
        this.visibilityChangedCallback = null;
        try {
          if (callback && isBrowser() && (window === null || window === void 0 ? void 0 : window.removeEventListener)) {
            window.removeEventListener("visibilitychange", callback);
          }
        } catch (e) {
          console.error("removing visibilitychange callback failed", e);
        }
      }
      /**
       * This is the private implementation of {@link #startAutoRefresh}. Use this
       * within the library.
       */
      async _startAutoRefresh() {
        await this._stopAutoRefresh();
        this._debug("#_startAutoRefresh()");
        const ticker = setInterval(() => this._autoRefreshTokenTick(), AUTO_REFRESH_TICK_DURATION);
        this.autoRefreshTicker = ticker;
        if (ticker && typeof ticker === "object" && typeof ticker.unref === "function") {
          ticker.unref();
        } else if (typeof Deno !== "undefined" && typeof Deno.unrefTimer === "function") {
          Deno.unrefTimer(ticker);
        }
        setTimeout(async () => {
          await this.initializePromise;
          await this._autoRefreshTokenTick();
        }, 0);
      }
      /**
       * This is the private implementation of {@link #stopAutoRefresh}. Use this
       * within the library.
       */
      async _stopAutoRefresh() {
        this._debug("#_stopAutoRefresh()");
        const ticker = this.autoRefreshTicker;
        this.autoRefreshTicker = null;
        if (ticker) {
          clearInterval(ticker);
        }
      }
      /**
       * Starts an auto-refresh process in the background. The session is checked
       * every few seconds. Close to the time of expiration a process is started to
       * refresh the session. If refreshing fails it will be retried for as long as
       * necessary.
       *
       * If you set the {@link GoTrueClientOptions#autoRefreshToken} you don't need
       * to call this function, it will be called for you.
       *
       * On browsers the refresh process works only when the tab/window is in the
       * foreground to conserve resources as well as prevent race conditions and
       * flooding auth with requests. If you call this method any managed
       * visibility change callback will be removed and you must manage visibility
       * changes on your own.
       *
       * On non-browser platforms the refresh process works *continuously* in the
       * background, which may not be desirable. You should hook into your
       * platform's foreground indication mechanism and call these methods
       * appropriately to conserve resources.
       *
       * {@see #stopAutoRefresh}
       */
      async startAutoRefresh() {
        this._removeVisibilityChangedCallback();
        await this._startAutoRefresh();
      }
      /**
       * Stops an active auto refresh process running in the background (if any).
       *
       * If you call this method any managed visibility change callback will be
       * removed and you must manage visibility changes on your own.
       *
       * See {@link #startAutoRefresh} for more details.
       */
      async stopAutoRefresh() {
        this._removeVisibilityChangedCallback();
        await this._stopAutoRefresh();
      }
      /**
       * Runs the auto refresh token tick.
       */
      async _autoRefreshTokenTick() {
        this._debug("#_autoRefreshTokenTick()", "begin");
        try {
          await this._acquireLock(0, async () => {
            try {
              const now = Date.now();
              try {
                return await this._useSession(async (result) => {
                  const { data: { session } } = result;
                  if (!session || !session.refresh_token || !session.expires_at) {
                    this._debug("#_autoRefreshTokenTick()", "no session");
                    return;
                  }
                  const expiresInTicks = Math.floor((session.expires_at * 1e3 - now) / AUTO_REFRESH_TICK_DURATION);
                  this._debug("#_autoRefreshTokenTick()", `access token expires in ${expiresInTicks} ticks, a tick lasts ${AUTO_REFRESH_TICK_DURATION}ms, refresh threshold is ${AUTO_REFRESH_TICK_THRESHOLD} ticks`);
                  if (expiresInTicks <= AUTO_REFRESH_TICK_THRESHOLD) {
                    await this._callRefreshToken(session.refresh_token);
                  }
                });
              } catch (e) {
                console.error("Auto refresh tick failed with error. This is likely a transient error.", e);
              }
            } finally {
              this._debug("#_autoRefreshTokenTick()", "end");
            }
          });
        } catch (e) {
          if (e.isAcquireTimeout || e instanceof LockAcquireTimeoutError) {
            this._debug("auto refresh token tick lock not available");
          } else {
            throw e;
          }
        }
      }
      /**
       * Registers callbacks on the browser / platform, which in-turn run
       * algorithms when the browser window/tab are in foreground. On non-browser
       * platforms it assumes always foreground.
       */
      async _handleVisibilityChange() {
        this._debug("#_handleVisibilityChange()");
        if (!isBrowser() || !(window === null || window === void 0 ? void 0 : window.addEventListener)) {
          if (this.autoRefreshToken) {
            this.startAutoRefresh();
          }
          return false;
        }
        try {
          this.visibilityChangedCallback = async () => await this._onVisibilityChanged(false);
          window === null || window === void 0 ? void 0 : window.addEventListener("visibilitychange", this.visibilityChangedCallback);
          await this._onVisibilityChanged(true);
        } catch (error) {
          console.error("_handleVisibilityChange", error);
        }
      }
      /**
       * Callback registered with `window.addEventListener('visibilitychange')`.
       */
      async _onVisibilityChanged(calledFromInitialize) {
        const methodName = `#_onVisibilityChanged(${calledFromInitialize})`;
        this._debug(methodName, "visibilityState", document.visibilityState);
        if (document.visibilityState === "visible") {
          if (this.autoRefreshToken) {
            this._startAutoRefresh();
          }
          if (!calledFromInitialize) {
            await this.initializePromise;
            await this._acquireLock(-1, async () => {
              if (document.visibilityState !== "visible") {
                this._debug(methodName, "acquired the lock to recover the session, but the browser visibilityState is no longer visible, aborting");
                return;
              }
              await this._recoverAndRefresh();
            });
          }
        } else if (document.visibilityState === "hidden") {
          if (this.autoRefreshToken) {
            this._stopAutoRefresh();
          }
        }
      }
      /**
       * Generates the relevant login URL for a third-party provider.
       * @param options.redirectTo A URL or mobile address to send the user to after they are confirmed.
       * @param options.scopes A space-separated list of scopes granted to the OAuth application.
       * @param options.queryParams An object of key-value pairs containing query parameters granted to the OAuth application.
       */
      async _getUrlForProvider(url, provider, options2) {
        const urlParams = [`provider=${encodeURIComponent(provider)}`];
        if (options2 === null || options2 === void 0 ? void 0 : options2.redirectTo) {
          urlParams.push(`redirect_to=${encodeURIComponent(options2.redirectTo)}`);
        }
        if (options2 === null || options2 === void 0 ? void 0 : options2.scopes) {
          urlParams.push(`scopes=${encodeURIComponent(options2.scopes)}`);
        }
        if (this.flowType === "pkce") {
          const codeVerifier = generatePKCEVerifier();
          await setItemAsync(this.storage, `${this.storageKey}-code-verifier`, codeVerifier);
          const codeChallenge = await generatePKCEChallenge(codeVerifier);
          const codeChallengeMethod = codeVerifier === codeChallenge ? "plain" : "s256";
          this._debug("PKCE", "code verifier", `${codeVerifier.substring(0, 5)}...`, "code challenge", codeChallenge, "method", codeChallengeMethod);
          const flowParams = new URLSearchParams({
            code_challenge: `${encodeURIComponent(codeChallenge)}`,
            code_challenge_method: `${encodeURIComponent(codeChallengeMethod)}`
          });
          urlParams.push(flowParams.toString());
        }
        if (options2 === null || options2 === void 0 ? void 0 : options2.queryParams) {
          const query = new URLSearchParams(options2.queryParams);
          urlParams.push(query.toString());
        }
        if (options2 === null || options2 === void 0 ? void 0 : options2.skipBrowserRedirect) {
          urlParams.push(`skip_http_redirect=${options2.skipBrowserRedirect}`);
        }
        return `${url}?${urlParams.join("&")}`;
      }
      async _unenroll(params) {
        try {
          return await this._useSession(async (result) => {
            var _a;
            const { data: sessionData, error: sessionError } = result;
            if (sessionError) {
              return { data: null, error: sessionError };
            }
            return await _request(this.fetch, "DELETE", `${this.url}/factors/${params.factorId}`, {
              headers: this.headers,
              jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
            });
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      /**
       * {@see GoTrueMFAApi#enroll}
       */
      async _enroll(params) {
        try {
          return await this._useSession(async (result) => {
            var _a, _b;
            const { data: sessionData, error: sessionError } = result;
            if (sessionError) {
              return { data: null, error: sessionError };
            }
            const { data: data2, error } = await _request(this.fetch, "POST", `${this.url}/factors`, {
              body: {
                friendly_name: params.friendlyName,
                factor_type: params.factorType,
                issuer: params.issuer
              },
              headers: this.headers,
              jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
            });
            if (error) {
              return { data: null, error };
            }
            if ((_b = data2 === null || data2 === void 0 ? void 0 : data2.totp) === null || _b === void 0 ? void 0 : _b.qr_code) {
              data2.totp.qr_code = `data:image/svg+xml;utf-8,${data2.totp.qr_code}`;
            }
            return { data: data2, error: null };
          });
        } catch (error) {
          if (isAuthError(error)) {
            return { data: null, error };
          }
          throw error;
        }
      }
      /**
       * {@see GoTrueMFAApi#verify}
       */
      async _verify(params) {
        return this._acquireLock(-1, async () => {
          try {
            return await this._useSession(async (result) => {
              var _a;
              const { data: sessionData, error: sessionError } = result;
              if (sessionError) {
                return { data: null, error: sessionError };
              }
              const { data: data2, error } = await _request(this.fetch, "POST", `${this.url}/factors/${params.factorId}/verify`, {
                body: { code: params.code, challenge_id: params.challengeId },
                headers: this.headers,
                jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
              });
              if (error) {
                return { data: null, error };
              }
              await this._saveSession(Object.assign({ expires_at: Math.round(Date.now() / 1e3) + data2.expires_in }, data2));
              await this._notifyAllSubscribers("MFA_CHALLENGE_VERIFIED", data2);
              return { data: data2, error };
            });
          } catch (error) {
            if (isAuthError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * {@see GoTrueMFAApi#challenge}
       */
      async _challenge(params) {
        return this._acquireLock(-1, async () => {
          try {
            return await this._useSession(async (result) => {
              var _a;
              const { data: sessionData, error: sessionError } = result;
              if (sessionError) {
                return { data: null, error: sessionError };
              }
              return await _request(this.fetch, "POST", `${this.url}/factors/${params.factorId}/challenge`, {
                headers: this.headers,
                jwt: (_a = sessionData === null || sessionData === void 0 ? void 0 : sessionData.session) === null || _a === void 0 ? void 0 : _a.access_token
              });
            });
          } catch (error) {
            if (isAuthError(error)) {
              return { data: null, error };
            }
            throw error;
          }
        });
      }
      /**
       * {@see GoTrueMFAApi#challengeAndVerify}
       */
      async _challengeAndVerify(params) {
        const { data: challengeData, error: challengeError } = await this._challenge({
          factorId: params.factorId
        });
        if (challengeError) {
          return { data: null, error: challengeError };
        }
        return await this._verify({
          factorId: params.factorId,
          challengeId: challengeData.id,
          code: params.code
        });
      }
      /**
       * {@see GoTrueMFAApi#listFactors}
       */
      async _listFactors() {
        const { data: { user }, error: userError } = await this.getUser();
        if (userError) {
          return { data: null, error: userError };
        }
        const factors = (user === null || user === void 0 ? void 0 : user.factors) || [];
        const totp = factors.filter((factor) => factor.factor_type === "totp" && factor.status === "verified");
        return {
          data: {
            all: factors,
            totp
          },
          error: null
        };
      }
      /**
       * {@see GoTrueMFAApi#getAuthenticatorAssuranceLevel}
       */
      async _getAuthenticatorAssuranceLevel() {
        return this._acquireLock(-1, async () => {
          return await this._useSession(async (result) => {
            var _a, _b;
            const { data: { session }, error: sessionError } = result;
            if (sessionError) {
              return { data: null, error: sessionError };
            }
            if (!session) {
              return {
                data: { currentLevel: null, nextLevel: null, currentAuthenticationMethods: [] },
                error: null
              };
            }
            const payload = this._decodeJWT(session.access_token);
            let currentLevel = null;
            if (payload.aal) {
              currentLevel = payload.aal;
            }
            let nextLevel = currentLevel;
            const verifiedFactors = (_b = (_a = session.user.factors) === null || _a === void 0 ? void 0 : _a.filter((factor) => factor.status === "verified")) !== null && _b !== void 0 ? _b : [];
            if (verifiedFactors.length > 0) {
              nextLevel = "aal2";
            }
            const currentAuthenticationMethods = payload.amr || [];
            return { data: { currentLevel, nextLevel, currentAuthenticationMethods }, error: null };
          });
        });
      }
    };
    GoTrueClient.nextInstanceID = 0;
  }
});

// node_modules/@supabase/gotrue-js/dist/module/AuthAdminApi.js
var init_AuthAdminApi = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/AuthAdminApi.js"() {
    init_GoTrueAdminApi();
  }
});

// node_modules/@supabase/gotrue-js/dist/module/AuthClient.js
var init_AuthClient = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/AuthClient.js"() {
    init_GoTrueClient();
  }
});

// node_modules/@supabase/gotrue-js/dist/module/lib/types.js
var init_types3 = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/lib/types.js"() {
  }
});

// node_modules/@supabase/gotrue-js/dist/module/index.js
var init_module5 = __esm({
  "node_modules/@supabase/gotrue-js/dist/module/index.js"() {
    init_GoTrueAdminApi();
    init_GoTrueClient();
    init_AuthAdminApi();
    init_AuthClient();
    init_types3();
    init_errors2();
    init_locks();
  }
});

// node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js
var SupabaseAuthClient;
var init_SupabaseAuthClient = __esm({
  "node_modules/@supabase/supabase-js/dist/module/lib/SupabaseAuthClient.js"() {
    init_module5();
    SupabaseAuthClient = class extends GoTrueClient {
      constructor(options2) {
        super(options2);
      }
    };
  }
});

// node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js
var __awaiter7, SupabaseClient;
var init_SupabaseClient = __esm({
  "node_modules/@supabase/supabase-js/dist/module/SupabaseClient.js"() {
    init_module();
    init_module2();
    init_module3();
    init_module4();
    init_constants4();
    init_fetch2();
    init_helpers2();
    init_SupabaseAuthClient();
    __awaiter7 = function(thisArg, _arguments, P, generator) {
      function adopt(value) {
        return value instanceof P ? value : new P(function(resolve2) {
          resolve2(value);
        });
      }
      return new (P || (P = Promise))(function(resolve2, reject) {
        function fulfilled(value) {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        }
        function rejected(value) {
          try {
            step(generator["throw"](value));
          } catch (e) {
            reject(e);
          }
        }
        function step(result) {
          result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
      });
    };
    SupabaseClient = class {
      /**
       * Create a new client for use in the browser.
       * @param supabaseUrl The unique Supabase URL which is supplied when you create a new project in your project dashboard.
       * @param supabaseKey The unique Supabase Key which is supplied when you create a new project in your project dashboard.
       * @param options.db.schema You can switch in between schemas. The schema needs to be on the list of exposed schemas inside Supabase.
       * @param options.auth.autoRefreshToken Set to "true" if you want to automatically refresh the token before expiring.
       * @param options.auth.persistSession Set to "true" if you want to automatically save the user session into local storage.
       * @param options.auth.detectSessionInUrl Set to "true" if you want to automatically detects OAuth grants in the URL and signs in the user.
       * @param options.realtime Options passed along to realtime-js constructor.
       * @param options.global.fetch A custom fetch implementation.
       * @param options.global.headers Any additional headers to send with each network request.
       */
      constructor(supabaseUrl, supabaseKey, options2) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        this.supabaseUrl = supabaseUrl;
        this.supabaseKey = supabaseKey;
        if (!supabaseUrl)
          throw new Error("supabaseUrl is required.");
        if (!supabaseKey)
          throw new Error("supabaseKey is required.");
        const _supabaseUrl = stripTrailingSlash(supabaseUrl);
        this.realtimeUrl = `${_supabaseUrl}/realtime/v1`.replace(/^http/i, "ws");
        this.authUrl = `${_supabaseUrl}/auth/v1`;
        this.storageUrl = `${_supabaseUrl}/storage/v1`;
        this.functionsUrl = `${_supabaseUrl}/functions/v1`;
        const defaultStorageKey = `sb-${new URL(this.authUrl).hostname.split(".")[0]}-auth-token`;
        const DEFAULTS = {
          db: DEFAULT_DB_OPTIONS,
          realtime: DEFAULT_REALTIME_OPTIONS,
          auth: Object.assign(Object.assign({}, DEFAULT_AUTH_OPTIONS), { storageKey: defaultStorageKey }),
          global: DEFAULT_GLOBAL_OPTIONS
        };
        const settings = applySettingDefaults(options2 !== null && options2 !== void 0 ? options2 : {}, DEFAULTS);
        this.storageKey = (_b = (_a = settings.auth) === null || _a === void 0 ? void 0 : _a.storageKey) !== null && _b !== void 0 ? _b : "";
        this.headers = (_d = (_c = settings.global) === null || _c === void 0 ? void 0 : _c.headers) !== null && _d !== void 0 ? _d : {};
        this.auth = this._initSupabaseAuthClient((_e = settings.auth) !== null && _e !== void 0 ? _e : {}, this.headers, (_f = settings.global) === null || _f === void 0 ? void 0 : _f.fetch);
        this.fetch = fetchWithAuth(supabaseKey, this._getAccessToken.bind(this), (_g = settings.global) === null || _g === void 0 ? void 0 : _g.fetch);
        this.realtime = this._initRealtimeClient(Object.assign({ headers: this.headers }, settings.realtime));
        this.rest = new PostgrestClient(`${_supabaseUrl}/rest/v1`, {
          headers: this.headers,
          schema: (_h = settings.db) === null || _h === void 0 ? void 0 : _h.schema,
          fetch: this.fetch
        });
        this._listenForAuthEvents();
      }
      /**
       * Supabase Functions allows you to deploy and invoke edge functions.
       */
      get functions() {
        return new FunctionsClient(this.functionsUrl, {
          headers: this.headers,
          customFetch: this.fetch
        });
      }
      /**
       * Supabase Storage allows you to manage user-generated content, such as photos or videos.
       */
      get storage() {
        return new StorageClient(this.storageUrl, this.headers, this.fetch);
      }
      /**
       * Perform a query on a table or a view.
       *
       * @param relation - The table or view name to query
       */
      from(relation) {
        return this.rest.from(relation);
      }
      // NOTE: signatures must be kept in sync with PostgrestClient.schema
      /**
       * Select a schema to query or perform an function (rpc) call.
       *
       * The schema needs to be on the list of exposed schemas inside Supabase.
       *
       * @param schema - The schema to query
       */
      schema(schema) {
        return this.rest.schema(schema);
      }
      // NOTE: signatures must be kept in sync with PostgrestClient.rpc
      /**
       * Perform a function call.
       *
       * @param fn - The function name to call
       * @param args - The arguments to pass to the function call
       * @param options - Named parameters
       * @param options.head - When set to `true`, `data` will not be returned.
       * Useful if you only need the count.
       * @param options.count - Count algorithm to use to count rows returned by the
       * function. Only applicable for [set-returning
       * functions](https://www.postgresql.org/docs/current/functions-srf.html).
       *
       * `"exact"`: Exact but slow count algorithm. Performs a `COUNT(*)` under the
       * hood.
       *
       * `"planned"`: Approximated but fast count algorithm. Uses the Postgres
       * statistics under the hood.
       *
       * `"estimated"`: Uses exact count for low numbers and planned count for high
       * numbers.
       */
      rpc(fn, args = {}, options2 = {}) {
        return this.rest.rpc(fn, args, options2);
      }
      /**
       * Creates a Realtime channel with Broadcast, Presence, and Postgres Changes.
       *
       * @param {string} name - The name of the Realtime channel.
       * @param {Object} opts - The options to pass to the Realtime channel.
       *
       */
      channel(name, opts = { config: {} }) {
        return this.realtime.channel(name, opts);
      }
      /**
       * Returns all Realtime channels.
       */
      getChannels() {
        return this.realtime.getChannels();
      }
      /**
       * Unsubscribes and removes Realtime channel from Realtime client.
       *
       * @param {RealtimeChannel} channel - The name of the Realtime channel.
       *
       */
      removeChannel(channel) {
        return this.realtime.removeChannel(channel);
      }
      /**
       * Unsubscribes and removes all Realtime channels from Realtime client.
       */
      removeAllChannels() {
        return this.realtime.removeAllChannels();
      }
      _getAccessToken() {
        var _a, _b;
        return __awaiter7(this, void 0, void 0, function* () {
          const { data: data2 } = yield this.auth.getSession();
          return (_b = (_a = data2.session) === null || _a === void 0 ? void 0 : _a.access_token) !== null && _b !== void 0 ? _b : null;
        });
      }
      _initSupabaseAuthClient({ autoRefreshToken, persistSession, detectSessionInUrl, storage, storageKey, flowType, debug }, headers2, fetch3) {
        const authHeaders = {
          Authorization: `Bearer ${this.supabaseKey}`,
          apikey: `${this.supabaseKey}`
        };
        return new SupabaseAuthClient({
          url: this.authUrl,
          headers: Object.assign(Object.assign({}, authHeaders), headers2),
          storageKey,
          autoRefreshToken,
          persistSession,
          detectSessionInUrl,
          storage,
          flowType,
          debug,
          fetch: fetch3
        });
      }
      _initRealtimeClient(options2) {
        return new RealtimeClient(this.realtimeUrl, Object.assign(Object.assign({}, options2), { params: Object.assign({ apikey: this.supabaseKey }, options2 === null || options2 === void 0 ? void 0 : options2.params) }));
      }
      _listenForAuthEvents() {
        let data2 = this.auth.onAuthStateChange((event, session) => {
          this._handleTokenChanged(event, "CLIENT", session === null || session === void 0 ? void 0 : session.access_token);
        });
        return data2;
      }
      _handleTokenChanged(event, source2, token) {
        if ((event === "TOKEN_REFRESHED" || event === "SIGNED_IN") && this.changedAccessToken !== token) {
          this.realtime.setAuth(token !== null && token !== void 0 ? token : null);
          this.changedAccessToken = token;
        } else if (event === "SIGNED_OUT") {
          this.realtime.setAuth(this.supabaseKey);
          if (source2 == "STORAGE")
            this.auth.signOut();
          this.changedAccessToken = void 0;
        }
      }
    };
  }
});

// node_modules/@supabase/supabase-js/dist/module/index.js
var createClient;
var init_module6 = __esm({
  "node_modules/@supabase/supabase-js/dist/module/index.js"() {
    init_SupabaseClient();
    init_module5();
    init_module3();
    createClient = (supabaseUrl, supabaseKey, options2) => {
      return new SupabaseClient(supabaseUrl, supabaseKey, options2);
    };
  }
});

// node_modules/ramda/es/internal/_isPlaceholder.js
function _isPlaceholder(a2) {
  return a2 != null && typeof a2 === "object" && a2["@@functional/placeholder"] === true;
}
var init_isPlaceholder = __esm({
  "node_modules/ramda/es/internal/_isPlaceholder.js"() {
  }
});

// node_modules/ramda/es/internal/_curry1.js
function _curry1(fn) {
  return function f1(a2) {
    if (arguments.length === 0 || _isPlaceholder(a2)) {
      return f1;
    } else {
      return fn.apply(this, arguments);
    }
  };
}
var init_curry1 = __esm({
  "node_modules/ramda/es/internal/_curry1.js"() {
    init_isPlaceholder();
  }
});

// node_modules/ramda/es/internal/_curry2.js
function _curry2(fn) {
  return function f2(a2, b) {
    switch (arguments.length) {
      case 0:
        return f2;
      case 1:
        return _isPlaceholder(a2) ? f2 : _curry1(function(_b) {
          return fn(a2, _b);
        });
      default:
        return _isPlaceholder(a2) && _isPlaceholder(b) ? f2 : _isPlaceholder(a2) ? _curry1(function(_a) {
          return fn(_a, b);
        }) : _isPlaceholder(b) ? _curry1(function(_b) {
          return fn(a2, _b);
        }) : fn(a2, b);
    }
  };
}
var init_curry2 = __esm({
  "node_modules/ramda/es/internal/_curry2.js"() {
    init_curry1();
    init_isPlaceholder();
  }
});

// node_modules/ramda/es/internal/_curry3.js
function _curry3(fn) {
  return function f3(a2, b, c) {
    switch (arguments.length) {
      case 0:
        return f3;
      case 1:
        return _isPlaceholder(a2) ? f3 : _curry2(function(_b, _c) {
          return fn(a2, _b, _c);
        });
      case 2:
        return _isPlaceholder(a2) && _isPlaceholder(b) ? f3 : _isPlaceholder(a2) ? _curry2(function(_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) ? _curry2(function(_b, _c) {
          return fn(a2, _b, _c);
        }) : _curry1(function(_c) {
          return fn(a2, b, _c);
        });
      default:
        return _isPlaceholder(a2) && _isPlaceholder(b) && _isPlaceholder(c) ? f3 : _isPlaceholder(a2) && _isPlaceholder(b) ? _curry2(function(_a, _b) {
          return fn(_a, _b, c);
        }) : _isPlaceholder(a2) && _isPlaceholder(c) ? _curry2(function(_a, _c) {
          return fn(_a, b, _c);
        }) : _isPlaceholder(b) && _isPlaceholder(c) ? _curry2(function(_b, _c) {
          return fn(a2, _b, _c);
        }) : _isPlaceholder(a2) ? _curry1(function(_a) {
          return fn(_a, b, c);
        }) : _isPlaceholder(b) ? _curry1(function(_b) {
          return fn(a2, _b, c);
        }) : _isPlaceholder(c) ? _curry1(function(_c) {
          return fn(a2, b, _c);
        }) : fn(a2, b, c);
    }
  };
}
var init_curry3 = __esm({
  "node_modules/ramda/es/internal/_curry3.js"() {
    init_curry1();
    init_curry2();
    init_isPlaceholder();
  }
});

// node_modules/ramda/es/internal/_has.js
function _has(prop, obj) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}
var init_has = __esm({
  "node_modules/ramda/es/internal/_has.js"() {
  }
});

// node_modules/ramda/es/internal/_isObject.js
function _isObject(x2) {
  return Object.prototype.toString.call(x2) === "[object Object]";
}
var init_isObject = __esm({
  "node_modules/ramda/es/internal/_isObject.js"() {
  }
});

// node_modules/ramda/es/mergeWithKey.js
var mergeWithKey, mergeWithKey_default;
var init_mergeWithKey = __esm({
  "node_modules/ramda/es/mergeWithKey.js"() {
    init_curry3();
    init_has();
    mergeWithKey = /* @__PURE__ */ _curry3(function mergeWithKey2(fn, l2, r2) {
      var result = {};
      var k;
      l2 = l2 || {};
      r2 = r2 || {};
      for (k in l2) {
        if (_has(k, l2)) {
          result[k] = _has(k, r2) ? fn(k, l2[k], r2[k]) : l2[k];
        }
      }
      for (k in r2) {
        if (_has(k, r2) && !_has(k, result)) {
          result[k] = r2[k];
        }
      }
      return result;
    });
    mergeWithKey_default = mergeWithKey;
  }
});

// node_modules/ramda/es/mergeDeepWithKey.js
var mergeDeepWithKey, mergeDeepWithKey_default;
var init_mergeDeepWithKey = __esm({
  "node_modules/ramda/es/mergeDeepWithKey.js"() {
    init_curry3();
    init_isObject();
    init_mergeWithKey();
    mergeDeepWithKey = /* @__PURE__ */ _curry3(function mergeDeepWithKey2(fn, lObj, rObj) {
      return mergeWithKey_default(function(k, lVal, rVal) {
        if (_isObject(lVal) && _isObject(rVal)) {
          return mergeDeepWithKey2(fn, lVal, rVal);
        } else {
          return fn(k, lVal, rVal);
        }
      }, lObj, rObj);
    });
    mergeDeepWithKey_default = mergeDeepWithKey;
  }
});

// node_modules/ramda/es/mergeDeepRight.js
var mergeDeepRight, mergeDeepRight_default;
var init_mergeDeepRight = __esm({
  "node_modules/ramda/es/mergeDeepRight.js"() {
    init_curry2();
    init_mergeDeepWithKey();
    mergeDeepRight = /* @__PURE__ */ _curry2(function mergeDeepRight2(lObj, rObj) {
      return mergeDeepWithKey_default(function(k, lVal, rVal) {
        return rVal;
      }, lObj, rObj);
    });
    mergeDeepRight_default = mergeDeepRight;
  }
});

// node_modules/ramda/es/index.js
var init_es = __esm({
  "node_modules/ramda/es/index.js"() {
    init_mergeDeepRight();
  }
});

// node_modules/@supabase/ssr/node_modules/cookie/index.js
var require_cookie = __commonJS({
  "node_modules/@supabase/ssr/node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse5;
    exports.serialize = serialize4;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse5(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode;
      var index21 = 0;
      while (index21 < str.length) {
        var eqIdx = str.indexOf("=", index21);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index21);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index21 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index21, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index21 = endIdx + 1;
      }
      return obj;
    }
    function serialize4(name, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/@supabase/ssr/dist/index.mjs
function isBrowser2() {
  return typeof window !== "undefined" && typeof window.document !== "undefined";
}
function createChunks(key2, value, chunkSize) {
  const resolvedChunkSize = chunkSize ?? MAX_CHUNK_SIZE;
  let encodedValue = encodeURIComponent(value);
  if (encodedValue.length <= resolvedChunkSize) {
    return [{ name: key2, value }];
  }
  const chunks = [];
  while (encodedValue.length > 0) {
    let encodedChunkHead = encodedValue.slice(0, resolvedChunkSize);
    const lastEscapePos = encodedChunkHead.lastIndexOf("%");
    if (lastEscapePos > resolvedChunkSize - 3) {
      encodedChunkHead = encodedChunkHead.slice(0, lastEscapePos);
    }
    let valueHead = "";
    while (encodedChunkHead.length > 0) {
      try {
        valueHead = decodeURIComponent(encodedChunkHead);
        break;
      } catch (error) {
        if (error instanceof URIError && encodedChunkHead.at(-3) === "%" && encodedChunkHead.length > 3) {
          encodedChunkHead = encodedChunkHead.slice(0, encodedChunkHead.length - 3);
        } else {
          throw error;
        }
      }
    }
    chunks.push(valueHead);
    encodedValue = encodedValue.slice(encodedChunkHead.length);
  }
  return chunks.map((value2, i2) => ({ name: `${key2}.${i2}`, value: value2 }));
}
async function combineChunks(key2, retrieveChunk) {
  const value = await retrieveChunk(key2);
  if (value) {
    return value;
  }
  let values = [];
  for (let i2 = 0; ; i2++) {
    const chunkName = `${key2}.${i2}`;
    const chunk = await retrieveChunk(chunkName);
    if (!chunk) {
      break;
    }
    values.push(chunk);
  }
  if (values.length > 0) {
    return values.join("");
  }
}
async function deleteChunks(key2, retrieveChunk, removeChunk) {
  const value = await retrieveChunk(key2);
  if (value) {
    await removeChunk(key2);
    return;
  }
  for (let i2 = 0; ; i2++) {
    const chunkName = `${key2}.${i2}`;
    const chunk = await retrieveChunk(chunkName);
    if (!chunk) {
      break;
    }
    await removeChunk(chunkName);
  }
}
function createBrowserClient(supabaseUrl, supabaseKey, options2) {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      `Your project's URL and Key are required to create a Supabase client!

Check your Supabase project's API settings to find these values

https://supabase.com/dashboard/project/_/settings/api`
    );
  }
  let cookies = {};
  let isSingleton = true;
  let cookieOptions;
  let userDefinedClientOptions;
  if (options2) {
    ({ cookies, isSingleton = true, cookieOptions, ...userDefinedClientOptions } = options2);
  }
  const cookieClientOptions = {
    global: {
      headers: {
        "X-Client-Info": `${"supabase-ssr"}/${"0.1.0"}`
      }
    },
    auth: {
      flowType: "pkce",
      autoRefreshToken: isBrowser2(),
      detectSessionInUrl: isBrowser2(),
      persistSession: true,
      storage: {
        // this client is used on the browser so cookies can be trusted
        isServer: false,
        getItem: async (key2) => {
          const chunkedCookie = await combineChunks(key2, async (chunkName) => {
            if (typeof cookies.get === "function") {
              return await cookies.get(chunkName);
            }
            if (isBrowser2()) {
              const cookie = (0, import_cookie2.parse)(document.cookie);
              return cookie[chunkName];
            }
          });
          return chunkedCookie;
        },
        setItem: async (key2, value) => {
          const chunks = await createChunks(key2, value);
          await Promise.all(
            chunks.map(async (chunk) => {
              if (typeof cookies.set === "function") {
                await cookies.set(chunk.name, chunk.value, {
                  ...DEFAULT_COOKIE_OPTIONS,
                  ...cookieOptions,
                  maxAge: DEFAULT_COOKIE_OPTIONS.maxAge
                });
              } else {
                if (isBrowser2()) {
                  document.cookie = (0, import_cookie2.serialize)(chunk.name, chunk.value, {
                    ...DEFAULT_COOKIE_OPTIONS,
                    ...cookieOptions,
                    maxAge: DEFAULT_COOKIE_OPTIONS.maxAge
                  });
                }
              }
            })
          );
        },
        removeItem: async (key2) => {
          if (typeof cookies.remove === "function" && typeof cookies.get !== "function") {
            console.log(
              "Removing chunked cookie without a `get` method is not supported.\n\n	When you call the `createBrowserClient` function from the `@supabase/ssr` package, make sure you declare both a `get` and `remove` method on the `cookies` object.\n\nhttps://supabase.com/docs/guides/auth/server-side/creating-a-client"
            );
            return;
          }
          await deleteChunks(
            key2,
            async (chunkName) => {
              if (typeof cookies.get === "function") {
                return await cookies.get(chunkName);
              }
              if (isBrowser2()) {
                const documentCookies = (0, import_cookie2.parse)(document.cookie);
                return documentCookies[chunkName];
              }
            },
            async (chunkName) => {
              if (typeof cookies.remove === "function") {
                await cookies.remove(chunkName, {
                  ...DEFAULT_COOKIE_OPTIONS,
                  ...cookieOptions,
                  maxAge: 0
                });
              } else {
                if (isBrowser2()) {
                  document.cookie = (0, import_cookie2.serialize)(chunkName, "", {
                    ...DEFAULT_COOKIE_OPTIONS,
                    ...cookieOptions,
                    maxAge: 0
                  });
                }
              }
            }
          );
        }
      }
    }
  };
  const clientOptions = mergeDeepRight_default(
    cookieClientOptions,
    userDefinedClientOptions
  );
  if (isSingleton) {
    const browser = isBrowser2();
    if (browser && cachedBrowserClient) {
      return cachedBrowserClient;
    }
    const client = createClient(
      supabaseUrl,
      supabaseKey,
      clientOptions
    );
    if (browser) {
      cachedBrowserClient = client;
    }
    return client;
  }
  return createClient(supabaseUrl, supabaseKey, clientOptions);
}
function createServerClient(supabaseUrl, supabaseKey, options2) {
  if (!supabaseUrl || !supabaseKey) {
    throw new Error(
      `Your project's URL and Key are required to create a Supabase client!

Check your Supabase project's API settings to find these values

https://supabase.com/dashboard/project/_/settings/api`
    );
  }
  const { cookies, cookieOptions, ...userDefinedClientOptions } = options2;
  if (cookieOptions == null ? void 0 : cookieOptions.name) {
    userDefinedClientOptions.auth = {
      ...userDefinedClientOptions.auth,
      storageKey: cookieOptions.name
    };
  }
  const cookieClientOptions = {
    global: {
      headers: {
        "X-Client-Info": `${"supabase-ssr"}/${"0.1.0"}`
      }
    },
    auth: {
      flowType: "pkce",
      autoRefreshToken: isBrowser2(),
      detectSessionInUrl: isBrowser2(),
      persistSession: true,
      storage: {
        // to signal to the libraries that these cookies are coming from a server environment and their value should not be trusted
        isServer: true,
        getItem: async (key2) => {
          const chunkedCookie = await combineChunks(key2, async (chunkName) => {
            if (typeof cookies.get === "function") {
              return await cookies.get(chunkName);
            }
          });
          return chunkedCookie;
        },
        setItem: async (key2, value) => {
          const chunks = createChunks(key2, value);
          await Promise.all(
            chunks.map(async (chunk) => {
              if (typeof cookies.set === "function") {
                await cookies.set(chunk.name, chunk.value, {
                  ...DEFAULT_COOKIE_OPTIONS,
                  ...cookieOptions,
                  maxAge: DEFAULT_COOKIE_OPTIONS.maxAge
                });
              }
            })
          );
        },
        removeItem: async (key2) => {
          if (typeof cookies.remove === "function" && typeof cookies.get !== "function") {
            console.log(
              "Removing chunked cookie without a `get` method is not supported.\n\n	When you call the `createServerClient` function from the `@supabase/ssr` package, make sure you declare both a `get` and `remove` method on the `cookies` object.\n\nhttps://supabase.com/docs/guides/auth/server-side/creating-a-client"
            );
            return;
          }
          deleteChunks(
            key2,
            async (chunkName) => {
              if (typeof cookies.get === "function") {
                return await cookies.get(chunkName);
              }
            },
            async (chunkName) => {
              if (typeof cookies.remove === "function") {
                return await cookies.remove(chunkName, {
                  ...DEFAULT_COOKIE_OPTIONS,
                  ...cookieOptions,
                  maxAge: 0
                });
              }
            }
          );
        }
      }
    }
  };
  const clientOptions = mergeDeepRight_default(
    cookieClientOptions,
    userDefinedClientOptions
  );
  return createClient(supabaseUrl, supabaseKey, clientOptions);
}
var import_cookie, import_cookie2, DEFAULT_COOKIE_OPTIONS, MAX_CHUNK_SIZE, cachedBrowserClient;
var init_dist = __esm({
  "node_modules/@supabase/ssr/dist/index.mjs"() {
    init_module6();
    init_es();
    import_cookie = __toESM(require_cookie(), 1);
    import_cookie2 = __toESM(require_cookie(), 1);
    init_module6();
    init_es();
    DEFAULT_COOKIE_OPTIONS = {
      path: "/",
      sameSite: "lax",
      httpOnly: false,
      maxAge: 60 * 60 * 24 * 365 * 1e3
    };
    MAX_CHUNK_SIZE = 3180;
  }
});

// .svelte-kit/output/server/chunks/hooks.server.js
var hooks_server_exports = {};
__export(hooks_server_exports, {
  handle: () => handle
});
var handle;
var init_hooks_server = __esm({
  ".svelte-kit/output/server/chunks/hooks.server.js"() {
    init_public();
    init_dist();
    handle = async ({ event, resolve: resolve2 }) => {
      event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        cookies: {
          get: (key2) => event.cookies.get(key2),
          set: (key2, value, options2) => {
            event.cookies.set(key2, value, { ...options2, path: "/", sameSite: "none", secure: true });
          },
          remove: (key2, options2) => {
            event.cookies.delete(key2, { ...options2, path: "/", sameSite: "none", secure: true });
          }
        }
      });
      event.locals.getSession = async () => {
        const {
          data: { session }
        } = await event.locals.supabase.auth.getSession();
        return session;
      };
      return resolve2(event, {
        filterSerializedResponseHeaders(name) {
          return name === "content-range";
        }
      });
    };
  }
});

// .svelte-kit/output/server/chunks/index.js
function redirect(status, location) {
  if (isNaN(status) || status < 300 || status > 308) {
    throw new Error("Invalid status code");
  }
  throw new Redirect(
    // @ts-ignore
    status,
    location.toString()
  );
}
function json(data2, init2) {
  const body2 = JSON.stringify(data2);
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    headers2.set("content-length", encoder.encode(body2).byteLength.toString());
  }
  if (!headers2.has("content-type")) {
    headers2.set("content-type", "application/json");
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
function text(body2, init2) {
  const headers2 = new Headers(init2?.headers);
  if (!headers2.has("content-length")) {
    const encoded = encoder.encode(body2);
    headers2.set("content-length", encoded.byteLength.toString());
    return new Response(encoded, {
      ...init2,
      headers: headers2
    });
  }
  return new Response(body2, {
    ...init2,
    headers: headers2
  });
}
function fail(status, data2) {
  return new ActionFailure(status, data2);
}
var HttpError, Redirect, SvelteKitError, ActionFailure, encoder;
var init_chunks = __esm({
  ".svelte-kit/output/server/chunks/index.js"() {
    HttpError = class {
      /**
       * @param {number} status
       * @param {{message: string} extends App.Error ? (App.Error | string | undefined) : App.Error} body
       */
      constructor(status, body2) {
        this.status = status;
        if (typeof body2 === "string") {
          this.body = { message: body2 };
        } else if (body2) {
          this.body = body2;
        } else {
          this.body = { message: `Error: ${status}` };
        }
      }
      toString() {
        return JSON.stringify(this.body);
      }
    };
    Redirect = class {
      /**
       * @param {300 | 301 | 302 | 303 | 304 | 305 | 306 | 307 | 308} status
       * @param {string} location
       */
      constructor(status, location) {
        this.status = status;
        this.location = location;
      }
    };
    SvelteKitError = class extends Error {
      /**
       * @param {number} status
       * @param {string} text
       * @param {string} message
       */
      constructor(status, text2, message) {
        super(message);
        this.status = status;
        this.text = text2;
      }
    };
    ActionFailure = class {
      /**
       * @param {number} status
       * @param {T} data
       */
      constructor(status, data2) {
        this.status = status;
        this.data = data2;
      }
    };
    encoder = new TextEncoder();
  }
});

// .svelte-kit/output/server/chunks/exports.js
function resolve(base2, path) {
  if (path[0] === "/" && path[1] === "/")
    return path;
  let url = new URL(base2, internal);
  url = new URL(path, url);
  return url.protocol === internal.protocol ? url.pathname + url.search + url.hash : url.href;
}
function normalize_path(path, trailing_slash) {
  if (path === "/" || trailing_slash === "ignore")
    return path;
  if (trailing_slash === "never") {
    return path.endsWith("/") ? path.slice(0, -1) : path;
  } else if (trailing_slash === "always" && !path.endsWith("/")) {
    return path + "/";
  }
  return path;
}
function decode_pathname(pathname) {
  return pathname.split("%25").map(decodeURI).join("%25");
}
function decode_params(params) {
  for (const key2 in params) {
    params[key2] = decodeURIComponent(params[key2]);
  }
  return params;
}
function make_trackable(url, callback, search_params_callback) {
  const tracked = new URL(url);
  Object.defineProperty(tracked, "searchParams", {
    value: new Proxy(tracked.searchParams, {
      get(obj, key2) {
        if (key2 === "get" || key2 === "getAll" || key2 === "has") {
          return (param) => {
            search_params_callback(param);
            return obj[key2](param);
          };
        }
        callback();
        const value = Reflect.get(obj, key2);
        return typeof value === "function" ? value.bind(obj) : value;
      }
    }),
    enumerable: true,
    configurable: true
  });
  for (const property of tracked_url_properties) {
    Object.defineProperty(tracked, property, {
      get() {
        callback();
        return url[property];
      },
      enumerable: true,
      configurable: true
    });
  }
  {
    tracked[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(url, opts);
    };
  }
  {
    disable_hash(tracked);
  }
  return tracked;
}
function disable_hash(url) {
  allow_nodejs_console_log(url);
  Object.defineProperty(url, "hash", {
    get() {
      throw new Error(
        "Cannot access event.url.hash. Consider using `$page.url.hash` inside a component instead"
      );
    }
  });
}
function disable_search(url) {
  allow_nodejs_console_log(url);
  for (const property of ["search", "searchParams"]) {
    Object.defineProperty(url, property, {
      get() {
        throw new Error(`Cannot access url.${property} on a page with prerendering enabled`);
      }
    });
  }
}
function allow_nodejs_console_log(url) {
  {
    url[Symbol.for("nodejs.util.inspect.custom")] = (depth, opts, inspect) => {
      return inspect(new URL(url), opts);
    };
  }
}
function has_data_suffix(pathname) {
  return pathname.endsWith(DATA_SUFFIX) || pathname.endsWith(HTML_DATA_SUFFIX);
}
function add_data_suffix(pathname) {
  if (pathname.endsWith(".html"))
    return pathname.replace(/\.html$/, HTML_DATA_SUFFIX);
  return pathname.replace(/\/$/, "") + DATA_SUFFIX;
}
function strip_data_suffix(pathname) {
  if (pathname.endsWith(HTML_DATA_SUFFIX)) {
    return pathname.slice(0, -HTML_DATA_SUFFIX.length) + ".html";
  }
  return pathname.slice(0, -DATA_SUFFIX.length);
}
function validator(expected) {
  function validate(module, file) {
    if (!module)
      return;
    for (const key2 in module) {
      if (key2[0] === "_" || expected.has(key2))
        continue;
      const values = [...expected.values()];
      const hint = hint_for_supported_files(key2, file?.slice(file.lastIndexOf("."))) ?? `valid exports are ${values.join(", ")}, or anything with a '_' prefix`;
      throw new Error(`Invalid export '${key2}'${file ? ` in ${file}` : ""} (${hint})`);
    }
  }
  return validate;
}
function hint_for_supported_files(key2, ext = ".js") {
  const supported_files = [];
  if (valid_layout_exports.has(key2)) {
    supported_files.push(`+layout${ext}`);
  }
  if (valid_page_exports.has(key2)) {
    supported_files.push(`+page${ext}`);
  }
  if (valid_layout_server_exports.has(key2)) {
    supported_files.push(`+layout.server${ext}`);
  }
  if (valid_page_server_exports.has(key2)) {
    supported_files.push(`+page.server${ext}`);
  }
  if (valid_server_exports.has(key2)) {
    supported_files.push(`+server${ext}`);
  }
  if (supported_files.length > 0) {
    return `'${key2}' is a valid export in ${supported_files.slice(0, -1).join(", ")}${supported_files.length > 1 ? " or " : ""}${supported_files.at(-1)}`;
  }
}
var internal, tracked_url_properties, DATA_SUFFIX, HTML_DATA_SUFFIX, valid_layout_exports, valid_page_exports, valid_layout_server_exports, valid_page_server_exports, valid_server_exports, validate_layout_exports, validate_page_exports, validate_layout_server_exports, validate_page_server_exports, validate_server_exports;
var init_exports = __esm({
  ".svelte-kit/output/server/chunks/exports.js"() {
    internal = new URL("sveltekit-internal://");
    tracked_url_properties = /** @type {const} */
    [
      "href",
      "pathname",
      "search",
      "toString",
      "toJSON"
    ];
    DATA_SUFFIX = "/__data.json";
    HTML_DATA_SUFFIX = ".html__data.json";
    valid_layout_exports = /* @__PURE__ */ new Set([
      "load",
      "prerender",
      "csr",
      "ssr",
      "trailingSlash",
      "config"
    ]);
    valid_page_exports = /* @__PURE__ */ new Set([...valid_layout_exports, "entries"]);
    valid_layout_server_exports = /* @__PURE__ */ new Set([...valid_layout_exports]);
    valid_page_server_exports = /* @__PURE__ */ new Set([...valid_layout_server_exports, "actions", "entries"]);
    valid_server_exports = /* @__PURE__ */ new Set([
      "GET",
      "POST",
      "PATCH",
      "PUT",
      "DELETE",
      "OPTIONS",
      "HEAD",
      "fallback",
      "prerender",
      "trailingSlash",
      "config",
      "entries"
    ]);
    validate_layout_exports = validator(valid_layout_exports);
    validate_page_exports = validator(valid_page_exports);
    validate_layout_server_exports = validator(valid_layout_server_exports);
    validate_page_server_exports = validator(valid_page_server_exports);
    validate_server_exports = validator(valid_server_exports);
  }
});

// node_modules/devalue/src/utils.js
function is_primitive(thing) {
  return Object(thing) !== thing;
}
function is_plain_object(thing) {
  const proto = Object.getPrototypeOf(thing);
  return proto === Object.prototype || proto === null || Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names;
}
function get_type(thing) {
  return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
  switch (char) {
    case '"':
      return '\\"';
    case "<":
      return "\\u003C";
    case "\\":
      return "\\\\";
    case "\n":
      return "\\n";
    case "\r":
      return "\\r";
    case "	":
      return "\\t";
    case "\b":
      return "\\b";
    case "\f":
      return "\\f";
    case "\u2028":
      return "\\u2028";
    case "\u2029":
      return "\\u2029";
    default:
      return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
  }
}
function stringify_string(str) {
  let result = "";
  let last_pos = 0;
  const len = str.length;
  for (let i2 = 0; i2 < len; i2 += 1) {
    const char = str[i2];
    const replacement = get_escaped_char(char);
    if (replacement) {
      result += str.slice(last_pos, i2) + replacement;
      last_pos = i2 + 1;
    }
  }
  return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}
var escaped, DevalueError, object_proto_names;
var init_utils = __esm({
  "node_modules/devalue/src/utils.js"() {
    escaped = {
      "<": "\\u003C",
      "\\": "\\\\",
      "\b": "\\b",
      "\f": "\\f",
      "\n": "\\n",
      "\r": "\\r",
      "	": "\\t",
      "\u2028": "\\u2028",
      "\u2029": "\\u2029"
    };
    DevalueError = class extends Error {
      /**
       * @param {string} message
       * @param {string[]} keys
       */
      constructor(message, keys) {
        super(message);
        this.name = "DevalueError";
        this.path = keys.join("");
      }
    };
    object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(
      Object.prototype
    ).sort().join("\0");
  }
});

// node_modules/devalue/src/uneval.js
function uneval(value, replacer) {
  const counts = /* @__PURE__ */ new Map();
  const keys = [];
  const custom = /* @__PURE__ */ new Map();
  function walk(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (!is_primitive(thing)) {
      if (counts.has(thing)) {
        counts.set(thing, counts.get(thing) + 1);
        return;
      }
      counts.set(thing, 1);
      if (replacer) {
        const str2 = replacer(thing);
        if (typeof str2 === "string") {
          custom.set(thing, str2);
          return;
        }
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "BigInt":
        case "String":
        case "Boolean":
        case "Date":
        case "RegExp":
          return;
        case "Array":
          thing.forEach((value2, i2) => {
            keys.push(`[${i2}]`);
            walk(value2);
            keys.pop();
          });
          break;
        case "Set":
          Array.from(thing).forEach(walk);
          break;
        case "Map":
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive(key2) : "..."})`
            );
            walk(value2);
            keys.pop();
          }
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          for (const key2 in thing) {
            keys.push(`.${key2}`);
            walk(thing[key2]);
            keys.pop();
          }
      }
    }
  }
  walk(value);
  const names = /* @__PURE__ */ new Map();
  Array.from(counts).filter((entry) => entry[1] > 1).sort((a2, b) => b[1] - a2[1]).forEach((entry, i2) => {
    names.set(entry[0], get_name(i2));
  });
  function stringify3(thing) {
    if (names.has(thing)) {
      return names.get(thing);
    }
    if (is_primitive(thing)) {
      return stringify_primitive(thing);
    }
    if (custom.has(thing)) {
      return custom.get(thing);
    }
    const type = get_type(thing);
    switch (type) {
      case "Number":
      case "String":
      case "Boolean":
        return `Object(${stringify3(thing.valueOf())})`;
      case "RegExp":
        return `new RegExp(${stringify_string(thing.source)}, "${thing.flags}")`;
      case "Date":
        return `new Date(${thing.getTime()})`;
      case "Array":
        const members = (
          /** @type {any[]} */
          thing.map(
            (v, i2) => i2 in thing ? stringify3(v) : ""
          )
        );
        const tail = thing.length === 0 || thing.length - 1 in thing ? "" : ",";
        return `[${members.join(",")}${tail}]`;
      case "Set":
      case "Map":
        return `new ${type}([${Array.from(thing).map(stringify3).join(",")}])`;
      default:
        const obj = `{${Object.keys(thing).map((key2) => `${safe_key(key2)}:${stringify3(thing[key2])}`).join(",")}}`;
        const proto = Object.getPrototypeOf(thing);
        if (proto === null) {
          return Object.keys(thing).length > 0 ? `Object.assign(Object.create(null),${obj})` : `Object.create(null)`;
        }
        return obj;
    }
  }
  const str = stringify3(value);
  if (names.size) {
    const params = [];
    const statements = [];
    const values = [];
    names.forEach((name, thing) => {
      params.push(name);
      if (custom.has(thing)) {
        values.push(
          /** @type {string} */
          custom.get(thing)
        );
        return;
      }
      if (is_primitive(thing)) {
        values.push(stringify_primitive(thing));
        return;
      }
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          values.push(`Object(${stringify3(thing.valueOf())})`);
          break;
        case "RegExp":
          values.push(thing.toString());
          break;
        case "Date":
          values.push(`new Date(${thing.getTime()})`);
          break;
        case "Array":
          values.push(`Array(${thing.length})`);
          thing.forEach((v, i2) => {
            statements.push(`${name}[${i2}]=${stringify3(v)}`);
          });
          break;
        case "Set":
          values.push(`new Set`);
          statements.push(
            `${name}.${Array.from(thing).map((v) => `add(${stringify3(v)})`).join(".")}`
          );
          break;
        case "Map":
          values.push(`new Map`);
          statements.push(
            `${name}.${Array.from(thing).map(([k, v]) => `set(${stringify3(k)}, ${stringify3(v)})`).join(".")}`
          );
          break;
        default:
          values.push(
            Object.getPrototypeOf(thing) === null ? "Object.create(null)" : "{}"
          );
          Object.keys(thing).forEach((key2) => {
            statements.push(
              `${name}${safe_prop(key2)}=${stringify3(thing[key2])}`
            );
          });
      }
    });
    statements.push(`return ${str}`);
    return `(function(${params.join(",")}){${statements.join(
      ";"
    )}}(${values.join(",")}))`;
  } else {
    return str;
  }
}
function get_name(num) {
  let name = "";
  do {
    name = chars[num % chars.length] + name;
    num = ~~(num / chars.length) - 1;
  } while (num >= 0);
  return reserved.test(name) ? `${name}0` : name;
}
function escape_unsafe_char(c) {
  return escaped[c] || c;
}
function escape_unsafe_chars(str) {
  return str.replace(unsafe_chars, escape_unsafe_char);
}
function safe_key(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? key2 : escape_unsafe_chars(JSON.stringify(key2));
}
function safe_prop(key2) {
  return /^[_$a-zA-Z][_$a-zA-Z0-9]*$/.test(key2) ? `.${key2}` : `[${escape_unsafe_chars(JSON.stringify(key2))}]`;
}
function stringify_primitive(thing) {
  if (typeof thing === "string")
    return stringify_string(thing);
  if (thing === void 0)
    return "void 0";
  if (thing === 0 && 1 / thing < 0)
    return "-0";
  const str = String(thing);
  if (typeof thing === "number")
    return str.replace(/^(-)?0\./, "$1.");
  if (typeof thing === "bigint")
    return thing + "n";
  return str;
}
var chars, unsafe_chars, reserved;
var init_uneval = __esm({
  "node_modules/devalue/src/uneval.js"() {
    init_utils();
    chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_$";
    unsafe_chars = /[<\b\f\n\r\t\0\u2028\u2029]/g;
    reserved = /^(?:do|if|in|for|int|let|new|try|var|byte|case|char|else|enum|goto|long|this|void|with|await|break|catch|class|const|final|float|short|super|throw|while|yield|delete|double|export|import|native|return|switch|throws|typeof|boolean|default|extends|finally|package|private|abstract|continue|debugger|function|volatile|interface|protected|transient|implements|instanceof|synchronized)$/;
  }
});

// node_modules/devalue/src/constants.js
var UNDEFINED, HOLE, NAN, POSITIVE_INFINITY, NEGATIVE_INFINITY, NEGATIVE_ZERO;
var init_constants6 = __esm({
  "node_modules/devalue/src/constants.js"() {
    UNDEFINED = -1;
    HOLE = -2;
    NAN = -3;
    POSITIVE_INFINITY = -4;
    NEGATIVE_INFINITY = -5;
    NEGATIVE_ZERO = -6;
  }
});

// node_modules/devalue/src/parse.js
var init_parse = __esm({
  "node_modules/devalue/src/parse.js"() {
    init_constants6();
  }
});

// node_modules/devalue/src/stringify.js
function stringify2(value, reducers) {
  const stringified = [];
  const indexes = /* @__PURE__ */ new Map();
  const custom = [];
  for (const key2 in reducers) {
    custom.push({ key: key2, fn: reducers[key2] });
  }
  const keys = [];
  let p2 = 0;
  function flatten(thing) {
    if (typeof thing === "function") {
      throw new DevalueError(`Cannot stringify a function`, keys);
    }
    if (indexes.has(thing))
      return indexes.get(thing);
    if (thing === void 0)
      return UNDEFINED;
    if (Number.isNaN(thing))
      return NAN;
    if (thing === Infinity)
      return POSITIVE_INFINITY;
    if (thing === -Infinity)
      return NEGATIVE_INFINITY;
    if (thing === 0 && 1 / thing < 0)
      return NEGATIVE_ZERO;
    const index22 = p2++;
    indexes.set(thing, index22);
    for (const { key: key2, fn } of custom) {
      const value2 = fn(thing);
      if (value2) {
        stringified[index22] = `["${key2}",${flatten(value2)}]`;
        return index22;
      }
    }
    let str = "";
    if (is_primitive(thing)) {
      str = stringify_primitive2(thing);
    } else {
      const type = get_type(thing);
      switch (type) {
        case "Number":
        case "String":
        case "Boolean":
          str = `["Object",${stringify_primitive2(thing)}]`;
          break;
        case "BigInt":
          str = `["BigInt",${thing}]`;
          break;
        case "Date":
          str = `["Date","${thing.toISOString()}"]`;
          break;
        case "RegExp":
          const { source: source2, flags } = thing;
          str = flags ? `["RegExp",${stringify_string(source2)},"${flags}"]` : `["RegExp",${stringify_string(source2)}]`;
          break;
        case "Array":
          str = "[";
          for (let i2 = 0; i2 < thing.length; i2 += 1) {
            if (i2 > 0)
              str += ",";
            if (i2 in thing) {
              keys.push(`[${i2}]`);
              str += flatten(thing[i2]);
              keys.pop();
            } else {
              str += HOLE;
            }
          }
          str += "]";
          break;
        case "Set":
          str = '["Set"';
          for (const value2 of thing) {
            str += `,${flatten(value2)}`;
          }
          str += "]";
          break;
        case "Map":
          str = '["Map"';
          for (const [key2, value2] of thing) {
            keys.push(
              `.get(${is_primitive(key2) ? stringify_primitive2(key2) : "..."})`
            );
            str += `,${flatten(key2)},${flatten(value2)}`;
          }
          str += "]";
          break;
        default:
          if (!is_plain_object(thing)) {
            throw new DevalueError(
              `Cannot stringify arbitrary non-POJOs`,
              keys
            );
          }
          if (Object.getOwnPropertySymbols(thing).length > 0) {
            throw new DevalueError(
              `Cannot stringify POJOs with symbolic keys`,
              keys
            );
          }
          if (Object.getPrototypeOf(thing) === null) {
            str = '["null"';
            for (const key2 in thing) {
              keys.push(`.${key2}`);
              str += `,${stringify_string(key2)},${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "]";
          } else {
            str = "{";
            let started = false;
            for (const key2 in thing) {
              if (started)
                str += ",";
              started = true;
              keys.push(`.${key2}`);
              str += `${stringify_string(key2)}:${flatten(thing[key2])}`;
              keys.pop();
            }
            str += "}";
          }
      }
    }
    stringified[index22] = str;
    return index22;
  }
  const index21 = flatten(value);
  if (index21 < 0)
    return `${index21}`;
  return `[${stringified.join(",")}]`;
}
function stringify_primitive2(thing) {
  const type = typeof thing;
  if (type === "string")
    return stringify_string(thing);
  if (thing instanceof String)
    return stringify_string(thing.toString());
  if (thing === void 0)
    return UNDEFINED.toString();
  if (thing === 0 && 1 / thing < 0)
    return NEGATIVE_ZERO.toString();
  if (type === "bigint")
    return `["BigInt","${thing}"]`;
  return String(thing);
}
var init_stringify = __esm({
  "node_modules/devalue/src/stringify.js"() {
    init_utils();
    init_constants6();
  }
});

// node_modules/devalue/index.js
var init_devalue = __esm({
  "node_modules/devalue/index.js"() {
    init_uneval();
    init_parse();
    init_stringify();
  }
});

// .svelte-kit/output/server/chunks/index2.js
function readable(value, start) {
  return {
    subscribe: writable(value, start).subscribe
  };
}
function safe_not_equal2(a2, b) {
  return a2 != a2 ? (
    // eslint-disable-next-line eqeqeq
    b == b
  ) : a2 !== b || a2 && typeof a2 === "object" || typeof a2 === "function";
}
function writable(value, start = noop) {
  let stop = null;
  const subscribers = /* @__PURE__ */ new Set();
  function set2(new_value) {
    if (safe_not_equal2(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i2 = 0; i2 < subscriber_queue.length; i2 += 2) {
            subscriber_queue[i2][0](subscriber_queue[i2 + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update(fn) {
    set2(fn(
      /** @type {T} */
      value
    ));
  }
  function subscribe(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set2, update) || noop;
    }
    run2(
      /** @type {T} */
      value
    );
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set: set2, update, subscribe };
}
function run_all2(fns) {
  fns.forEach(run);
}
function derived(stores, fn, initial_value) {
  const single = !Array.isArray(stores);
  const stores_array = single ? [stores] : stores;
  if (!stores_array.every(Boolean)) {
    throw new Error("derived() expects stores as input, got a falsy value");
  }
  const auto = fn.length < 2;
  return readable(initial_value, (set2, update) => {
    let started = false;
    const values = [];
    let pending = 0;
    let cleanup = noop;
    const sync = () => {
      if (pending) {
        return;
      }
      cleanup();
      const result = fn(single ? values[0] : values, set2, update);
      if (auto) {
        set2(result);
      } else {
        cleanup = typeof result === "function" ? result : noop;
      }
    };
    const unsubscribers = stores_array.map(
      (store, i2) => subscribe_to_store(
        store,
        (value) => {
          values[i2] = value;
          pending &= ~(1 << i2);
          if (started) {
            sync();
          }
        },
        () => {
          pending |= 1 << i2;
        }
      )
    );
    started = true;
    sync();
    return function stop() {
      run_all2(unsubscribers);
      cleanup();
      started = false;
    };
  });
}
function readonly(store) {
  return {
    // @ts-expect-error TODO i suspect the bind is unnecessary
    subscribe: store.subscribe.bind(store)
  };
}
function get_store_value(store) {
  let value;
  subscribe_to_store(store, (_) => value = _)();
  return value;
}
var subscriber_queue;
var init_index2 = __esm({
  ".svelte-kit/output/server/chunks/index2.js"() {
    init_index3();
    subscriber_queue = [];
  }
});

// node_modules/cookie/index.js
var require_cookie2 = __commonJS({
  "node_modules/cookie/index.js"(exports) {
    "use strict";
    exports.parse = parse5;
    exports.serialize = serialize4;
    var __toString = Object.prototype.toString;
    var fieldContentRegExp = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
    function parse5(str, options2) {
      if (typeof str !== "string") {
        throw new TypeError("argument str must be a string");
      }
      var obj = {};
      var opt = options2 || {};
      var dec = opt.decode || decode;
      var index21 = 0;
      while (index21 < str.length) {
        var eqIdx = str.indexOf("=", index21);
        if (eqIdx === -1) {
          break;
        }
        var endIdx = str.indexOf(";", index21);
        if (endIdx === -1) {
          endIdx = str.length;
        } else if (endIdx < eqIdx) {
          index21 = str.lastIndexOf(";", eqIdx - 1) + 1;
          continue;
        }
        var key2 = str.slice(index21, eqIdx).trim();
        if (void 0 === obj[key2]) {
          var val = str.slice(eqIdx + 1, endIdx).trim();
          if (val.charCodeAt(0) === 34) {
            val = val.slice(1, -1);
          }
          obj[key2] = tryDecode(val, dec);
        }
        index21 = endIdx + 1;
      }
      return obj;
    }
    function serialize4(name, val, options2) {
      var opt = options2 || {};
      var enc = opt.encode || encode2;
      if (typeof enc !== "function") {
        throw new TypeError("option encode is invalid");
      }
      if (!fieldContentRegExp.test(name)) {
        throw new TypeError("argument name is invalid");
      }
      var value = enc(val);
      if (value && !fieldContentRegExp.test(value)) {
        throw new TypeError("argument val is invalid");
      }
      var str = name + "=" + value;
      if (null != opt.maxAge) {
        var maxAge = opt.maxAge - 0;
        if (isNaN(maxAge) || !isFinite(maxAge)) {
          throw new TypeError("option maxAge is invalid");
        }
        str += "; Max-Age=" + Math.floor(maxAge);
      }
      if (opt.domain) {
        if (!fieldContentRegExp.test(opt.domain)) {
          throw new TypeError("option domain is invalid");
        }
        str += "; Domain=" + opt.domain;
      }
      if (opt.path) {
        if (!fieldContentRegExp.test(opt.path)) {
          throw new TypeError("option path is invalid");
        }
        str += "; Path=" + opt.path;
      }
      if (opt.expires) {
        var expires = opt.expires;
        if (!isDate(expires) || isNaN(expires.valueOf())) {
          throw new TypeError("option expires is invalid");
        }
        str += "; Expires=" + expires.toUTCString();
      }
      if (opt.httpOnly) {
        str += "; HttpOnly";
      }
      if (opt.secure) {
        str += "; Secure";
      }
      if (opt.partitioned) {
        str += "; Partitioned";
      }
      if (opt.priority) {
        var priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
        switch (priority) {
          case "low":
            str += "; Priority=Low";
            break;
          case "medium":
            str += "; Priority=Medium";
            break;
          case "high":
            str += "; Priority=High";
            break;
          default:
            throw new TypeError("option priority is invalid");
        }
      }
      if (opt.sameSite) {
        var sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
        switch (sameSite) {
          case true:
            str += "; SameSite=Strict";
            break;
          case "lax":
            str += "; SameSite=Lax";
            break;
          case "strict":
            str += "; SameSite=Strict";
            break;
          case "none":
            str += "; SameSite=None";
            break;
          default:
            throw new TypeError("option sameSite is invalid");
        }
      }
      return str;
    }
    function decode(str) {
      return str.indexOf("%") !== -1 ? decodeURIComponent(str) : str;
    }
    function encode2(val) {
      return encodeURIComponent(val);
    }
    function isDate(val) {
      return __toString.call(val) === "[object Date]" || val instanceof Date;
    }
    function tryDecode(str, decode2) {
      try {
        return decode2(str);
      } catch (e) {
        return str;
      }
    }
  }
});

// node_modules/set-cookie-parser/lib/set-cookie.js
var require_set_cookie = __commonJS({
  "node_modules/set-cookie-parser/lib/set-cookie.js"(exports, module) {
    "use strict";
    var defaultParseOptions = {
      decodeValues: true,
      map: false,
      silent: false
    };
    function isNonEmptyString(str) {
      return typeof str === "string" && !!str.trim();
    }
    function parseString2(setCookieValue, options2) {
      var parts = setCookieValue.split(";").filter(isNonEmptyString);
      var nameValuePairStr = parts.shift();
      var parsed = parseNameValuePair(nameValuePairStr);
      var name = parsed.name;
      var value = parsed.value;
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      try {
        value = options2.decodeValues ? decodeURIComponent(value) : value;
      } catch (e) {
        console.error(
          "set-cookie-parser encountered an error while decoding a cookie with value '" + value + "'. Set options.decodeValues to false to disable this feature.",
          e
        );
      }
      var cookie = {
        name,
        value
      };
      parts.forEach(function(part) {
        var sides2 = part.split("=");
        var key2 = sides2.shift().trimLeft().toLowerCase();
        var value2 = sides2.join("=");
        if (key2 === "expires") {
          cookie.expires = new Date(value2);
        } else if (key2 === "max-age") {
          cookie.maxAge = parseInt(value2, 10);
        } else if (key2 === "secure") {
          cookie.secure = true;
        } else if (key2 === "httponly") {
          cookie.httpOnly = true;
        } else if (key2 === "samesite") {
          cookie.sameSite = value2;
        } else {
          cookie[key2] = value2;
        }
      });
      return cookie;
    }
    function parseNameValuePair(nameValuePairStr) {
      var name = "";
      var value = "";
      var nameValueArr = nameValuePairStr.split("=");
      if (nameValueArr.length > 1) {
        name = nameValueArr.shift();
        value = nameValueArr.join("=");
      } else {
        value = nameValuePairStr;
      }
      return { name, value };
    }
    function parse5(input, options2) {
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!input) {
        if (!options2.map) {
          return [];
        } else {
          return {};
        }
      }
      if (input.headers) {
        if (typeof input.headers.getSetCookie === "function") {
          input = input.headers.getSetCookie();
        } else if (input.headers["set-cookie"]) {
          input = input.headers["set-cookie"];
        } else {
          var sch = input.headers[Object.keys(input.headers).find(function(key2) {
            return key2.toLowerCase() === "set-cookie";
          })];
          if (!sch && input.headers.cookie && !options2.silent) {
            console.warn(
              "Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning."
            );
          }
          input = sch;
        }
      }
      if (!Array.isArray(input)) {
        input = [input];
      }
      options2 = options2 ? Object.assign({}, defaultParseOptions, options2) : defaultParseOptions;
      if (!options2.map) {
        return input.filter(isNonEmptyString).map(function(str) {
          return parseString2(str, options2);
        });
      } else {
        var cookies = {};
        return input.filter(isNonEmptyString).reduce(function(cookies2, str) {
          var cookie = parseString2(str, options2);
          cookies2[cookie.name] = cookie;
          return cookies2;
        }, cookies);
      }
    }
    function splitCookiesString2(cookiesString) {
      if (Array.isArray(cookiesString)) {
        return cookiesString;
      }
      if (typeof cookiesString !== "string") {
        return [];
      }
      var cookiesStrings = [];
      var pos = 0;
      var start;
      var ch;
      var lastComma;
      var nextStart;
      var cookiesSeparatorFound;
      function skipWhitespace() {
        while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
          pos += 1;
        }
        return pos < cookiesString.length;
      }
      function notSpecialChar() {
        ch = cookiesString.charAt(pos);
        return ch !== "=" && ch !== ";" && ch !== ",";
      }
      while (pos < cookiesString.length) {
        start = pos;
        cookiesSeparatorFound = false;
        while (skipWhitespace()) {
          ch = cookiesString.charAt(pos);
          if (ch === ",") {
            lastComma = pos;
            pos += 1;
            skipWhitespace();
            nextStart = pos;
            while (pos < cookiesString.length && notSpecialChar()) {
              pos += 1;
            }
            if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
              cookiesSeparatorFound = true;
              pos = nextStart;
              cookiesStrings.push(cookiesString.substring(start, lastComma));
              start = pos;
            } else {
              pos = lastComma + 1;
            }
          } else {
            pos += 1;
          }
        }
        if (!cookiesSeparatorFound || pos >= cookiesString.length) {
          cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
        }
      }
      return cookiesStrings;
    }
    module.exports = parse5;
    module.exports.parse = parse5;
    module.exports.parseString = parseString2;
    module.exports.splitCookiesString = splitCookiesString2;
  }
});

// .svelte-kit/output/server/entries/fallbacks/layout.svelte.js
var layout_svelte_exports = {};
__export(layout_svelte_exports, {
  default: () => Layout
});
function Layout($$payload, $$props) {
  push(false);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `${anchor}`;
  pop();
}
var init_layout_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/layout.svelte.js"() {
    init_index3();
  }
});

// .svelte-kit/output/server/nodes/0.js
var __exports = {};
__export(__exports, {
  component: () => component,
  fonts: () => fonts,
  imports: () => imports,
  index: () => index,
  stylesheets: () => stylesheets
});
var index, component_cache, component, imports, stylesheets, fonts;
var init__ = __esm({
  ".svelte-kit/output/server/nodes/0.js"() {
    index = 0;
    component = async () => component_cache ?? (component_cache = (await Promise.resolve().then(() => (init_layout_svelte(), layout_svelte_exports))).default);
    imports = ["_app/immutable/nodes/0.BFjaFo6v.js", "_app/immutable/chunks/disclose-version.B6hs-VaT.js", "_app/immutable/chunks/runtime.BoLIClZE.js"];
    stylesheets = [];
    fonts = [];
  }
});

// .svelte-kit/output/server/chunks/stores.js
function get3(key2, parse5 = JSON.parse) {
  try {
    return parse5(sessionStorage[key2]);
  } catch {
  }
}
var SNAPSHOT_KEY, SCROLL_KEY, getStores, page;
var init_stores = __esm({
  ".svelte-kit/output/server/chunks/stores.js"() {
    init_index3();
    init_exports();
    init_devalue();
    SNAPSHOT_KEY = "sveltekit:snapshot";
    SCROLL_KEY = "sveltekit:scroll";
    get3(SCROLL_KEY) ?? {};
    get3(SNAPSHOT_KEY) ?? {};
    getStores = () => {
      const stores = getContext("__svelte__");
      return {
        /** @type {typeof page} */
        page: {
          subscribe: stores.page.subscribe
        },
        /** @type {typeof navigating} */
        navigating: {
          subscribe: stores.navigating.subscribe
        },
        /** @type {typeof updated} */
        updated: stores.updated
      };
    };
    page = {
      subscribe(fn) {
        const store = getStores().page;
        return store.subscribe(fn);
      }
    };
  }
});

// .svelte-kit/output/server/entries/fallbacks/error.svelte.js
var error_svelte_exports = {};
__export(error_svelte_exports, {
  default: () => Error2
});
function Error2($$payload, $$props) {
  push(false);
  var $$store_subs;
  $$payload.out += `<h1>${escape(store_get($$store_subs ?? ($$store_subs = {}), "$page", page).status)}</h1> <p>${escape(store_get($$store_subs ?? ($$store_subs = {}), "$page", page).error?.message)}</p>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
var init_error_svelte = __esm({
  ".svelte-kit/output/server/entries/fallbacks/error.svelte.js"() {
    init_index3();
    init_stores();
  }
});

// .svelte-kit/output/server/nodes/1.js
var __exports2 = {};
__export(__exports2, {
  component: () => component2,
  fonts: () => fonts2,
  imports: () => imports2,
  index: () => index2,
  stylesheets: () => stylesheets2
});
var index2, component_cache2, component2, imports2, stylesheets2, fonts2;
var init__2 = __esm({
  ".svelte-kit/output/server/nodes/1.js"() {
    index2 = 1;
    component2 = async () => component_cache2 ?? (component_cache2 = (await Promise.resolve().then(() => (init_error_svelte(), error_svelte_exports))).default);
    imports2 = ["_app/immutable/nodes/1.hZTv0f3T.js", "_app/immutable/chunks/disclose-version.B6hs-VaT.js", "_app/immutable/chunks/runtime.BoLIClZE.js", "_app/immutable/chunks/store.BhWaJmKK.js", "_app/immutable/chunks/index.JzF151we.js", "_app/immutable/chunks/stores.Bsvbz3Mb.js", "_app/immutable/chunks/entry.uU8UwhXW.js", "_app/immutable/chunks/control.CYgJF_JY.js"];
    stylesheets2 = [];
    fonts2 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(protected)/admin/_layout.svelte.js
var layout_svelte_exports2 = {};
__export(layout_svelte_exports2, {
  default: () => _layout
});
function _layout($$payload, $$props) {
  push(false);
  const anchor = create_anchor($$payload);
  $$payload.out += `<section class="grid place-items-center w-full h-screen">${anchor}`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `${anchor}</section>`;
  pop();
}
var init_layout_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/(protected)/admin/_layout.svelte.js"() {
    init_index3();
  }
});

// .svelte-kit/output/server/nodes/3.js
var __exports3 = {};
__export(__exports3, {
  component: () => component3,
  fonts: () => fonts3,
  imports: () => imports3,
  index: () => index3,
  stylesheets: () => stylesheets3
});
var index3, component_cache3, component3, imports3, stylesheets3, fonts3;
var init__3 = __esm({
  ".svelte-kit/output/server/nodes/3.js"() {
    index3 = 3;
    component3 = async () => component_cache3 ?? (component_cache3 = (await Promise.resolve().then(() => (init_layout_svelte2(), layout_svelte_exports2))).default);
    imports3 = ["_app/immutable/nodes/3.cgjxsk8V.js", "_app/immutable/chunks/disclose-version.B6hs-VaT.js", "_app/immutable/chunks/runtime.BoLIClZE.js"];
    stylesheets3 = ["_app/immutable/assets/app.s0JklKdm.css"];
    fonts3 = [];
  }
});

// node_modules/dequal/dist/index.mjs
var init_dist2 = __esm({
  "node_modules/dequal/dist/index.mjs"() {
  }
});

// .svelte-kit/output/server/chunks/main-server.js
function onMount() {
}
function onDestroy(fn) {
  on_destroy.push(fn);
}
var init_main_server = __esm({
  ".svelte-kit/output/server/chunks/main-server.js"() {
    init_index3();
  }
});

// node_modules/clsx/dist/clsx.mjs
function r(e) {
  var t, f, n = "";
  if ("string" == typeof e || "number" == typeof e)
    n += e;
  else if ("object" == typeof e)
    if (Array.isArray(e)) {
      var o = e.length;
      for (t = 0; t < o; t++)
        e[t] && (f = r(e[t])) && (n && (n += " "), n += f);
    } else
      for (f in e)
        e[f] && (n && (n += " "), n += f);
  return n;
}
function clsx() {
  for (var e, t, f = 0, n = "", o = arguments.length; f < o; f++)
    (e = arguments[f]) && (t = r(e)) && (n && (n += " "), n += t);
  return n;
}
var init_clsx = __esm({
  "node_modules/clsx/dist/clsx.mjs"() {
  }
});

// node_modules/tailwind-variants/dist/chunk-JXBJZR5A.js
function i(e, o) {
  e.forEach(function(r2) {
    Array.isArray(r2) ? i(r2, o) : o.push(r2);
  });
}
function y(e) {
  let o = [];
  return i(e, o), o;
}
var l, u, x, a, p, g;
var init_chunk_JXBJZR5A = __esm({
  "node_modules/tailwind-variants/dist/chunk-JXBJZR5A.js"() {
    l = (e) => typeof e == "boolean" ? `${e}` : e === 0 ? "0" : e;
    u = (e) => !e || typeof e != "object" || Object.keys(e).length === 0;
    x = (e, o) => JSON.stringify(e) === JSON.stringify(o);
    a = (...e) => y(e).filter(Boolean);
    p = (e, o) => {
      let r2 = {}, c = Object.keys(e), f = Object.keys(o);
      for (let t of c)
        if (f.includes(t)) {
          let s2 = e[t], n = o[t];
          typeof s2 == "object" && typeof n == "object" ? r2[t] = p(s2, n) : Array.isArray(s2) || Array.isArray(n) ? r2[t] = a(n, s2) : r2[t] = n + " " + s2;
        } else
          r2[t] = e[t];
      for (let t of f)
        c.includes(t) || (r2[t] = o[t]);
      return r2;
    };
    g = (e) => !e || typeof e != "string" ? e : e.replace(/\s+/g, " ").trim();
  }
});

// node_modules/tailwind-merge/dist/bundle-mjs.mjs
function createClassUtils(config) {
  const classMap = createClassMap(config);
  const {
    conflictingClassGroups,
    conflictingClassGroupModifiers
  } = config;
  function getClassGroupId(className) {
    const classParts = className.split(CLASS_PART_SEPARATOR);
    if (classParts[0] === "" && classParts.length !== 1) {
      classParts.shift();
    }
    return getGroupRecursive(classParts, classMap) || getGroupIdForArbitraryProperty(className);
  }
  function getConflictingClassGroupIds(classGroupId, hasPostfixModifier) {
    const conflicts = conflictingClassGroups[classGroupId] || [];
    if (hasPostfixModifier && conflictingClassGroupModifiers[classGroupId]) {
      return [...conflicts, ...conflictingClassGroupModifiers[classGroupId]];
    }
    return conflicts;
  }
  return {
    getClassGroupId,
    getConflictingClassGroupIds
  };
}
function getGroupRecursive(classParts, classPartObject) {
  if (classParts.length === 0) {
    return classPartObject.classGroupId;
  }
  const currentClassPart = classParts[0];
  const nextClassPartObject = classPartObject.nextPart.get(currentClassPart);
  const classGroupFromNextClassPart = nextClassPartObject ? getGroupRecursive(classParts.slice(1), nextClassPartObject) : void 0;
  if (classGroupFromNextClassPart) {
    return classGroupFromNextClassPart;
  }
  if (classPartObject.validators.length === 0) {
    return void 0;
  }
  const classRest = classParts.join(CLASS_PART_SEPARATOR);
  return classPartObject.validators.find(({
    validator: validator2
  }) => validator2(classRest))?.classGroupId;
}
function getGroupIdForArbitraryProperty(className) {
  if (arbitraryPropertyRegex.test(className)) {
    const arbitraryPropertyClassName = arbitraryPropertyRegex.exec(className)[1];
    const property = arbitraryPropertyClassName?.substring(0, arbitraryPropertyClassName.indexOf(":"));
    if (property) {
      return "arbitrary.." + property;
    }
  }
}
function createClassMap(config) {
  const {
    theme,
    prefix: prefix2
  } = config;
  const classMap = {
    nextPart: /* @__PURE__ */ new Map(),
    validators: []
  };
  const prefixedClassGroupEntries = getPrefixedClassGroupEntries(Object.entries(config.classGroups), prefix2);
  prefixedClassGroupEntries.forEach(([classGroupId, classGroup]) => {
    processClassesRecursively(classGroup, classMap, classGroupId, theme);
  });
  return classMap;
}
function processClassesRecursively(classGroup, classPartObject, classGroupId, theme) {
  classGroup.forEach((classDefinition) => {
    if (typeof classDefinition === "string") {
      const classPartObjectToEdit = classDefinition === "" ? classPartObject : getPart(classPartObject, classDefinition);
      classPartObjectToEdit.classGroupId = classGroupId;
      return;
    }
    if (typeof classDefinition === "function") {
      if (isThemeGetter(classDefinition)) {
        processClassesRecursively(classDefinition(theme), classPartObject, classGroupId, theme);
        return;
      }
      classPartObject.validators.push({
        validator: classDefinition,
        classGroupId
      });
      return;
    }
    Object.entries(classDefinition).forEach(([key2, classGroup2]) => {
      processClassesRecursively(classGroup2, getPart(classPartObject, key2), classGroupId, theme);
    });
  });
}
function getPart(classPartObject, path) {
  let currentClassPartObject = classPartObject;
  path.split(CLASS_PART_SEPARATOR).forEach((pathPart) => {
    if (!currentClassPartObject.nextPart.has(pathPart)) {
      currentClassPartObject.nextPart.set(pathPart, {
        nextPart: /* @__PURE__ */ new Map(),
        validators: []
      });
    }
    currentClassPartObject = currentClassPartObject.nextPart.get(pathPart);
  });
  return currentClassPartObject;
}
function isThemeGetter(func) {
  return func.isThemeGetter;
}
function getPrefixedClassGroupEntries(classGroupEntries, prefix2) {
  if (!prefix2) {
    return classGroupEntries;
  }
  return classGroupEntries.map(([classGroupId, classGroup]) => {
    const prefixedClassGroup = classGroup.map((classDefinition) => {
      if (typeof classDefinition === "string") {
        return prefix2 + classDefinition;
      }
      if (typeof classDefinition === "object") {
        return Object.fromEntries(Object.entries(classDefinition).map(([key2, value]) => [prefix2 + key2, value]));
      }
      return classDefinition;
    });
    return [classGroupId, prefixedClassGroup];
  });
}
function createLruCache(maxCacheSize) {
  if (maxCacheSize < 1) {
    return {
      get: () => void 0,
      set: () => {
      }
    };
  }
  let cacheSize = 0;
  let cache = /* @__PURE__ */ new Map();
  let previousCache = /* @__PURE__ */ new Map();
  function update(key2, value) {
    cache.set(key2, value);
    cacheSize++;
    if (cacheSize > maxCacheSize) {
      cacheSize = 0;
      previousCache = cache;
      cache = /* @__PURE__ */ new Map();
    }
  }
  return {
    get(key2) {
      let value = cache.get(key2);
      if (value !== void 0) {
        return value;
      }
      if ((value = previousCache.get(key2)) !== void 0) {
        update(key2, value);
        return value;
      }
    },
    set(key2, value) {
      if (cache.has(key2)) {
        cache.set(key2, value);
      } else {
        update(key2, value);
      }
    }
  };
}
function createSplitModifiers(config) {
  const separator = config.separator;
  const isSeparatorSingleCharacter = separator.length === 1;
  const firstSeparatorCharacter = separator[0];
  const separatorLength = separator.length;
  return function splitModifiers(className) {
    const modifiers = [];
    let bracketDepth = 0;
    let modifierStart = 0;
    let postfixModifierPosition;
    for (let index21 = 0; index21 < className.length; index21++) {
      let currentCharacter = className[index21];
      if (bracketDepth === 0) {
        if (currentCharacter === firstSeparatorCharacter && (isSeparatorSingleCharacter || className.slice(index21, index21 + separatorLength) === separator)) {
          modifiers.push(className.slice(modifierStart, index21));
          modifierStart = index21 + separatorLength;
          continue;
        }
        if (currentCharacter === "/") {
          postfixModifierPosition = index21;
          continue;
        }
      }
      if (currentCharacter === "[") {
        bracketDepth++;
      } else if (currentCharacter === "]") {
        bracketDepth--;
      }
    }
    const baseClassNameWithImportantModifier = modifiers.length === 0 ? className : className.substring(modifierStart);
    const hasImportantModifier = baseClassNameWithImportantModifier.startsWith(IMPORTANT_MODIFIER);
    const baseClassName = hasImportantModifier ? baseClassNameWithImportantModifier.substring(1) : baseClassNameWithImportantModifier;
    const maybePostfixModifierPosition = postfixModifierPosition && postfixModifierPosition > modifierStart ? postfixModifierPosition - modifierStart : void 0;
    return {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    };
  };
}
function sortModifiers(modifiers) {
  if (modifiers.length <= 1) {
    return modifiers;
  }
  const sortedModifiers = [];
  let unsortedModifiers = [];
  modifiers.forEach((modifier) => {
    const isArbitraryVariant = modifier[0] === "[";
    if (isArbitraryVariant) {
      sortedModifiers.push(...unsortedModifiers.sort(), modifier);
      unsortedModifiers = [];
    } else {
      unsortedModifiers.push(modifier);
    }
  });
  sortedModifiers.push(...unsortedModifiers.sort());
  return sortedModifiers;
}
function createConfigUtils(config) {
  return {
    cache: createLruCache(config.cacheSize),
    splitModifiers: createSplitModifiers(config),
    ...createClassUtils(config)
  };
}
function mergeClassList(classList, configUtils) {
  const {
    splitModifiers,
    getClassGroupId,
    getConflictingClassGroupIds
  } = configUtils;
  const classGroupsInConflict = /* @__PURE__ */ new Set();
  return classList.trim().split(SPLIT_CLASSES_REGEX).map((originalClassName) => {
    const {
      modifiers,
      hasImportantModifier,
      baseClassName,
      maybePostfixModifierPosition
    } = splitModifiers(originalClassName);
    let classGroupId = getClassGroupId(maybePostfixModifierPosition ? baseClassName.substring(0, maybePostfixModifierPosition) : baseClassName);
    let hasPostfixModifier = Boolean(maybePostfixModifierPosition);
    if (!classGroupId) {
      if (!maybePostfixModifierPosition) {
        return {
          isTailwindClass: false,
          originalClassName
        };
      }
      classGroupId = getClassGroupId(baseClassName);
      if (!classGroupId) {
        return {
          isTailwindClass: false,
          originalClassName
        };
      }
      hasPostfixModifier = false;
    }
    const variantModifier = sortModifiers(modifiers).join(":");
    const modifierId = hasImportantModifier ? variantModifier + IMPORTANT_MODIFIER : variantModifier;
    return {
      isTailwindClass: true,
      modifierId,
      classGroupId,
      originalClassName,
      hasPostfixModifier
    };
  }).reverse().filter((parsed) => {
    if (!parsed.isTailwindClass) {
      return true;
    }
    const {
      modifierId,
      classGroupId,
      hasPostfixModifier
    } = parsed;
    const classId = modifierId + classGroupId;
    if (classGroupsInConflict.has(classId)) {
      return false;
    }
    classGroupsInConflict.add(classId);
    getConflictingClassGroupIds(classGroupId, hasPostfixModifier).forEach((group) => classGroupsInConflict.add(modifierId + group));
    return true;
  }).reverse().map((parsed) => parsed.originalClassName).join(" ");
}
function twJoin() {
  let index21 = 0;
  let argument;
  let resolvedValue;
  let string = "";
  while (index21 < arguments.length) {
    if (argument = arguments[index21++]) {
      if (resolvedValue = toValue(argument)) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
function toValue(mix) {
  if (typeof mix === "string") {
    return mix;
  }
  let resolvedValue;
  let string = "";
  for (let k = 0; k < mix.length; k++) {
    if (mix[k]) {
      if (resolvedValue = toValue(mix[k])) {
        string && (string += " ");
        string += resolvedValue;
      }
    }
  }
  return string;
}
function createTailwindMerge(createConfigFirst, ...createConfigRest) {
  let configUtils;
  let cacheGet;
  let cacheSet;
  let functionToCall = initTailwindMerge;
  function initTailwindMerge(classList) {
    const config = createConfigRest.reduce((previousConfig, createConfigCurrent) => createConfigCurrent(previousConfig), createConfigFirst());
    configUtils = createConfigUtils(config);
    cacheGet = configUtils.cache.get;
    cacheSet = configUtils.cache.set;
    functionToCall = tailwindMerge;
    return tailwindMerge(classList);
  }
  function tailwindMerge(classList) {
    const cachedResult = cacheGet(classList);
    if (cachedResult) {
      return cachedResult;
    }
    const result = mergeClassList(classList, configUtils);
    cacheSet(classList, result);
    return result;
  }
  return function callTailwindMerge() {
    return functionToCall(twJoin.apply(null, arguments));
  };
}
function fromTheme(key2) {
  const themeGetter = (theme) => theme[key2] || [];
  themeGetter.isThemeGetter = true;
  return themeGetter;
}
function isLength(value) {
  return isNumber(value) || stringLengths.has(value) || fractionRegex.test(value);
}
function isArbitraryLength(value) {
  return getIsArbitraryValue(value, "length", isLengthOnly);
}
function isNumber(value) {
  return Boolean(value) && !Number.isNaN(Number(value));
}
function isArbitraryNumber(value) {
  return getIsArbitraryValue(value, "number", isNumber);
}
function isInteger(value) {
  return Boolean(value) && Number.isInteger(Number(value));
}
function isPercent(value) {
  return value.endsWith("%") && isNumber(value.slice(0, -1));
}
function isArbitraryValue(value) {
  return arbitraryValueRegex.test(value);
}
function isTshirtSize(value) {
  return tshirtUnitRegex.test(value);
}
function isArbitrarySize(value) {
  return getIsArbitraryValue(value, sizeLabels, isNever);
}
function isArbitraryPosition(value) {
  return getIsArbitraryValue(value, "position", isNever);
}
function isArbitraryImage(value) {
  return getIsArbitraryValue(value, imageLabels, isImage);
}
function isArbitraryShadow(value) {
  return getIsArbitraryValue(value, "", isShadow);
}
function isAny() {
  return true;
}
function getIsArbitraryValue(value, label, testValue) {
  const result = arbitraryValueRegex.exec(value);
  if (result) {
    if (result[1]) {
      return typeof label === "string" ? result[1] === label : label.has(result[1]);
    }
    return testValue(result[2]);
  }
  return false;
}
function isLengthOnly(value) {
  return lengthUnitRegex.test(value) && !colorFunctionRegex.test(value);
}
function isNever() {
  return false;
}
function isShadow(value) {
  return shadowRegex.test(value);
}
function isImage(value) {
  return imageRegex.test(value);
}
function getDefaultConfig() {
  const colors = fromTheme("colors");
  const spacing = fromTheme("spacing");
  const blur = fromTheme("blur");
  const brightness = fromTheme("brightness");
  const borderColor = fromTheme("borderColor");
  const borderRadius = fromTheme("borderRadius");
  const borderSpacing = fromTheme("borderSpacing");
  const borderWidth = fromTheme("borderWidth");
  const contrast = fromTheme("contrast");
  const grayscale = fromTheme("grayscale");
  const hueRotate = fromTheme("hueRotate");
  const invert = fromTheme("invert");
  const gap = fromTheme("gap");
  const gradientColorStops = fromTheme("gradientColorStops");
  const gradientColorStopPositions = fromTheme("gradientColorStopPositions");
  const inset = fromTheme("inset");
  const margin = fromTheme("margin");
  const opacity = fromTheme("opacity");
  const padding = fromTheme("padding");
  const saturate = fromTheme("saturate");
  const scale = fromTheme("scale");
  const sepia = fromTheme("sepia");
  const skew = fromTheme("skew");
  const space = fromTheme("space");
  const translate = fromTheme("translate");
  const getOverscroll = () => ["auto", "contain", "none"];
  const getOverflow = () => ["auto", "hidden", "clip", "visible", "scroll"];
  const getSpacingWithAutoAndArbitrary = () => ["auto", isArbitraryValue, spacing];
  const getSpacingWithArbitrary = () => [isArbitraryValue, spacing];
  const getLengthWithEmptyAndArbitrary = () => ["", isLength, isArbitraryLength];
  const getNumberWithAutoAndArbitrary = () => ["auto", isNumber, isArbitraryValue];
  const getPositions = () => ["bottom", "center", "left", "left-bottom", "left-top", "right", "right-bottom", "right-top", "top"];
  const getLineStyles = () => ["solid", "dashed", "dotted", "double", "none"];
  const getBlendModes = () => ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "plus-lighter"];
  const getAlign = () => ["start", "end", "center", "between", "around", "evenly", "stretch"];
  const getZeroAndEmpty = () => ["", "0", isArbitraryValue];
  const getBreaks = () => ["auto", "avoid", "all", "avoid-page", "page", "left", "right", "column"];
  const getNumber = () => [isNumber, isArbitraryNumber];
  const getNumberAndArbitrary = () => [isNumber, isArbitraryValue];
  return {
    cacheSize: 500,
    separator: ":",
    theme: {
      colors: [isAny],
      spacing: [isLength, isArbitraryLength],
      blur: ["none", "", isTshirtSize, isArbitraryValue],
      brightness: getNumber(),
      borderColor: [colors],
      borderRadius: ["none", "", "full", isTshirtSize, isArbitraryValue],
      borderSpacing: getSpacingWithArbitrary(),
      borderWidth: getLengthWithEmptyAndArbitrary(),
      contrast: getNumber(),
      grayscale: getZeroAndEmpty(),
      hueRotate: getNumberAndArbitrary(),
      invert: getZeroAndEmpty(),
      gap: getSpacingWithArbitrary(),
      gradientColorStops: [colors],
      gradientColorStopPositions: [isPercent, isArbitraryLength],
      inset: getSpacingWithAutoAndArbitrary(),
      margin: getSpacingWithAutoAndArbitrary(),
      opacity: getNumber(),
      padding: getSpacingWithArbitrary(),
      saturate: getNumber(),
      scale: getNumber(),
      sepia: getZeroAndEmpty(),
      skew: getNumberAndArbitrary(),
      space: getSpacingWithArbitrary(),
      translate: getSpacingWithArbitrary()
    },
    classGroups: {
      // Layout
      /**
       * Aspect Ratio
       * @see https://tailwindcss.com/docs/aspect-ratio
       */
      aspect: [{
        aspect: ["auto", "square", "video", isArbitraryValue]
      }],
      /**
       * Container
       * @see https://tailwindcss.com/docs/container
       */
      container: ["container"],
      /**
       * Columns
       * @see https://tailwindcss.com/docs/columns
       */
      columns: [{
        columns: [isTshirtSize]
      }],
      /**
       * Break After
       * @see https://tailwindcss.com/docs/break-after
       */
      "break-after": [{
        "break-after": getBreaks()
      }],
      /**
       * Break Before
       * @see https://tailwindcss.com/docs/break-before
       */
      "break-before": [{
        "break-before": getBreaks()
      }],
      /**
       * Break Inside
       * @see https://tailwindcss.com/docs/break-inside
       */
      "break-inside": [{
        "break-inside": ["auto", "avoid", "avoid-page", "avoid-column"]
      }],
      /**
       * Box Decoration Break
       * @see https://tailwindcss.com/docs/box-decoration-break
       */
      "box-decoration": [{
        "box-decoration": ["slice", "clone"]
      }],
      /**
       * Box Sizing
       * @see https://tailwindcss.com/docs/box-sizing
       */
      box: [{
        box: ["border", "content"]
      }],
      /**
       * Display
       * @see https://tailwindcss.com/docs/display
       */
      display: ["block", "inline-block", "inline", "flex", "inline-flex", "table", "inline-table", "table-caption", "table-cell", "table-column", "table-column-group", "table-footer-group", "table-header-group", "table-row-group", "table-row", "flow-root", "grid", "inline-grid", "contents", "list-item", "hidden"],
      /**
       * Floats
       * @see https://tailwindcss.com/docs/float
       */
      float: [{
        float: ["right", "left", "none", "start", "end"]
      }],
      /**
       * Clear
       * @see https://tailwindcss.com/docs/clear
       */
      clear: [{
        clear: ["left", "right", "both", "none", "start", "end"]
      }],
      /**
       * Isolation
       * @see https://tailwindcss.com/docs/isolation
       */
      isolation: ["isolate", "isolation-auto"],
      /**
       * Object Fit
       * @see https://tailwindcss.com/docs/object-fit
       */
      "object-fit": [{
        object: ["contain", "cover", "fill", "none", "scale-down"]
      }],
      /**
       * Object Position
       * @see https://tailwindcss.com/docs/object-position
       */
      "object-position": [{
        object: [...getPositions(), isArbitraryValue]
      }],
      /**
       * Overflow
       * @see https://tailwindcss.com/docs/overflow
       */
      overflow: [{
        overflow: getOverflow()
      }],
      /**
       * Overflow X
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-x": [{
        "overflow-x": getOverflow()
      }],
      /**
       * Overflow Y
       * @see https://tailwindcss.com/docs/overflow
       */
      "overflow-y": [{
        "overflow-y": getOverflow()
      }],
      /**
       * Overscroll Behavior
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      overscroll: [{
        overscroll: getOverscroll()
      }],
      /**
       * Overscroll Behavior X
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-x": [{
        "overscroll-x": getOverscroll()
      }],
      /**
       * Overscroll Behavior Y
       * @see https://tailwindcss.com/docs/overscroll-behavior
       */
      "overscroll-y": [{
        "overscroll-y": getOverscroll()
      }],
      /**
       * Position
       * @see https://tailwindcss.com/docs/position
       */
      position: ["static", "fixed", "absolute", "relative", "sticky"],
      /**
       * Top / Right / Bottom / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      inset: [{
        inset: [inset]
      }],
      /**
       * Right / Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-x": [{
        "inset-x": [inset]
      }],
      /**
       * Top / Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      "inset-y": [{
        "inset-y": [inset]
      }],
      /**
       * Start
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      start: [{
        start: [inset]
      }],
      /**
       * End
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      end: [{
        end: [inset]
      }],
      /**
       * Top
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      top: [{
        top: [inset]
      }],
      /**
       * Right
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      right: [{
        right: [inset]
      }],
      /**
       * Bottom
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      bottom: [{
        bottom: [inset]
      }],
      /**
       * Left
       * @see https://tailwindcss.com/docs/top-right-bottom-left
       */
      left: [{
        left: [inset]
      }],
      /**
       * Visibility
       * @see https://tailwindcss.com/docs/visibility
       */
      visibility: ["visible", "invisible", "collapse"],
      /**
       * Z-Index
       * @see https://tailwindcss.com/docs/z-index
       */
      z: [{
        z: ["auto", isInteger, isArbitraryValue]
      }],
      // Flexbox and Grid
      /**
       * Flex Basis
       * @see https://tailwindcss.com/docs/flex-basis
       */
      basis: [{
        basis: getSpacingWithAutoAndArbitrary()
      }],
      /**
       * Flex Direction
       * @see https://tailwindcss.com/docs/flex-direction
       */
      "flex-direction": [{
        flex: ["row", "row-reverse", "col", "col-reverse"]
      }],
      /**
       * Flex Wrap
       * @see https://tailwindcss.com/docs/flex-wrap
       */
      "flex-wrap": [{
        flex: ["wrap", "wrap-reverse", "nowrap"]
      }],
      /**
       * Flex
       * @see https://tailwindcss.com/docs/flex
       */
      flex: [{
        flex: ["1", "auto", "initial", "none", isArbitraryValue]
      }],
      /**
       * Flex Grow
       * @see https://tailwindcss.com/docs/flex-grow
       */
      grow: [{
        grow: getZeroAndEmpty()
      }],
      /**
       * Flex Shrink
       * @see https://tailwindcss.com/docs/flex-shrink
       */
      shrink: [{
        shrink: getZeroAndEmpty()
      }],
      /**
       * Order
       * @see https://tailwindcss.com/docs/order
       */
      order: [{
        order: ["first", "last", "none", isInteger, isArbitraryValue]
      }],
      /**
       * Grid Template Columns
       * @see https://tailwindcss.com/docs/grid-template-columns
       */
      "grid-cols": [{
        "grid-cols": [isAny]
      }],
      /**
       * Grid Column Start / End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start-end": [{
        col: ["auto", {
          span: ["full", isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Column Start
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-start": [{
        "col-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Column End
       * @see https://tailwindcss.com/docs/grid-column
       */
      "col-end": [{
        "col-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Template Rows
       * @see https://tailwindcss.com/docs/grid-template-rows
       */
      "grid-rows": [{
        "grid-rows": [isAny]
      }],
      /**
       * Grid Row Start / End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start-end": [{
        row: ["auto", {
          span: [isInteger, isArbitraryValue]
        }, isArbitraryValue]
      }],
      /**
       * Grid Row Start
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-start": [{
        "row-start": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Row End
       * @see https://tailwindcss.com/docs/grid-row
       */
      "row-end": [{
        "row-end": getNumberWithAutoAndArbitrary()
      }],
      /**
       * Grid Auto Flow
       * @see https://tailwindcss.com/docs/grid-auto-flow
       */
      "grid-flow": [{
        "grid-flow": ["row", "col", "dense", "row-dense", "col-dense"]
      }],
      /**
       * Grid Auto Columns
       * @see https://tailwindcss.com/docs/grid-auto-columns
       */
      "auto-cols": [{
        "auto-cols": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Grid Auto Rows
       * @see https://tailwindcss.com/docs/grid-auto-rows
       */
      "auto-rows": [{
        "auto-rows": ["auto", "min", "max", "fr", isArbitraryValue]
      }],
      /**
       * Gap
       * @see https://tailwindcss.com/docs/gap
       */
      gap: [{
        gap: [gap]
      }],
      /**
       * Gap X
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-x": [{
        "gap-x": [gap]
      }],
      /**
       * Gap Y
       * @see https://tailwindcss.com/docs/gap
       */
      "gap-y": [{
        "gap-y": [gap]
      }],
      /**
       * Justify Content
       * @see https://tailwindcss.com/docs/justify-content
       */
      "justify-content": [{
        justify: ["normal", ...getAlign()]
      }],
      /**
       * Justify Items
       * @see https://tailwindcss.com/docs/justify-items
       */
      "justify-items": [{
        "justify-items": ["start", "end", "center", "stretch"]
      }],
      /**
       * Justify Self
       * @see https://tailwindcss.com/docs/justify-self
       */
      "justify-self": [{
        "justify-self": ["auto", "start", "end", "center", "stretch"]
      }],
      /**
       * Align Content
       * @see https://tailwindcss.com/docs/align-content
       */
      "align-content": [{
        content: ["normal", ...getAlign(), "baseline"]
      }],
      /**
       * Align Items
       * @see https://tailwindcss.com/docs/align-items
       */
      "align-items": [{
        items: ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Align Self
       * @see https://tailwindcss.com/docs/align-self
       */
      "align-self": [{
        self: ["auto", "start", "end", "center", "stretch", "baseline"]
      }],
      /**
       * Place Content
       * @see https://tailwindcss.com/docs/place-content
       */
      "place-content": [{
        "place-content": [...getAlign(), "baseline"]
      }],
      /**
       * Place Items
       * @see https://tailwindcss.com/docs/place-items
       */
      "place-items": [{
        "place-items": ["start", "end", "center", "baseline", "stretch"]
      }],
      /**
       * Place Self
       * @see https://tailwindcss.com/docs/place-self
       */
      "place-self": [{
        "place-self": ["auto", "start", "end", "center", "stretch"]
      }],
      // Spacing
      /**
       * Padding
       * @see https://tailwindcss.com/docs/padding
       */
      p: [{
        p: [padding]
      }],
      /**
       * Padding X
       * @see https://tailwindcss.com/docs/padding
       */
      px: [{
        px: [padding]
      }],
      /**
       * Padding Y
       * @see https://tailwindcss.com/docs/padding
       */
      py: [{
        py: [padding]
      }],
      /**
       * Padding Start
       * @see https://tailwindcss.com/docs/padding
       */
      ps: [{
        ps: [padding]
      }],
      /**
       * Padding End
       * @see https://tailwindcss.com/docs/padding
       */
      pe: [{
        pe: [padding]
      }],
      /**
       * Padding Top
       * @see https://tailwindcss.com/docs/padding
       */
      pt: [{
        pt: [padding]
      }],
      /**
       * Padding Right
       * @see https://tailwindcss.com/docs/padding
       */
      pr: [{
        pr: [padding]
      }],
      /**
       * Padding Bottom
       * @see https://tailwindcss.com/docs/padding
       */
      pb: [{
        pb: [padding]
      }],
      /**
       * Padding Left
       * @see https://tailwindcss.com/docs/padding
       */
      pl: [{
        pl: [padding]
      }],
      /**
       * Margin
       * @see https://tailwindcss.com/docs/margin
       */
      m: [{
        m: [margin]
      }],
      /**
       * Margin X
       * @see https://tailwindcss.com/docs/margin
       */
      mx: [{
        mx: [margin]
      }],
      /**
       * Margin Y
       * @see https://tailwindcss.com/docs/margin
       */
      my: [{
        my: [margin]
      }],
      /**
       * Margin Start
       * @see https://tailwindcss.com/docs/margin
       */
      ms: [{
        ms: [margin]
      }],
      /**
       * Margin End
       * @see https://tailwindcss.com/docs/margin
       */
      me: [{
        me: [margin]
      }],
      /**
       * Margin Top
       * @see https://tailwindcss.com/docs/margin
       */
      mt: [{
        mt: [margin]
      }],
      /**
       * Margin Right
       * @see https://tailwindcss.com/docs/margin
       */
      mr: [{
        mr: [margin]
      }],
      /**
       * Margin Bottom
       * @see https://tailwindcss.com/docs/margin
       */
      mb: [{
        mb: [margin]
      }],
      /**
       * Margin Left
       * @see https://tailwindcss.com/docs/margin
       */
      ml: [{
        ml: [margin]
      }],
      /**
       * Space Between X
       * @see https://tailwindcss.com/docs/space
       */
      "space-x": [{
        "space-x": [space]
      }],
      /**
       * Space Between X Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-x-reverse": ["space-x-reverse"],
      /**
       * Space Between Y
       * @see https://tailwindcss.com/docs/space
       */
      "space-y": [{
        "space-y": [space]
      }],
      /**
       * Space Between Y Reverse
       * @see https://tailwindcss.com/docs/space
       */
      "space-y-reverse": ["space-y-reverse"],
      // Sizing
      /**
       * Width
       * @see https://tailwindcss.com/docs/width
       */
      w: [{
        w: ["auto", "min", "max", "fit", "svw", "lvw", "dvw", isArbitraryValue, spacing]
      }],
      /**
       * Min-Width
       * @see https://tailwindcss.com/docs/min-width
       */
      "min-w": [{
        "min-w": [isArbitraryValue, spacing, "min", "max", "fit"]
      }],
      /**
       * Max-Width
       * @see https://tailwindcss.com/docs/max-width
       */
      "max-w": [{
        "max-w": [isArbitraryValue, spacing, "none", "full", "min", "max", "fit", "prose", {
          screen: [isTshirtSize]
        }, isTshirtSize]
      }],
      /**
       * Height
       * @see https://tailwindcss.com/docs/height
       */
      h: [{
        h: [isArbitraryValue, spacing, "auto", "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Min-Height
       * @see https://tailwindcss.com/docs/min-height
       */
      "min-h": [{
        "min-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Max-Height
       * @see https://tailwindcss.com/docs/max-height
       */
      "max-h": [{
        "max-h": [isArbitraryValue, spacing, "min", "max", "fit", "svh", "lvh", "dvh"]
      }],
      /**
       * Size
       * @see https://tailwindcss.com/docs/size
       */
      size: [{
        size: [isArbitraryValue, spacing, "auto", "min", "max", "fit"]
      }],
      // Typography
      /**
       * Font Size
       * @see https://tailwindcss.com/docs/font-size
       */
      "font-size": [{
        text: ["base", isTshirtSize, isArbitraryLength]
      }],
      /**
       * Font Smoothing
       * @see https://tailwindcss.com/docs/font-smoothing
       */
      "font-smoothing": ["antialiased", "subpixel-antialiased"],
      /**
       * Font Style
       * @see https://tailwindcss.com/docs/font-style
       */
      "font-style": ["italic", "not-italic"],
      /**
       * Font Weight
       * @see https://tailwindcss.com/docs/font-weight
       */
      "font-weight": [{
        font: ["thin", "extralight", "light", "normal", "medium", "semibold", "bold", "extrabold", "black", isArbitraryNumber]
      }],
      /**
       * Font Family
       * @see https://tailwindcss.com/docs/font-family
       */
      "font-family": [{
        font: [isAny]
      }],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-normal": ["normal-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-ordinal": ["ordinal"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-slashed-zero": ["slashed-zero"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-figure": ["lining-nums", "oldstyle-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-spacing": ["proportional-nums", "tabular-nums"],
      /**
       * Font Variant Numeric
       * @see https://tailwindcss.com/docs/font-variant-numeric
       */
      "fvn-fraction": ["diagonal-fractions", "stacked-fractons"],
      /**
       * Letter Spacing
       * @see https://tailwindcss.com/docs/letter-spacing
       */
      tracking: [{
        tracking: ["tighter", "tight", "normal", "wide", "wider", "widest", isArbitraryValue]
      }],
      /**
       * Line Clamp
       * @see https://tailwindcss.com/docs/line-clamp
       */
      "line-clamp": [{
        "line-clamp": ["none", isNumber, isArbitraryNumber]
      }],
      /**
       * Line Height
       * @see https://tailwindcss.com/docs/line-height
       */
      leading: [{
        leading: ["none", "tight", "snug", "normal", "relaxed", "loose", isLength, isArbitraryValue]
      }],
      /**
       * List Style Image
       * @see https://tailwindcss.com/docs/list-style-image
       */
      "list-image": [{
        "list-image": ["none", isArbitraryValue]
      }],
      /**
       * List Style Type
       * @see https://tailwindcss.com/docs/list-style-type
       */
      "list-style-type": [{
        list: ["none", "disc", "decimal", isArbitraryValue]
      }],
      /**
       * List Style Position
       * @see https://tailwindcss.com/docs/list-style-position
       */
      "list-style-position": [{
        list: ["inside", "outside"]
      }],
      /**
       * Placeholder Color
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/placeholder-color
       */
      "placeholder-color": [{
        placeholder: [colors]
      }],
      /**
       * Placeholder Opacity
       * @see https://tailwindcss.com/docs/placeholder-opacity
       */
      "placeholder-opacity": [{
        "placeholder-opacity": [opacity]
      }],
      /**
       * Text Alignment
       * @see https://tailwindcss.com/docs/text-align
       */
      "text-alignment": [{
        text: ["left", "center", "right", "justify", "start", "end"]
      }],
      /**
       * Text Color
       * @see https://tailwindcss.com/docs/text-color
       */
      "text-color": [{
        text: [colors]
      }],
      /**
       * Text Opacity
       * @see https://tailwindcss.com/docs/text-opacity
       */
      "text-opacity": [{
        "text-opacity": [opacity]
      }],
      /**
       * Text Decoration
       * @see https://tailwindcss.com/docs/text-decoration
       */
      "text-decoration": ["underline", "overline", "line-through", "no-underline"],
      /**
       * Text Decoration Style
       * @see https://tailwindcss.com/docs/text-decoration-style
       */
      "text-decoration-style": [{
        decoration: [...getLineStyles(), "wavy"]
      }],
      /**
       * Text Decoration Thickness
       * @see https://tailwindcss.com/docs/text-decoration-thickness
       */
      "text-decoration-thickness": [{
        decoration: ["auto", "from-font", isLength, isArbitraryLength]
      }],
      /**
       * Text Underline Offset
       * @see https://tailwindcss.com/docs/text-underline-offset
       */
      "underline-offset": [{
        "underline-offset": ["auto", isLength, isArbitraryValue]
      }],
      /**
       * Text Decoration Color
       * @see https://tailwindcss.com/docs/text-decoration-color
       */
      "text-decoration-color": [{
        decoration: [colors]
      }],
      /**
       * Text Transform
       * @see https://tailwindcss.com/docs/text-transform
       */
      "text-transform": ["uppercase", "lowercase", "capitalize", "normal-case"],
      /**
       * Text Overflow
       * @see https://tailwindcss.com/docs/text-overflow
       */
      "text-overflow": ["truncate", "text-ellipsis", "text-clip"],
      /**
       * Text Wrap
       * @see https://tailwindcss.com/docs/text-wrap
       */
      "text-wrap": [{
        text: ["wrap", "nowrap", "balance", "pretty"]
      }],
      /**
       * Text Indent
       * @see https://tailwindcss.com/docs/text-indent
       */
      indent: [{
        indent: getSpacingWithArbitrary()
      }],
      /**
       * Vertical Alignment
       * @see https://tailwindcss.com/docs/vertical-align
       */
      "vertical-align": [{
        align: ["baseline", "top", "middle", "bottom", "text-top", "text-bottom", "sub", "super", isArbitraryValue]
      }],
      /**
       * Whitespace
       * @see https://tailwindcss.com/docs/whitespace
       */
      whitespace: [{
        whitespace: ["normal", "nowrap", "pre", "pre-line", "pre-wrap", "break-spaces"]
      }],
      /**
       * Word Break
       * @see https://tailwindcss.com/docs/word-break
       */
      break: [{
        break: ["normal", "words", "all", "keep"]
      }],
      /**
       * Hyphens
       * @see https://tailwindcss.com/docs/hyphens
       */
      hyphens: [{
        hyphens: ["none", "manual", "auto"]
      }],
      /**
       * Content
       * @see https://tailwindcss.com/docs/content
       */
      content: [{
        content: ["none", isArbitraryValue]
      }],
      // Backgrounds
      /**
       * Background Attachment
       * @see https://tailwindcss.com/docs/background-attachment
       */
      "bg-attachment": [{
        bg: ["fixed", "local", "scroll"]
      }],
      /**
       * Background Clip
       * @see https://tailwindcss.com/docs/background-clip
       */
      "bg-clip": [{
        "bg-clip": ["border", "padding", "content", "text"]
      }],
      /**
       * Background Opacity
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/background-opacity
       */
      "bg-opacity": [{
        "bg-opacity": [opacity]
      }],
      /**
       * Background Origin
       * @see https://tailwindcss.com/docs/background-origin
       */
      "bg-origin": [{
        "bg-origin": ["border", "padding", "content"]
      }],
      /**
       * Background Position
       * @see https://tailwindcss.com/docs/background-position
       */
      "bg-position": [{
        bg: [...getPositions(), isArbitraryPosition]
      }],
      /**
       * Background Repeat
       * @see https://tailwindcss.com/docs/background-repeat
       */
      "bg-repeat": [{
        bg: ["no-repeat", {
          repeat: ["", "x", "y", "round", "space"]
        }]
      }],
      /**
       * Background Size
       * @see https://tailwindcss.com/docs/background-size
       */
      "bg-size": [{
        bg: ["auto", "cover", "contain", isArbitrarySize]
      }],
      /**
       * Background Image
       * @see https://tailwindcss.com/docs/background-image
       */
      "bg-image": [{
        bg: ["none", {
          "gradient-to": ["t", "tr", "r", "br", "b", "bl", "l", "tl"]
        }, isArbitraryImage]
      }],
      /**
       * Background Color
       * @see https://tailwindcss.com/docs/background-color
       */
      "bg-color": [{
        bg: [colors]
      }],
      /**
       * Gradient Color Stops From Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from-pos": [{
        from: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops Via Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via-pos": [{
        via: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops To Position
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to-pos": [{
        to: [gradientColorStopPositions]
      }],
      /**
       * Gradient Color Stops From
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-from": [{
        from: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops Via
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-via": [{
        via: [gradientColorStops]
      }],
      /**
       * Gradient Color Stops To
       * @see https://tailwindcss.com/docs/gradient-color-stops
       */
      "gradient-to": [{
        to: [gradientColorStops]
      }],
      // Borders
      /**
       * Border Radius
       * @see https://tailwindcss.com/docs/border-radius
       */
      rounded: [{
        rounded: [borderRadius]
      }],
      /**
       * Border Radius Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-s": [{
        "rounded-s": [borderRadius]
      }],
      /**
       * Border Radius End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-e": [{
        "rounded-e": [borderRadius]
      }],
      /**
       * Border Radius Top
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-t": [{
        "rounded-t": [borderRadius]
      }],
      /**
       * Border Radius Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-r": [{
        "rounded-r": [borderRadius]
      }],
      /**
       * Border Radius Bottom
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-b": [{
        "rounded-b": [borderRadius]
      }],
      /**
       * Border Radius Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-l": [{
        "rounded-l": [borderRadius]
      }],
      /**
       * Border Radius Start Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ss": [{
        "rounded-ss": [borderRadius]
      }],
      /**
       * Border Radius Start End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-se": [{
        "rounded-se": [borderRadius]
      }],
      /**
       * Border Radius End End
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-ee": [{
        "rounded-ee": [borderRadius]
      }],
      /**
       * Border Radius End Start
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-es": [{
        "rounded-es": [borderRadius]
      }],
      /**
       * Border Radius Top Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tl": [{
        "rounded-tl": [borderRadius]
      }],
      /**
       * Border Radius Top Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-tr": [{
        "rounded-tr": [borderRadius]
      }],
      /**
       * Border Radius Bottom Right
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-br": [{
        "rounded-br": [borderRadius]
      }],
      /**
       * Border Radius Bottom Left
       * @see https://tailwindcss.com/docs/border-radius
       */
      "rounded-bl": [{
        "rounded-bl": [borderRadius]
      }],
      /**
       * Border Width
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w": [{
        border: [borderWidth]
      }],
      /**
       * Border Width X
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-x": [{
        "border-x": [borderWidth]
      }],
      /**
       * Border Width Y
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-y": [{
        "border-y": [borderWidth]
      }],
      /**
       * Border Width Start
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-s": [{
        "border-s": [borderWidth]
      }],
      /**
       * Border Width End
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-e": [{
        "border-e": [borderWidth]
      }],
      /**
       * Border Width Top
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-t": [{
        "border-t": [borderWidth]
      }],
      /**
       * Border Width Right
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-r": [{
        "border-r": [borderWidth]
      }],
      /**
       * Border Width Bottom
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-b": [{
        "border-b": [borderWidth]
      }],
      /**
       * Border Width Left
       * @see https://tailwindcss.com/docs/border-width
       */
      "border-w-l": [{
        "border-l": [borderWidth]
      }],
      /**
       * Border Opacity
       * @see https://tailwindcss.com/docs/border-opacity
       */
      "border-opacity": [{
        "border-opacity": [opacity]
      }],
      /**
       * Border Style
       * @see https://tailwindcss.com/docs/border-style
       */
      "border-style": [{
        border: [...getLineStyles(), "hidden"]
      }],
      /**
       * Divide Width X
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x": [{
        "divide-x": [borderWidth]
      }],
      /**
       * Divide Width X Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-x-reverse": ["divide-x-reverse"],
      /**
       * Divide Width Y
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y": [{
        "divide-y": [borderWidth]
      }],
      /**
       * Divide Width Y Reverse
       * @see https://tailwindcss.com/docs/divide-width
       */
      "divide-y-reverse": ["divide-y-reverse"],
      /**
       * Divide Opacity
       * @see https://tailwindcss.com/docs/divide-opacity
       */
      "divide-opacity": [{
        "divide-opacity": [opacity]
      }],
      /**
       * Divide Style
       * @see https://tailwindcss.com/docs/divide-style
       */
      "divide-style": [{
        divide: getLineStyles()
      }],
      /**
       * Border Color
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color": [{
        border: [borderColor]
      }],
      /**
       * Border Color X
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-x": [{
        "border-x": [borderColor]
      }],
      /**
       * Border Color Y
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-y": [{
        "border-y": [borderColor]
      }],
      /**
       * Border Color Top
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-t": [{
        "border-t": [borderColor]
      }],
      /**
       * Border Color Right
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-r": [{
        "border-r": [borderColor]
      }],
      /**
       * Border Color Bottom
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-b": [{
        "border-b": [borderColor]
      }],
      /**
       * Border Color Left
       * @see https://tailwindcss.com/docs/border-color
       */
      "border-color-l": [{
        "border-l": [borderColor]
      }],
      /**
       * Divide Color
       * @see https://tailwindcss.com/docs/divide-color
       */
      "divide-color": [{
        divide: [borderColor]
      }],
      /**
       * Outline Style
       * @see https://tailwindcss.com/docs/outline-style
       */
      "outline-style": [{
        outline: ["", ...getLineStyles()]
      }],
      /**
       * Outline Offset
       * @see https://tailwindcss.com/docs/outline-offset
       */
      "outline-offset": [{
        "outline-offset": [isLength, isArbitraryValue]
      }],
      /**
       * Outline Width
       * @see https://tailwindcss.com/docs/outline-width
       */
      "outline-w": [{
        outline: [isLength, isArbitraryLength]
      }],
      /**
       * Outline Color
       * @see https://tailwindcss.com/docs/outline-color
       */
      "outline-color": [{
        outline: [colors]
      }],
      /**
       * Ring Width
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w": [{
        ring: getLengthWithEmptyAndArbitrary()
      }],
      /**
       * Ring Width Inset
       * @see https://tailwindcss.com/docs/ring-width
       */
      "ring-w-inset": ["ring-inset"],
      /**
       * Ring Color
       * @see https://tailwindcss.com/docs/ring-color
       */
      "ring-color": [{
        ring: [colors]
      }],
      /**
       * Ring Opacity
       * @see https://tailwindcss.com/docs/ring-opacity
       */
      "ring-opacity": [{
        "ring-opacity": [opacity]
      }],
      /**
       * Ring Offset Width
       * @see https://tailwindcss.com/docs/ring-offset-width
       */
      "ring-offset-w": [{
        "ring-offset": [isLength, isArbitraryLength]
      }],
      /**
       * Ring Offset Color
       * @see https://tailwindcss.com/docs/ring-offset-color
       */
      "ring-offset-color": [{
        "ring-offset": [colors]
      }],
      // Effects
      /**
       * Box Shadow
       * @see https://tailwindcss.com/docs/box-shadow
       */
      shadow: [{
        shadow: ["", "inner", "none", isTshirtSize, isArbitraryShadow]
      }],
      /**
       * Box Shadow Color
       * @see https://tailwindcss.com/docs/box-shadow-color
       */
      "shadow-color": [{
        shadow: [isAny]
      }],
      /**
       * Opacity
       * @see https://tailwindcss.com/docs/opacity
       */
      opacity: [{
        opacity: [opacity]
      }],
      /**
       * Mix Blend Mode
       * @see https://tailwindcss.com/docs/mix-blend-mode
       */
      "mix-blend": [{
        "mix-blend": getBlendModes()
      }],
      /**
       * Background Blend Mode
       * @see https://tailwindcss.com/docs/background-blend-mode
       */
      "bg-blend": [{
        "bg-blend": getBlendModes()
      }],
      // Filters
      /**
       * Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/filter
       */
      filter: [{
        filter: ["", "none"]
      }],
      /**
       * Blur
       * @see https://tailwindcss.com/docs/blur
       */
      blur: [{
        blur: [blur]
      }],
      /**
       * Brightness
       * @see https://tailwindcss.com/docs/brightness
       */
      brightness: [{
        brightness: [brightness]
      }],
      /**
       * Contrast
       * @see https://tailwindcss.com/docs/contrast
       */
      contrast: [{
        contrast: [contrast]
      }],
      /**
       * Drop Shadow
       * @see https://tailwindcss.com/docs/drop-shadow
       */
      "drop-shadow": [{
        "drop-shadow": ["", "none", isTshirtSize, isArbitraryValue]
      }],
      /**
       * Grayscale
       * @see https://tailwindcss.com/docs/grayscale
       */
      grayscale: [{
        grayscale: [grayscale]
      }],
      /**
       * Hue Rotate
       * @see https://tailwindcss.com/docs/hue-rotate
       */
      "hue-rotate": [{
        "hue-rotate": [hueRotate]
      }],
      /**
       * Invert
       * @see https://tailwindcss.com/docs/invert
       */
      invert: [{
        invert: [invert]
      }],
      /**
       * Saturate
       * @see https://tailwindcss.com/docs/saturate
       */
      saturate: [{
        saturate: [saturate]
      }],
      /**
       * Sepia
       * @see https://tailwindcss.com/docs/sepia
       */
      sepia: [{
        sepia: [sepia]
      }],
      /**
       * Backdrop Filter
       * @deprecated since Tailwind CSS v3.0.0
       * @see https://tailwindcss.com/docs/backdrop-filter
       */
      "backdrop-filter": [{
        "backdrop-filter": ["", "none"]
      }],
      /**
       * Backdrop Blur
       * @see https://tailwindcss.com/docs/backdrop-blur
       */
      "backdrop-blur": [{
        "backdrop-blur": [blur]
      }],
      /**
       * Backdrop Brightness
       * @see https://tailwindcss.com/docs/backdrop-brightness
       */
      "backdrop-brightness": [{
        "backdrop-brightness": [brightness]
      }],
      /**
       * Backdrop Contrast
       * @see https://tailwindcss.com/docs/backdrop-contrast
       */
      "backdrop-contrast": [{
        "backdrop-contrast": [contrast]
      }],
      /**
       * Backdrop Grayscale
       * @see https://tailwindcss.com/docs/backdrop-grayscale
       */
      "backdrop-grayscale": [{
        "backdrop-grayscale": [grayscale]
      }],
      /**
       * Backdrop Hue Rotate
       * @see https://tailwindcss.com/docs/backdrop-hue-rotate
       */
      "backdrop-hue-rotate": [{
        "backdrop-hue-rotate": [hueRotate]
      }],
      /**
       * Backdrop Invert
       * @see https://tailwindcss.com/docs/backdrop-invert
       */
      "backdrop-invert": [{
        "backdrop-invert": [invert]
      }],
      /**
       * Backdrop Opacity
       * @see https://tailwindcss.com/docs/backdrop-opacity
       */
      "backdrop-opacity": [{
        "backdrop-opacity": [opacity]
      }],
      /**
       * Backdrop Saturate
       * @see https://tailwindcss.com/docs/backdrop-saturate
       */
      "backdrop-saturate": [{
        "backdrop-saturate": [saturate]
      }],
      /**
       * Backdrop Sepia
       * @see https://tailwindcss.com/docs/backdrop-sepia
       */
      "backdrop-sepia": [{
        "backdrop-sepia": [sepia]
      }],
      // Tables
      /**
       * Border Collapse
       * @see https://tailwindcss.com/docs/border-collapse
       */
      "border-collapse": [{
        border: ["collapse", "separate"]
      }],
      /**
       * Border Spacing
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing": [{
        "border-spacing": [borderSpacing]
      }],
      /**
       * Border Spacing X
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-x": [{
        "border-spacing-x": [borderSpacing]
      }],
      /**
       * Border Spacing Y
       * @see https://tailwindcss.com/docs/border-spacing
       */
      "border-spacing-y": [{
        "border-spacing-y": [borderSpacing]
      }],
      /**
       * Table Layout
       * @see https://tailwindcss.com/docs/table-layout
       */
      "table-layout": [{
        table: ["auto", "fixed"]
      }],
      /**
       * Caption Side
       * @see https://tailwindcss.com/docs/caption-side
       */
      caption: [{
        caption: ["top", "bottom"]
      }],
      // Transitions and Animation
      /**
       * Tranisition Property
       * @see https://tailwindcss.com/docs/transition-property
       */
      transition: [{
        transition: ["none", "all", "", "colors", "opacity", "shadow", "transform", isArbitraryValue]
      }],
      /**
       * Transition Duration
       * @see https://tailwindcss.com/docs/transition-duration
       */
      duration: [{
        duration: getNumberAndArbitrary()
      }],
      /**
       * Transition Timing Function
       * @see https://tailwindcss.com/docs/transition-timing-function
       */
      ease: [{
        ease: ["linear", "in", "out", "in-out", isArbitraryValue]
      }],
      /**
       * Transition Delay
       * @see https://tailwindcss.com/docs/transition-delay
       */
      delay: [{
        delay: getNumberAndArbitrary()
      }],
      /**
       * Animation
       * @see https://tailwindcss.com/docs/animation
       */
      animate: [{
        animate: ["none", "spin", "ping", "pulse", "bounce", isArbitraryValue]
      }],
      // Transforms
      /**
       * Transform
       * @see https://tailwindcss.com/docs/transform
       */
      transform: [{
        transform: ["", "gpu", "none"]
      }],
      /**
       * Scale
       * @see https://tailwindcss.com/docs/scale
       */
      scale: [{
        scale: [scale]
      }],
      /**
       * Scale X
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-x": [{
        "scale-x": [scale]
      }],
      /**
       * Scale Y
       * @see https://tailwindcss.com/docs/scale
       */
      "scale-y": [{
        "scale-y": [scale]
      }],
      /**
       * Rotate
       * @see https://tailwindcss.com/docs/rotate
       */
      rotate: [{
        rotate: [isInteger, isArbitraryValue]
      }],
      /**
       * Translate X
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-x": [{
        "translate-x": [translate]
      }],
      /**
       * Translate Y
       * @see https://tailwindcss.com/docs/translate
       */
      "translate-y": [{
        "translate-y": [translate]
      }],
      /**
       * Skew X
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-x": [{
        "skew-x": [skew]
      }],
      /**
       * Skew Y
       * @see https://tailwindcss.com/docs/skew
       */
      "skew-y": [{
        "skew-y": [skew]
      }],
      /**
       * Transform Origin
       * @see https://tailwindcss.com/docs/transform-origin
       */
      "transform-origin": [{
        origin: ["center", "top", "top-right", "right", "bottom-right", "bottom", "bottom-left", "left", "top-left", isArbitraryValue]
      }],
      // Interactivity
      /**
       * Accent Color
       * @see https://tailwindcss.com/docs/accent-color
       */
      accent: [{
        accent: ["auto", colors]
      }],
      /**
       * Appearance
       * @see https://tailwindcss.com/docs/appearance
       */
      appearance: [{
        appearance: ["none", "auto"]
      }],
      /**
       * Cursor
       * @see https://tailwindcss.com/docs/cursor
       */
      cursor: [{
        cursor: ["auto", "default", "pointer", "wait", "text", "move", "help", "not-allowed", "none", "context-menu", "progress", "cell", "crosshair", "vertical-text", "alias", "copy", "no-drop", "grab", "grabbing", "all-scroll", "col-resize", "row-resize", "n-resize", "e-resize", "s-resize", "w-resize", "ne-resize", "nw-resize", "se-resize", "sw-resize", "ew-resize", "ns-resize", "nesw-resize", "nwse-resize", "zoom-in", "zoom-out", isArbitraryValue]
      }],
      /**
       * Caret Color
       * @see https://tailwindcss.com/docs/just-in-time-mode#caret-color-utilities
       */
      "caret-color": [{
        caret: [colors]
      }],
      /**
       * Pointer Events
       * @see https://tailwindcss.com/docs/pointer-events
       */
      "pointer-events": [{
        "pointer-events": ["none", "auto"]
      }],
      /**
       * Resize
       * @see https://tailwindcss.com/docs/resize
       */
      resize: [{
        resize: ["none", "y", "x", ""]
      }],
      /**
       * Scroll Behavior
       * @see https://tailwindcss.com/docs/scroll-behavior
       */
      "scroll-behavior": [{
        scroll: ["auto", "smooth"]
      }],
      /**
       * Scroll Margin
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-m": [{
        "scroll-m": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin X
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mx": [{
        "scroll-mx": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Y
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-my": [{
        "scroll-my": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Start
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ms": [{
        "scroll-ms": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin End
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-me": [{
        "scroll-me": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Top
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mt": [{
        "scroll-mt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Right
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mr": [{
        "scroll-mr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Bottom
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-mb": [{
        "scroll-mb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Margin Left
       * @see https://tailwindcss.com/docs/scroll-margin
       */
      "scroll-ml": [{
        "scroll-ml": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-p": [{
        "scroll-p": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding X
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-px": [{
        "scroll-px": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Y
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-py": [{
        "scroll-py": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Start
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-ps": [{
        "scroll-ps": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding End
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pe": [{
        "scroll-pe": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Top
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pt": [{
        "scroll-pt": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Right
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pr": [{
        "scroll-pr": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Bottom
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pb": [{
        "scroll-pb": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Padding Left
       * @see https://tailwindcss.com/docs/scroll-padding
       */
      "scroll-pl": [{
        "scroll-pl": getSpacingWithArbitrary()
      }],
      /**
       * Scroll Snap Align
       * @see https://tailwindcss.com/docs/scroll-snap-align
       */
      "snap-align": [{
        snap: ["start", "end", "center", "align-none"]
      }],
      /**
       * Scroll Snap Stop
       * @see https://tailwindcss.com/docs/scroll-snap-stop
       */
      "snap-stop": [{
        snap: ["normal", "always"]
      }],
      /**
       * Scroll Snap Type
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-type": [{
        snap: ["none", "x", "y", "both"]
      }],
      /**
       * Scroll Snap Type Strictness
       * @see https://tailwindcss.com/docs/scroll-snap-type
       */
      "snap-strictness": [{
        snap: ["mandatory", "proximity"]
      }],
      /**
       * Touch Action
       * @see https://tailwindcss.com/docs/touch-action
       */
      touch: [{
        touch: ["auto", "none", "manipulation"]
      }],
      /**
       * Touch Action X
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-x": [{
        "touch-pan": ["x", "left", "right"]
      }],
      /**
       * Touch Action Y
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-y": [{
        "touch-pan": ["y", "up", "down"]
      }],
      /**
       * Touch Action Pinch Zoom
       * @see https://tailwindcss.com/docs/touch-action
       */
      "touch-pz": ["touch-pinch-zoom"],
      /**
       * User Select
       * @see https://tailwindcss.com/docs/user-select
       */
      select: [{
        select: ["none", "text", "all", "auto"]
      }],
      /**
       * Will Change
       * @see https://tailwindcss.com/docs/will-change
       */
      "will-change": [{
        "will-change": ["auto", "scroll", "contents", "transform", isArbitraryValue]
      }],
      // SVG
      /**
       * Fill
       * @see https://tailwindcss.com/docs/fill
       */
      fill: [{
        fill: [colors, "none"]
      }],
      /**
       * Stroke Width
       * @see https://tailwindcss.com/docs/stroke-width
       */
      "stroke-w": [{
        stroke: [isLength, isArbitraryLength, isArbitraryNumber]
      }],
      /**
       * Stroke
       * @see https://tailwindcss.com/docs/stroke
       */
      stroke: [{
        stroke: [colors, "none"]
      }],
      // Accessibility
      /**
       * Screen Readers
       * @see https://tailwindcss.com/docs/screen-readers
       */
      sr: ["sr-only", "not-sr-only"],
      /**
       * Forced Color Adjust
       * @see https://tailwindcss.com/docs/forced-color-adjust
       */
      "forced-color-adjust": [{
        "forced-color-adjust": ["auto", "none"]
      }]
    },
    conflictingClassGroups: {
      overflow: ["overflow-x", "overflow-y"],
      overscroll: ["overscroll-x", "overscroll-y"],
      inset: ["inset-x", "inset-y", "start", "end", "top", "right", "bottom", "left"],
      "inset-x": ["right", "left"],
      "inset-y": ["top", "bottom"],
      flex: ["basis", "grow", "shrink"],
      gap: ["gap-x", "gap-y"],
      p: ["px", "py", "ps", "pe", "pt", "pr", "pb", "pl"],
      px: ["pr", "pl"],
      py: ["pt", "pb"],
      m: ["mx", "my", "ms", "me", "mt", "mr", "mb", "ml"],
      mx: ["mr", "ml"],
      my: ["mt", "mb"],
      size: ["w", "h"],
      "font-size": ["leading"],
      "fvn-normal": ["fvn-ordinal", "fvn-slashed-zero", "fvn-figure", "fvn-spacing", "fvn-fraction"],
      "fvn-ordinal": ["fvn-normal"],
      "fvn-slashed-zero": ["fvn-normal"],
      "fvn-figure": ["fvn-normal"],
      "fvn-spacing": ["fvn-normal"],
      "fvn-fraction": ["fvn-normal"],
      "line-clamp": ["display", "overflow"],
      rounded: ["rounded-s", "rounded-e", "rounded-t", "rounded-r", "rounded-b", "rounded-l", "rounded-ss", "rounded-se", "rounded-ee", "rounded-es", "rounded-tl", "rounded-tr", "rounded-br", "rounded-bl"],
      "rounded-s": ["rounded-ss", "rounded-es"],
      "rounded-e": ["rounded-se", "rounded-ee"],
      "rounded-t": ["rounded-tl", "rounded-tr"],
      "rounded-r": ["rounded-tr", "rounded-br"],
      "rounded-b": ["rounded-br", "rounded-bl"],
      "rounded-l": ["rounded-tl", "rounded-bl"],
      "border-spacing": ["border-spacing-x", "border-spacing-y"],
      "border-w": ["border-w-s", "border-w-e", "border-w-t", "border-w-r", "border-w-b", "border-w-l"],
      "border-w-x": ["border-w-r", "border-w-l"],
      "border-w-y": ["border-w-t", "border-w-b"],
      "border-color": ["border-color-t", "border-color-r", "border-color-b", "border-color-l"],
      "border-color-x": ["border-color-r", "border-color-l"],
      "border-color-y": ["border-color-t", "border-color-b"],
      "scroll-m": ["scroll-mx", "scroll-my", "scroll-ms", "scroll-me", "scroll-mt", "scroll-mr", "scroll-mb", "scroll-ml"],
      "scroll-mx": ["scroll-mr", "scroll-ml"],
      "scroll-my": ["scroll-mt", "scroll-mb"],
      "scroll-p": ["scroll-px", "scroll-py", "scroll-ps", "scroll-pe", "scroll-pt", "scroll-pr", "scroll-pb", "scroll-pl"],
      "scroll-px": ["scroll-pr", "scroll-pl"],
      "scroll-py": ["scroll-pt", "scroll-pb"],
      touch: ["touch-x", "touch-y", "touch-pz"],
      "touch-x": ["touch"],
      "touch-y": ["touch"],
      "touch-pz": ["touch"]
    },
    conflictingClassGroupModifiers: {
      "font-size": ["leading"]
    }
  };
}
function mergeConfigs(baseConfig, {
  cacheSize,
  prefix: prefix2,
  separator,
  extend = {},
  override: override2 = {}
}) {
  overrideProperty(baseConfig, "cacheSize", cacheSize);
  overrideProperty(baseConfig, "prefix", prefix2);
  overrideProperty(baseConfig, "separator", separator);
  for (const configKey in override2) {
    overrideConfigProperties(baseConfig[configKey], override2[configKey]);
  }
  for (const key2 in extend) {
    mergeConfigProperties(baseConfig[key2], extend[key2]);
  }
  return baseConfig;
}
function overrideProperty(baseObject, overrideKey, overrideValue) {
  if (overrideValue !== void 0) {
    baseObject[overrideKey] = overrideValue;
  }
}
function overrideConfigProperties(baseObject, overrideObject) {
  if (overrideObject) {
    for (const key2 in overrideObject) {
      overrideProperty(baseObject, key2, overrideObject[key2]);
    }
  }
}
function mergeConfigProperties(baseObject, mergeObject) {
  if (mergeObject) {
    for (const key2 in mergeObject) {
      const mergeValue = mergeObject[key2];
      if (mergeValue !== void 0) {
        baseObject[key2] = (baseObject[key2] || []).concat(mergeValue);
      }
    }
  }
}
function extendTailwindMerge(configExtension, ...createConfig) {
  return typeof configExtension === "function" ? createTailwindMerge(getDefaultConfig, configExtension, ...createConfig) : createTailwindMerge(() => mergeConfigs(getDefaultConfig(), configExtension), ...createConfig);
}
var CLASS_PART_SEPARATOR, arbitraryPropertyRegex, IMPORTANT_MODIFIER, SPLIT_CLASSES_REGEX, arbitraryValueRegex, fractionRegex, stringLengths, tshirtUnitRegex, lengthUnitRegex, colorFunctionRegex, shadowRegex, imageRegex, sizeLabels, imageLabels, twMerge;
var init_bundle_mjs = __esm({
  "node_modules/tailwind-merge/dist/bundle-mjs.mjs"() {
    CLASS_PART_SEPARATOR = "-";
    arbitraryPropertyRegex = /^\[(.+)\]$/;
    IMPORTANT_MODIFIER = "!";
    SPLIT_CLASSES_REGEX = /\s+/;
    arbitraryValueRegex = /^\[(?:([a-z-]+):)?(.+)\]$/i;
    fractionRegex = /^\d+\/\d+$/;
    stringLengths = /* @__PURE__ */ new Set(["px", "full", "screen"]);
    tshirtUnitRegex = /^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/;
    lengthUnitRegex = /\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/;
    colorFunctionRegex = /^(rgba?|hsla?|hwb|(ok)?(lab|lch))\(.+\)$/;
    shadowRegex = /^-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/;
    imageRegex = /^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/;
    sizeLabels = /* @__PURE__ */ new Set(["length", "size", "percentage"]);
    imageLabels = /* @__PURE__ */ new Set(["image", "url"]);
    twMerge = /* @__PURE__ */ createTailwindMerge(getDefaultConfig);
  }
});

// node_modules/tailwind-variants/dist/index.js
var ie, Z, N, R, C, q, j, Y, ce;
var init_dist3 = __esm({
  "node_modules/tailwind-variants/dist/index.js"() {
    init_chunk_JXBJZR5A();
    init_bundle_mjs();
    ie = { twMerge: true, twMergeConfig: {}, responsiveVariants: false };
    Z = (s2) => s2 || void 0;
    N = (...s2) => Z(y(s2).filter(Boolean).join(" "));
    R = null;
    C = {};
    q = false;
    j = (...s2) => (b$1) => b$1.twMerge ? ((!R || q) && (q = false, R = u(C) ? twMerge : extendTailwindMerge({ ...C, extend: { theme: C.theme, classGroups: C.classGroups, conflictingClassGroupModifiers: C.conflictingClassGroupModifiers, conflictingClassGroups: C.conflictingClassGroups, ...C.extend } })), Z(R(N(s2)))) : N(s2);
    Y = (s2, b) => {
      for (let e in b)
        s2.hasOwnProperty(e) ? s2[e] = N(s2[e], b[e]) : s2[e] = b[e];
      return s2;
    };
    ce = (s2, b$1) => {
      let { extend: e = null, slots: M = {}, variants: F = {}, compoundVariants: h$1 = [], compoundSlots: V = [], defaultVariants: U = {} } = s2, m = { ...ie, ...b$1 }, S = e != null && e.base ? N(e.base, s2 == null ? void 0 : s2.base) : s2 == null ? void 0 : s2.base, g$1 = e != null && e.variants && !u(e.variants) ? p(F, e.variants) : F, A = e != null && e.defaultVariants && !u(e.defaultVariants) ? { ...e.defaultVariants, ...U } : U;
      !u(m.twMergeConfig) && !x(m.twMergeConfig, C) && (q = true, C = m.twMergeConfig);
      let O = u(e == null ? void 0 : e.slots), $ = u(M) ? {} : { base: N(s2 == null ? void 0 : s2.base, O && (e == null ? void 0 : e.base)), ...M }, w = O ? $ : Y({ ...e == null ? void 0 : e.slots }, u($) ? { base: s2 == null ? void 0 : s2.base } : $), v = (f$1) => {
        if (u(g$1) && u(M) && O)
          return j(S, f$1 == null ? void 0 : f$1.class, f$1 == null ? void 0 : f$1.className)(m);
        if (h$1 && !Array.isArray(h$1))
          throw new TypeError(`The "compoundVariants" prop must be an array. Received: ${typeof h$1}`);
        if (V && !Array.isArray(V))
          throw new TypeError(`The "compoundSlots" prop must be an array. Received: ${typeof V}`);
        let K = (t, n, a2 = [], i2) => {
          let r2 = a2;
          if (typeof n == "string")
            r2 = r2.concat(g(n).split(" ").map((l2) => `${t}:${l2}`));
          else if (Array.isArray(n))
            r2 = r2.concat(n.reduce((l2, c) => l2.concat(`${t}:${c}`), []));
          else if (typeof n == "object" && typeof i2 == "string") {
            for (let l2 in n)
              if (n.hasOwnProperty(l2) && l2 === i2) {
                let c = n[l2];
                if (c && typeof c == "string") {
                  let o = g(c);
                  r2[i2] ? r2[i2] = r2[i2].concat(o.split(" ").map((u2) => `${t}:${u2}`)) : r2[i2] = o.split(" ").map((u2) => `${t}:${u2}`);
                } else
                  Array.isArray(c) && c.length > 0 && (r2[i2] = c.reduce((o, u2) => o.concat(`${t}:${u2}`), []));
              }
          }
          return r2;
        }, W = (t, n = g$1, a$1 = null, i2 = null) => {
          var I;
          let r2 = n[t];
          if (!r2 || u(r2))
            return null;
          let l2 = (I = i2 == null ? void 0 : i2[t]) != null ? I : f$1 == null ? void 0 : f$1[t];
          if (l2 === null)
            return null;
          let c = l(l2), o = Array.isArray(m.responsiveVariants) && m.responsiveVariants.length > 0 || m.responsiveVariants === true, u2 = A == null ? void 0 : A[t], d = [];
          if (typeof c == "object" && o)
            for (let [T, J] of Object.entries(c)) {
              let ne = r2[J];
              if (T === "initial") {
                u2 = J;
                continue;
              }
              Array.isArray(m.responsiveVariants) && !m.responsiveVariants.includes(T) || (d = K(T, ne, d, a$1));
            }
          let ae = c != null && typeof c != "object" ? c : l(u2), k = r2[ae] || r2.false;
          return typeof d == "object" && typeof a$1 == "string" && d[a$1] ? Y(d, k) : d.length > 0 ? (d.push(k), d) : k;
        }, P = () => g$1 ? Object.keys(g$1).map((t) => W(t, g$1)) : null, p2 = (t, n) => {
          if (!g$1 || typeof g$1 != "object")
            return null;
          let a2 = new Array();
          for (let i2 in g$1) {
            let r2 = W(i2, g$1, t, n), l2 = t === "base" && typeof r2 == "string" ? r2 : r2 && r2[t];
            l2 && (a2[a2.length] = l2);
          }
          return a2;
        }, x2 = {};
        for (let t in f$1)
          f$1[t] !== void 0 && (x2[t] = f$1[t]);
        let z = (t, n) => {
          var i2;
          let a2 = typeof (f$1 == null ? void 0 : f$1[t]) == "object" ? { [t]: (i2 = f$1[t]) == null ? void 0 : i2.initial } : {};
          return { ...A, ...x2, ...a2, ...n };
        }, D = (t = [], n) => {
          let a2 = [];
          for (let { class: i2, className: r2, ...l2 } of t) {
            let c = true;
            for (let [o, u2] of Object.entries(l2)) {
              let d = z(o, n);
              if (Array.isArray(u2)) {
                if (!u2.includes(d[o])) {
                  c = false;
                  break;
                }
              } else if (d[o] !== u2) {
                c = false;
                break;
              }
            }
            c && (i2 && a2.push(i2), r2 && a2.push(r2));
          }
          return a2;
        }, H = (t) => {
          let n = D(h$1, t), a2 = D(e == null ? void 0 : e.compoundVariants, t);
          return a(a2, n);
        }, ee = (t) => {
          let n = H(t);
          if (!Array.isArray(n))
            return n;
          let a2 = {};
          for (let i2 of n)
            if (typeof i2 == "string" && (a2.base = j(a2.base, i2)(m)), typeof i2 == "object")
              for (let [r2, l2] of Object.entries(i2))
                a2[r2] = j(a2[r2], l2)(m);
          return a2;
        }, te = (t) => {
          if (V.length < 1)
            return null;
          let n = {};
          for (let { slots: a2 = [], class: i2, className: r2, ...l2 } of V) {
            if (!u(l2)) {
              let c = true;
              for (let o of Object.keys(l2)) {
                let u2 = z(o, t)[o];
                if (u2 === void 0 || (Array.isArray(l2[o]) ? !l2[o].includes(u2) : l2[o] !== u2)) {
                  c = false;
                  break;
                }
              }
              if (!c)
                continue;
            }
            for (let c of a2)
              n[c] = n[c] || [], n[c].push([i2, r2]);
          }
          return n;
        };
        if (!u(M) || !O) {
          let t = {};
          if (typeof w == "object" && !u(w))
            for (let n of Object.keys(w))
              t[n] = (a2) => {
                var i2, r2;
                return j(w[n], p2(n, a2), ((i2 = ee(a2)) != null ? i2 : [])[n], ((r2 = te(a2)) != null ? r2 : [])[n], a2 == null ? void 0 : a2.class, a2 == null ? void 0 : a2.className)(m);
              };
          return t;
        }
        return j(S, P(), H(), f$1 == null ? void 0 : f$1.class, f$1 == null ? void 0 : f$1.className)(m);
      }, _ = () => {
        if (!(!g$1 || typeof g$1 != "object"))
          return Object.keys(g$1);
      };
      return v.variantKeys = _(), v.extend = e, v.base = S, v.slots = w, v.variants = g$1, v.defaultVariants = A, v.compoundSlots = V, v.compoundVariants = h$1, v;
    };
  }
});

// node_modules/nanoid/non-secure/index.js
var urlAlphabet, nanoid;
var init_non_secure = __esm({
  "node_modules/nanoid/non-secure/index.js"() {
    urlAlphabet = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";
    nanoid = (size3 = 21) => {
      let id = "";
      let i2 = size3;
      while (i2--) {
        id += urlAlphabet[Math.random() * 64 | 0];
      }
      return id;
    };
  }
});

// node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs
function clamp(start, value, end) {
  return max(start, min(value, end));
}
function evaluate(value, param) {
  return typeof value === "function" ? value(param) : value;
}
function getSide(placement) {
  return placement.split("-")[0];
}
function getAlignment(placement) {
  return placement.split("-")[1];
}
function getOppositeAxis(axis) {
  return axis === "x" ? "y" : "x";
}
function getAxisLength(axis) {
  return axis === "y" ? "height" : "width";
}
function getSideAxis(placement) {
  return ["top", "bottom"].includes(getSide(placement)) ? "y" : "x";
}
function getAlignmentAxis(placement) {
  return getOppositeAxis(getSideAxis(placement));
}
function getAlignmentSides(placement, rects, rtl) {
  if (rtl === void 0) {
    rtl = false;
  }
  const alignment = getAlignment(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const length = getAxisLength(alignmentAxis);
  let mainAlignmentSide = alignmentAxis === "x" ? alignment === (rtl ? "end" : "start") ? "right" : "left" : alignment === "start" ? "bottom" : "top";
  if (rects.reference[length] > rects.floating[length]) {
    mainAlignmentSide = getOppositePlacement(mainAlignmentSide);
  }
  return [mainAlignmentSide, getOppositePlacement(mainAlignmentSide)];
}
function getExpandedPlacements(placement) {
  const oppositePlacement = getOppositePlacement(placement);
  return [getOppositeAlignmentPlacement(placement), oppositePlacement, getOppositeAlignmentPlacement(oppositePlacement)];
}
function getOppositeAlignmentPlacement(placement) {
  return placement.replace(/start|end/g, (alignment) => oppositeAlignmentMap[alignment]);
}
function getSideList(side, isStart, rtl) {
  const lr = ["left", "right"];
  const rl = ["right", "left"];
  const tb = ["top", "bottom"];
  const bt = ["bottom", "top"];
  switch (side) {
    case "top":
    case "bottom":
      if (rtl)
        return isStart ? rl : lr;
      return isStart ? lr : rl;
    case "left":
    case "right":
      return isStart ? tb : bt;
    default:
      return [];
  }
}
function getOppositeAxisPlacements(placement, flipAlignment, direction, rtl) {
  const alignment = getAlignment(placement);
  let list = getSideList(getSide(placement), direction === "start", rtl);
  if (alignment) {
    list = list.map((side) => side + "-" + alignment);
    if (flipAlignment) {
      list = list.concat(list.map(getOppositeAlignmentPlacement));
    }
  }
  return list;
}
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, (side) => oppositeSideMap[side]);
}
function expandPaddingObject(padding) {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    ...padding
  };
}
function getPaddingObject(padding) {
  return typeof padding !== "number" ? expandPaddingObject(padding) : {
    top: padding,
    right: padding,
    bottom: padding,
    left: padding
  };
}
function rectToClientRect(rect) {
  return {
    ...rect,
    top: rect.y,
    left: rect.x,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  };
}
var min, max, round, floor, createCoords, oppositeSideMap, oppositeAlignmentMap;
var init_floating_ui_utils = __esm({
  "node_modules/@floating-ui/utils/dist/floating-ui.utils.mjs"() {
    min = Math.min;
    max = Math.max;
    round = Math.round;
    floor = Math.floor;
    createCoords = (v) => ({
      x: v,
      y: v
    });
    oppositeSideMap = {
      left: "right",
      right: "left",
      bottom: "top",
      top: "bottom"
    };
    oppositeAlignmentMap = {
      start: "end",
      end: "start"
    };
  }
});

// node_modules/@floating-ui/core/dist/floating-ui.core.mjs
function computeCoordsFromPlacement(_ref, placement, rtl) {
  let {
    reference,
    floating
  } = _ref;
  const sideAxis = getSideAxis(placement);
  const alignmentAxis = getAlignmentAxis(placement);
  const alignLength = getAxisLength(alignmentAxis);
  const side = getSide(placement);
  const isVertical = sideAxis === "y";
  const commonX = reference.x + reference.width / 2 - floating.width / 2;
  const commonY = reference.y + reference.height / 2 - floating.height / 2;
  const commonAlign = reference[alignLength] / 2 - floating[alignLength] / 2;
  let coords;
  switch (side) {
    case "top":
      coords = {
        x: commonX,
        y: reference.y - floating.height
      };
      break;
    case "bottom":
      coords = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;
    case "right":
      coords = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;
    case "left":
      coords = {
        x: reference.x - floating.width,
        y: commonY
      };
      break;
    default:
      coords = {
        x: reference.x,
        y: reference.y
      };
  }
  switch (getAlignment(placement)) {
    case "start":
      coords[alignmentAxis] -= commonAlign * (rtl && isVertical ? -1 : 1);
      break;
    case "end":
      coords[alignmentAxis] += commonAlign * (rtl && isVertical ? -1 : 1);
      break;
  }
  return coords;
}
async function detectOverflow(state, options2) {
  var _await$platform$isEle;
  if (options2 === void 0) {
    options2 = {};
  }
  const {
    x: x2,
    y: y2,
    platform: platform2,
    rects,
    elements,
    strategy
  } = state;
  const {
    boundary = "clippingAncestors",
    rootBoundary = "viewport",
    elementContext = "floating",
    altBoundary = false,
    padding = 0
  } = evaluate(options2, state);
  const paddingObject = getPaddingObject(padding);
  const altContext = elementContext === "floating" ? "reference" : "floating";
  const element2 = elements[altBoundary ? altContext : elementContext];
  const clippingClientRect = rectToClientRect(await platform2.getClippingRect({
    element: ((_await$platform$isEle = await (platform2.isElement == null ? void 0 : platform2.isElement(element2))) != null ? _await$platform$isEle : true) ? element2 : element2.contextElement || await (platform2.getDocumentElement == null ? void 0 : platform2.getDocumentElement(elements.floating)),
    boundary,
    rootBoundary,
    strategy
  }));
  const rect = elementContext === "floating" ? {
    ...rects.floating,
    x: x2,
    y: y2
  } : rects.reference;
  const offsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(elements.floating));
  const offsetScale = await (platform2.isElement == null ? void 0 : platform2.isElement(offsetParent)) ? await (platform2.getScale == null ? void 0 : platform2.getScale(offsetParent)) || {
    x: 1,
    y: 1
  } : {
    x: 1,
    y: 1
  };
  const elementClientRect = rectToClientRect(platform2.convertOffsetParentRelativeRectToViewportRelativeRect ? await platform2.convertOffsetParentRelativeRectToViewportRelativeRect({
    elements,
    rect,
    offsetParent,
    strategy
  }) : rect);
  return {
    top: (clippingClientRect.top - elementClientRect.top + paddingObject.top) / offsetScale.y,
    bottom: (elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom) / offsetScale.y,
    left: (clippingClientRect.left - elementClientRect.left + paddingObject.left) / offsetScale.x,
    right: (elementClientRect.right - clippingClientRect.right + paddingObject.right) / offsetScale.x
  };
}
async function convertValueToCoords(state, options2) {
  const {
    placement,
    platform: platform2,
    elements
  } = state;
  const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const isVertical = getSideAxis(placement) === "y";
  const mainAxisMulti = ["left", "top"].includes(side) ? -1 : 1;
  const crossAxisMulti = rtl && isVertical ? -1 : 1;
  const rawValue = evaluate(options2, state);
  let {
    mainAxis,
    crossAxis,
    alignmentAxis
  } = typeof rawValue === "number" ? {
    mainAxis: rawValue,
    crossAxis: 0,
    alignmentAxis: null
  } : {
    mainAxis: 0,
    crossAxis: 0,
    alignmentAxis: null,
    ...rawValue
  };
  if (alignment && typeof alignmentAxis === "number") {
    crossAxis = alignment === "end" ? alignmentAxis * -1 : alignmentAxis;
  }
  return isVertical ? {
    x: crossAxis * crossAxisMulti,
    y: mainAxis * mainAxisMulti
  } : {
    x: mainAxis * mainAxisMulti,
    y: crossAxis * crossAxisMulti
  };
}
var computePosition, arrow, flip, offset, shift, size;
var init_floating_ui_core = __esm({
  "node_modules/@floating-ui/core/dist/floating-ui.core.mjs"() {
    init_floating_ui_utils();
    init_floating_ui_utils();
    computePosition = async (reference, floating, config) => {
      const {
        placement = "bottom",
        strategy = "absolute",
        middleware = [],
        platform: platform2
      } = config;
      const validMiddleware = middleware.filter(Boolean);
      const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(floating));
      let rects = await platform2.getElementRects({
        reference,
        floating,
        strategy
      });
      let {
        x: x2,
        y: y2
      } = computeCoordsFromPlacement(rects, placement, rtl);
      let statefulPlacement = placement;
      let middlewareData = {};
      let resetCount = 0;
      for (let i2 = 0; i2 < validMiddleware.length; i2++) {
        const {
          name,
          fn
        } = validMiddleware[i2];
        const {
          x: nextX,
          y: nextY,
          data: data2,
          reset: reset2
        } = await fn({
          x: x2,
          y: y2,
          initialPlacement: placement,
          placement: statefulPlacement,
          strategy,
          middlewareData,
          rects,
          platform: platform2,
          elements: {
            reference,
            floating
          }
        });
        x2 = nextX != null ? nextX : x2;
        y2 = nextY != null ? nextY : y2;
        middlewareData = {
          ...middlewareData,
          [name]: {
            ...middlewareData[name],
            ...data2
          }
        };
        if (reset2 && resetCount <= 50) {
          resetCount++;
          if (typeof reset2 === "object") {
            if (reset2.placement) {
              statefulPlacement = reset2.placement;
            }
            if (reset2.rects) {
              rects = reset2.rects === true ? await platform2.getElementRects({
                reference,
                floating,
                strategy
              }) : reset2.rects;
            }
            ({
              x: x2,
              y: y2
            } = computeCoordsFromPlacement(rects, statefulPlacement, rtl));
          }
          i2 = -1;
        }
      }
      return {
        x: x2,
        y: y2,
        placement: statefulPlacement,
        strategy,
        middlewareData
      };
    };
    arrow = (options2) => ({
      name: "arrow",
      options: options2,
      async fn(state) {
        const {
          x: x2,
          y: y2,
          placement,
          rects,
          platform: platform2,
          elements,
          middlewareData
        } = state;
        const {
          element: element2,
          padding = 0
        } = evaluate(options2, state) || {};
        if (element2 == null) {
          return {};
        }
        const paddingObject = getPaddingObject(padding);
        const coords = {
          x: x2,
          y: y2
        };
        const axis = getAlignmentAxis(placement);
        const length = getAxisLength(axis);
        const arrowDimensions = await platform2.getDimensions(element2);
        const isYAxis = axis === "y";
        const minProp = isYAxis ? "top" : "left";
        const maxProp = isYAxis ? "bottom" : "right";
        const clientProp = isYAxis ? "clientHeight" : "clientWidth";
        const endDiff = rects.reference[length] + rects.reference[axis] - coords[axis] - rects.floating[length];
        const startDiff = coords[axis] - rects.reference[axis];
        const arrowOffsetParent = await (platform2.getOffsetParent == null ? void 0 : platform2.getOffsetParent(element2));
        let clientSize = arrowOffsetParent ? arrowOffsetParent[clientProp] : 0;
        if (!clientSize || !await (platform2.isElement == null ? void 0 : platform2.isElement(arrowOffsetParent))) {
          clientSize = elements.floating[clientProp] || rects.floating[length];
        }
        const centerToReference = endDiff / 2 - startDiff / 2;
        const largestPossiblePadding = clientSize / 2 - arrowDimensions[length] / 2 - 1;
        const minPadding = min(paddingObject[minProp], largestPossiblePadding);
        const maxPadding = min(paddingObject[maxProp], largestPossiblePadding);
        const min$1 = minPadding;
        const max2 = clientSize - arrowDimensions[length] - maxPadding;
        const center = clientSize / 2 - arrowDimensions[length] / 2 + centerToReference;
        const offset2 = clamp(min$1, center, max2);
        const shouldAddOffset = !middlewareData.arrow && getAlignment(placement) != null && center !== offset2 && rects.reference[length] / 2 - (center < min$1 ? minPadding : maxPadding) - arrowDimensions[length] / 2 < 0;
        const alignmentOffset = shouldAddOffset ? center < min$1 ? center - min$1 : center - max2 : 0;
        return {
          [axis]: coords[axis] + alignmentOffset,
          data: {
            [axis]: offset2,
            centerOffset: center - offset2 - alignmentOffset,
            ...shouldAddOffset && {
              alignmentOffset
            }
          },
          reset: shouldAddOffset
        };
      }
    });
    flip = function(options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      return {
        name: "flip",
        options: options2,
        async fn(state) {
          var _middlewareData$arrow, _middlewareData$flip;
          const {
            placement,
            middlewareData,
            rects,
            initialPlacement,
            platform: platform2,
            elements
          } = state;
          const {
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = true,
            fallbackPlacements: specifiedFallbackPlacements,
            fallbackStrategy = "bestFit",
            fallbackAxisSideDirection = "none",
            flipAlignment = true,
            ...detectOverflowOptions
          } = evaluate(options2, state);
          if ((_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
            return {};
          }
          const side = getSide(placement);
          const isBasePlacement = getSide(initialPlacement) === initialPlacement;
          const rtl = await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating));
          const fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipAlignment ? [getOppositePlacement(initialPlacement)] : getExpandedPlacements(initialPlacement));
          if (!specifiedFallbackPlacements && fallbackAxisSideDirection !== "none") {
            fallbackPlacements.push(...getOppositeAxisPlacements(initialPlacement, flipAlignment, fallbackAxisSideDirection, rtl));
          }
          const placements2 = [initialPlacement, ...fallbackPlacements];
          const overflow = await detectOverflow(state, detectOverflowOptions);
          const overflows = [];
          let overflowsData = ((_middlewareData$flip = middlewareData.flip) == null ? void 0 : _middlewareData$flip.overflows) || [];
          if (checkMainAxis) {
            overflows.push(overflow[side]);
          }
          if (checkCrossAxis) {
            const sides2 = getAlignmentSides(placement, rects, rtl);
            overflows.push(overflow[sides2[0]], overflow[sides2[1]]);
          }
          overflowsData = [...overflowsData, {
            placement,
            overflows
          }];
          if (!overflows.every((side2) => side2 <= 0)) {
            var _middlewareData$flip2, _overflowsData$filter;
            const nextIndex = (((_middlewareData$flip2 = middlewareData.flip) == null ? void 0 : _middlewareData$flip2.index) || 0) + 1;
            const nextPlacement = placements2[nextIndex];
            if (nextPlacement) {
              return {
                data: {
                  index: nextIndex,
                  overflows: overflowsData
                },
                reset: {
                  placement: nextPlacement
                }
              };
            }
            let resetPlacement = (_overflowsData$filter = overflowsData.filter((d) => d.overflows[0] <= 0).sort((a2, b) => a2.overflows[1] - b.overflows[1])[0]) == null ? void 0 : _overflowsData$filter.placement;
            if (!resetPlacement) {
              switch (fallbackStrategy) {
                case "bestFit": {
                  var _overflowsData$map$so;
                  const placement2 = (_overflowsData$map$so = overflowsData.map((d) => [d.placement, d.overflows.filter((overflow2) => overflow2 > 0).reduce((acc, overflow2) => acc + overflow2, 0)]).sort((a2, b) => a2[1] - b[1])[0]) == null ? void 0 : _overflowsData$map$so[0];
                  if (placement2) {
                    resetPlacement = placement2;
                  }
                  break;
                }
                case "initialPlacement":
                  resetPlacement = initialPlacement;
                  break;
              }
            }
            if (placement !== resetPlacement) {
              return {
                reset: {
                  placement: resetPlacement
                }
              };
            }
          }
          return {};
        }
      };
    };
    offset = function(options2) {
      if (options2 === void 0) {
        options2 = 0;
      }
      return {
        name: "offset",
        options: options2,
        async fn(state) {
          var _middlewareData$offse, _middlewareData$arrow;
          const {
            x: x2,
            y: y2,
            placement,
            middlewareData
          } = state;
          const diffCoords = await convertValueToCoords(state, options2);
          if (placement === ((_middlewareData$offse = middlewareData.offset) == null ? void 0 : _middlewareData$offse.placement) && (_middlewareData$arrow = middlewareData.arrow) != null && _middlewareData$arrow.alignmentOffset) {
            return {};
          }
          return {
            x: x2 + diffCoords.x,
            y: y2 + diffCoords.y,
            data: {
              ...diffCoords,
              placement
            }
          };
        }
      };
    };
    shift = function(options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      return {
        name: "shift",
        options: options2,
        async fn(state) {
          const {
            x: x2,
            y: y2,
            placement
          } = state;
          const {
            mainAxis: checkMainAxis = true,
            crossAxis: checkCrossAxis = false,
            limiter = {
              fn: (_ref) => {
                let {
                  x: x3,
                  y: y3
                } = _ref;
                return {
                  x: x3,
                  y: y3
                };
              }
            },
            ...detectOverflowOptions
          } = evaluate(options2, state);
          const coords = {
            x: x2,
            y: y2
          };
          const overflow = await detectOverflow(state, detectOverflowOptions);
          const crossAxis = getSideAxis(getSide(placement));
          const mainAxis = getOppositeAxis(crossAxis);
          let mainAxisCoord = coords[mainAxis];
          let crossAxisCoord = coords[crossAxis];
          if (checkMainAxis) {
            const minSide = mainAxis === "y" ? "top" : "left";
            const maxSide = mainAxis === "y" ? "bottom" : "right";
            const min2 = mainAxisCoord + overflow[minSide];
            const max2 = mainAxisCoord - overflow[maxSide];
            mainAxisCoord = clamp(min2, mainAxisCoord, max2);
          }
          if (checkCrossAxis) {
            const minSide = crossAxis === "y" ? "top" : "left";
            const maxSide = crossAxis === "y" ? "bottom" : "right";
            const min2 = crossAxisCoord + overflow[minSide];
            const max2 = crossAxisCoord - overflow[maxSide];
            crossAxisCoord = clamp(min2, crossAxisCoord, max2);
          }
          const limitedCoords = limiter.fn({
            ...state,
            [mainAxis]: mainAxisCoord,
            [crossAxis]: crossAxisCoord
          });
          return {
            ...limitedCoords,
            data: {
              x: limitedCoords.x - x2,
              y: limitedCoords.y - y2
            }
          };
        }
      };
    };
    size = function(options2) {
      if (options2 === void 0) {
        options2 = {};
      }
      return {
        name: "size",
        options: options2,
        async fn(state) {
          const {
            placement,
            rects,
            platform: platform2,
            elements
          } = state;
          const {
            apply = () => {
            },
            ...detectOverflowOptions
          } = evaluate(options2, state);
          const overflow = await detectOverflow(state, detectOverflowOptions);
          const side = getSide(placement);
          const alignment = getAlignment(placement);
          const isYAxis = getSideAxis(placement) === "y";
          const {
            width,
            height
          } = rects.floating;
          let heightSide;
          let widthSide;
          if (side === "top" || side === "bottom") {
            heightSide = side;
            widthSide = alignment === (await (platform2.isRTL == null ? void 0 : platform2.isRTL(elements.floating)) ? "start" : "end") ? "left" : "right";
          } else {
            widthSide = side;
            heightSide = alignment === "end" ? "top" : "bottom";
          }
          const overflowAvailableHeight = height - overflow[heightSide];
          const overflowAvailableWidth = width - overflow[widthSide];
          const noShift = !state.middlewareData.shift;
          let availableHeight = overflowAvailableHeight;
          let availableWidth = overflowAvailableWidth;
          if (isYAxis) {
            const maximumClippingWidth = width - overflow.left - overflow.right;
            availableWidth = alignment || noShift ? min(overflowAvailableWidth, maximumClippingWidth) : maximumClippingWidth;
          } else {
            const maximumClippingHeight = height - overflow.top - overflow.bottom;
            availableHeight = alignment || noShift ? min(overflowAvailableHeight, maximumClippingHeight) : maximumClippingHeight;
          }
          if (noShift && !alignment) {
            const xMin = max(overflow.left, 0);
            const xMax = max(overflow.right, 0);
            const yMin = max(overflow.top, 0);
            const yMax = max(overflow.bottom, 0);
            if (isYAxis) {
              availableWidth = width - 2 * (xMin !== 0 || xMax !== 0 ? xMin + xMax : max(overflow.left, overflow.right));
            } else {
              availableHeight = height - 2 * (yMin !== 0 || yMax !== 0 ? yMin + yMax : max(overflow.top, overflow.bottom));
            }
          }
          await apply({
            ...state,
            availableWidth,
            availableHeight
          });
          const nextDimensions = await platform2.getDimensions(elements.floating);
          if (width !== nextDimensions.width || height !== nextDimensions.height) {
            return {
              reset: {
                rects: true
              }
            };
          }
          return {};
        }
      };
    };
  }
});

// node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs
function getNodeName(node) {
  if (isNode(node)) {
    return (node.nodeName || "").toLowerCase();
  }
  return "#document";
}
function getWindow(node) {
  var _node$ownerDocument;
  return (node == null || (_node$ownerDocument = node.ownerDocument) == null ? void 0 : _node$ownerDocument.defaultView) || window;
}
function getDocumentElement(node) {
  var _ref;
  return (_ref = (isNode(node) ? node.ownerDocument : node.document) || window.document) == null ? void 0 : _ref.documentElement;
}
function isNode(value) {
  return value instanceof Node || value instanceof getWindow(value).Node;
}
function isElement(value) {
  return value instanceof Element || value instanceof getWindow(value).Element;
}
function isHTMLElement(value) {
  return value instanceof HTMLElement || value instanceof getWindow(value).HTMLElement;
}
function isShadowRoot(value) {
  if (typeof ShadowRoot === "undefined") {
    return false;
  }
  return value instanceof ShadowRoot || value instanceof getWindow(value).ShadowRoot;
}
function isOverflowElement(element2) {
  const {
    overflow,
    overflowX,
    overflowY,
    display
  } = getComputedStyle2(element2);
  return /auto|scroll|overlay|hidden|clip/.test(overflow + overflowY + overflowX) && !["inline", "contents"].includes(display);
}
function isTableElement(element2) {
  return ["table", "td", "th"].includes(getNodeName(element2));
}
function isContainingBlock(element2) {
  const webkit = isWebKit();
  const css = getComputedStyle2(element2);
  return css.transform !== "none" || css.perspective !== "none" || (css.containerType ? css.containerType !== "normal" : false) || !webkit && (css.backdropFilter ? css.backdropFilter !== "none" : false) || !webkit && (css.filter ? css.filter !== "none" : false) || ["transform", "perspective", "filter"].some((value) => (css.willChange || "").includes(value)) || ["paint", "layout", "strict", "content"].some((value) => (css.contain || "").includes(value));
}
function getContainingBlock(element2) {
  let currentNode = getParentNode(element2);
  while (isHTMLElement(currentNode) && !isLastTraversableNode(currentNode)) {
    if (isContainingBlock(currentNode)) {
      return currentNode;
    } else {
      currentNode = getParentNode(currentNode);
    }
  }
  return null;
}
function isWebKit() {
  if (typeof CSS === "undefined" || !CSS.supports)
    return false;
  return CSS.supports("-webkit-backdrop-filter", "none");
}
function isLastTraversableNode(node) {
  return ["html", "body", "#document"].includes(getNodeName(node));
}
function getComputedStyle2(element2) {
  return getWindow(element2).getComputedStyle(element2);
}
function getNodeScroll(element2) {
  if (isElement(element2)) {
    return {
      scrollLeft: element2.scrollLeft,
      scrollTop: element2.scrollTop
    };
  }
  return {
    scrollLeft: element2.pageXOffset,
    scrollTop: element2.pageYOffset
  };
}
function getParentNode(node) {
  if (getNodeName(node) === "html") {
    return node;
  }
  const result = (
    // Step into the shadow DOM of the parent of a slotted node.
    node.assignedSlot || // DOM Element detected.
    node.parentNode || // ShadowRoot detected.
    isShadowRoot(node) && node.host || // Fallback.
    getDocumentElement(node)
  );
  return isShadowRoot(result) ? result.host : result;
}
function getNearestOverflowAncestor(node) {
  const parentNode = getParentNode(node);
  if (isLastTraversableNode(parentNode)) {
    return node.ownerDocument ? node.ownerDocument.body : node.body;
  }
  if (isHTMLElement(parentNode) && isOverflowElement(parentNode)) {
    return parentNode;
  }
  return getNearestOverflowAncestor(parentNode);
}
function getOverflowAncestors(node, list, traverseIframes) {
  var _node$ownerDocument2;
  if (list === void 0) {
    list = [];
  }
  if (traverseIframes === void 0) {
    traverseIframes = true;
  }
  const scrollableAncestor = getNearestOverflowAncestor(node);
  const isBody = scrollableAncestor === ((_node$ownerDocument2 = node.ownerDocument) == null ? void 0 : _node$ownerDocument2.body);
  const win = getWindow(scrollableAncestor);
  if (isBody) {
    return list.concat(win, win.visualViewport || [], isOverflowElement(scrollableAncestor) ? scrollableAncestor : [], win.frameElement && traverseIframes ? getOverflowAncestors(win.frameElement) : []);
  }
  return list.concat(scrollableAncestor, getOverflowAncestors(scrollableAncestor, [], traverseIframes));
}
var init_floating_ui_utils_dom = __esm({
  "node_modules/@floating-ui/utils/dist/floating-ui.utils.dom.mjs"() {
  }
});

// node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs
function getCssDimensions(element2) {
  const css = getComputedStyle2(element2);
  let width = parseFloat(css.width) || 0;
  let height = parseFloat(css.height) || 0;
  const hasOffset = isHTMLElement(element2);
  const offsetWidth = hasOffset ? element2.offsetWidth : width;
  const offsetHeight = hasOffset ? element2.offsetHeight : height;
  const shouldFallback = round(width) !== offsetWidth || round(height) !== offsetHeight;
  if (shouldFallback) {
    width = offsetWidth;
    height = offsetHeight;
  }
  return {
    width,
    height,
    $: shouldFallback
  };
}
function unwrapElement(element2) {
  return !isElement(element2) ? element2.contextElement : element2;
}
function getScale(element2) {
  const domElement = unwrapElement(element2);
  if (!isHTMLElement(domElement)) {
    return createCoords(1);
  }
  const rect = domElement.getBoundingClientRect();
  const {
    width,
    height,
    $
  } = getCssDimensions(domElement);
  let x2 = ($ ? round(rect.width) : rect.width) / width;
  let y2 = ($ ? round(rect.height) : rect.height) / height;
  if (!x2 || !Number.isFinite(x2)) {
    x2 = 1;
  }
  if (!y2 || !Number.isFinite(y2)) {
    y2 = 1;
  }
  return {
    x: x2,
    y: y2
  };
}
function getVisualOffsets(element2) {
  const win = getWindow(element2);
  if (!isWebKit() || !win.visualViewport) {
    return noOffsets;
  }
  return {
    x: win.visualViewport.offsetLeft,
    y: win.visualViewport.offsetTop
  };
}
function shouldAddVisualOffsets(element2, isFixed, floatingOffsetParent) {
  if (isFixed === void 0) {
    isFixed = false;
  }
  if (!floatingOffsetParent || isFixed && floatingOffsetParent !== getWindow(element2)) {
    return false;
  }
  return isFixed;
}
function getBoundingClientRect(element2, includeScale, isFixedStrategy, offsetParent) {
  if (includeScale === void 0) {
    includeScale = false;
  }
  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }
  const clientRect = element2.getBoundingClientRect();
  const domElement = unwrapElement(element2);
  let scale = createCoords(1);
  if (includeScale) {
    if (offsetParent) {
      if (isElement(offsetParent)) {
        scale = getScale(offsetParent);
      }
    } else {
      scale = getScale(element2);
    }
  }
  const visualOffsets = shouldAddVisualOffsets(domElement, isFixedStrategy, offsetParent) ? getVisualOffsets(domElement) : createCoords(0);
  let x2 = (clientRect.left + visualOffsets.x) / scale.x;
  let y2 = (clientRect.top + visualOffsets.y) / scale.y;
  let width = clientRect.width / scale.x;
  let height = clientRect.height / scale.y;
  if (domElement) {
    const win = getWindow(domElement);
    const offsetWin = offsetParent && isElement(offsetParent) ? getWindow(offsetParent) : offsetParent;
    let currentWin = win;
    let currentIFrame = currentWin.frameElement;
    while (currentIFrame && offsetParent && offsetWin !== currentWin) {
      const iframeScale = getScale(currentIFrame);
      const iframeRect = currentIFrame.getBoundingClientRect();
      const css = getComputedStyle2(currentIFrame);
      const left = iframeRect.left + (currentIFrame.clientLeft + parseFloat(css.paddingLeft)) * iframeScale.x;
      const top = iframeRect.top + (currentIFrame.clientTop + parseFloat(css.paddingTop)) * iframeScale.y;
      x2 *= iframeScale.x;
      y2 *= iframeScale.y;
      width *= iframeScale.x;
      height *= iframeScale.y;
      x2 += left;
      y2 += top;
      currentWin = getWindow(currentIFrame);
      currentIFrame = currentWin.frameElement;
    }
  }
  return rectToClientRect({
    width,
    height,
    x: x2,
    y: y2
  });
}
function isTopLayer(floating) {
  return topLayerSelectors.some((selector) => {
    try {
      return floating.matches(selector);
    } catch (e) {
      return false;
    }
  });
}
function convertOffsetParentRelativeRectToViewportRelativeRect(_ref) {
  let {
    elements,
    rect,
    offsetParent,
    strategy
  } = _ref;
  const isFixed = strategy === "fixed";
  const documentElement = getDocumentElement(offsetParent);
  const topLayer = elements ? isTopLayer(elements.floating) : false;
  if (offsetParent === documentElement || topLayer && isFixed) {
    return rect;
  }
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  let scale = createCoords(1);
  const offsets = createCoords(0);
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isHTMLElement(offsetParent)) {
      const offsetRect = getBoundingClientRect(offsetParent);
      scale = getScale(offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    }
  }
  return {
    width: rect.width * scale.x,
    height: rect.height * scale.y,
    x: rect.x * scale.x - scroll.scrollLeft * scale.x + offsets.x,
    y: rect.y * scale.y - scroll.scrollTop * scale.y + offsets.y
  };
}
function getClientRects(element2) {
  return Array.from(element2.getClientRects());
}
function getWindowScrollBarX(element2) {
  return getBoundingClientRect(getDocumentElement(element2)).left + getNodeScroll(element2).scrollLeft;
}
function getDocumentRect(element2) {
  const html = getDocumentElement(element2);
  const scroll = getNodeScroll(element2);
  const body2 = element2.ownerDocument.body;
  const width = max(html.scrollWidth, html.clientWidth, body2.scrollWidth, body2.clientWidth);
  const height = max(html.scrollHeight, html.clientHeight, body2.scrollHeight, body2.clientHeight);
  let x2 = -scroll.scrollLeft + getWindowScrollBarX(element2);
  const y2 = -scroll.scrollTop;
  if (getComputedStyle2(body2).direction === "rtl") {
    x2 += max(html.clientWidth, body2.clientWidth) - width;
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getViewportRect(element2, strategy) {
  const win = getWindow(element2);
  const html = getDocumentElement(element2);
  const visualViewport = win.visualViewport;
  let width = html.clientWidth;
  let height = html.clientHeight;
  let x2 = 0;
  let y2 = 0;
  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    const visualViewportBased = isWebKit();
    if (!visualViewportBased || visualViewportBased && strategy === "fixed") {
      x2 = visualViewport.offsetLeft;
      y2 = visualViewport.offsetTop;
    }
  }
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getInnerBoundingClientRect(element2, strategy) {
  const clientRect = getBoundingClientRect(element2, true, strategy === "fixed");
  const top = clientRect.top + element2.clientTop;
  const left = clientRect.left + element2.clientLeft;
  const scale = isHTMLElement(element2) ? getScale(element2) : createCoords(1);
  const width = element2.clientWidth * scale.x;
  const height = element2.clientHeight * scale.y;
  const x2 = left * scale.x;
  const y2 = top * scale.y;
  return {
    width,
    height,
    x: x2,
    y: y2
  };
}
function getClientRectFromClippingAncestor(element2, clippingAncestor, strategy) {
  let rect;
  if (clippingAncestor === "viewport") {
    rect = getViewportRect(element2, strategy);
  } else if (clippingAncestor === "document") {
    rect = getDocumentRect(getDocumentElement(element2));
  } else if (isElement(clippingAncestor)) {
    rect = getInnerBoundingClientRect(clippingAncestor, strategy);
  } else {
    const visualOffsets = getVisualOffsets(element2);
    rect = {
      ...clippingAncestor,
      x: clippingAncestor.x - visualOffsets.x,
      y: clippingAncestor.y - visualOffsets.y
    };
  }
  return rectToClientRect(rect);
}
function hasFixedPositionAncestor(element2, stopNode) {
  const parentNode = getParentNode(element2);
  if (parentNode === stopNode || !isElement(parentNode) || isLastTraversableNode(parentNode)) {
    return false;
  }
  return getComputedStyle2(parentNode).position === "fixed" || hasFixedPositionAncestor(parentNode, stopNode);
}
function getClippingElementAncestors(element2, cache) {
  const cachedResult = cache.get(element2);
  if (cachedResult) {
    return cachedResult;
  }
  let result = getOverflowAncestors(element2, [], false).filter((el) => isElement(el) && getNodeName(el) !== "body");
  let currentContainingBlockComputedStyle = null;
  const elementIsFixed = getComputedStyle2(element2).position === "fixed";
  let currentNode = elementIsFixed ? getParentNode(element2) : element2;
  while (isElement(currentNode) && !isLastTraversableNode(currentNode)) {
    const computedStyle = getComputedStyle2(currentNode);
    const currentNodeIsContaining = isContainingBlock(currentNode);
    if (!currentNodeIsContaining && computedStyle.position === "fixed") {
      currentContainingBlockComputedStyle = null;
    }
    const shouldDropCurrentNode = elementIsFixed ? !currentNodeIsContaining && !currentContainingBlockComputedStyle : !currentNodeIsContaining && computedStyle.position === "static" && !!currentContainingBlockComputedStyle && ["absolute", "fixed"].includes(currentContainingBlockComputedStyle.position) || isOverflowElement(currentNode) && !currentNodeIsContaining && hasFixedPositionAncestor(element2, currentNode);
    if (shouldDropCurrentNode) {
      result = result.filter((ancestor) => ancestor !== currentNode);
    } else {
      currentContainingBlockComputedStyle = computedStyle;
    }
    currentNode = getParentNode(currentNode);
  }
  cache.set(element2, result);
  return result;
}
function getClippingRect(_ref) {
  let {
    element: element2,
    boundary,
    rootBoundary,
    strategy
  } = _ref;
  const elementClippingAncestors = boundary === "clippingAncestors" ? getClippingElementAncestors(element2, this._c) : [].concat(boundary);
  const clippingAncestors = [...elementClippingAncestors, rootBoundary];
  const firstClippingAncestor = clippingAncestors[0];
  const clippingRect = clippingAncestors.reduce((accRect, clippingAncestor) => {
    const rect = getClientRectFromClippingAncestor(element2, clippingAncestor, strategy);
    accRect.top = max(rect.top, accRect.top);
    accRect.right = min(rect.right, accRect.right);
    accRect.bottom = min(rect.bottom, accRect.bottom);
    accRect.left = max(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromClippingAncestor(element2, firstClippingAncestor, strategy));
  return {
    width: clippingRect.right - clippingRect.left,
    height: clippingRect.bottom - clippingRect.top,
    x: clippingRect.left,
    y: clippingRect.top
  };
}
function getDimensions(element2) {
  const {
    width,
    height
  } = getCssDimensions(element2);
  return {
    width,
    height
  };
}
function getRectRelativeToOffsetParent(element2, offsetParent, strategy) {
  const isOffsetParentAnElement = isHTMLElement(offsetParent);
  const documentElement = getDocumentElement(offsetParent);
  const isFixed = strategy === "fixed";
  const rect = getBoundingClientRect(element2, true, isFixed, offsetParent);
  let scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  const offsets = createCoords(0);
  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if (getNodeName(offsetParent) !== "body" || isOverflowElement(documentElement)) {
      scroll = getNodeScroll(offsetParent);
    }
    if (isOffsetParentAnElement) {
      const offsetRect = getBoundingClientRect(offsetParent, true, isFixed, offsetParent);
      offsets.x = offsetRect.x + offsetParent.clientLeft;
      offsets.y = offsetRect.y + offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = getWindowScrollBarX(documentElement);
    }
  }
  const x2 = rect.left + scroll.scrollLeft - offsets.x;
  const y2 = rect.top + scroll.scrollTop - offsets.y;
  return {
    x: x2,
    y: y2,
    width: rect.width,
    height: rect.height
  };
}
function getTrueOffsetParent(element2, polyfill) {
  if (!isHTMLElement(element2) || getComputedStyle2(element2).position === "fixed") {
    return null;
  }
  if (polyfill) {
    return polyfill(element2);
  }
  return element2.offsetParent;
}
function getOffsetParent(element2, polyfill) {
  const window2 = getWindow(element2);
  if (!isHTMLElement(element2) || isTopLayer(element2)) {
    return window2;
  }
  let offsetParent = getTrueOffsetParent(element2, polyfill);
  while (offsetParent && isTableElement(offsetParent) && getComputedStyle2(offsetParent).position === "static") {
    offsetParent = getTrueOffsetParent(offsetParent, polyfill);
  }
  if (offsetParent && (getNodeName(offsetParent) === "html" || getNodeName(offsetParent) === "body" && getComputedStyle2(offsetParent).position === "static" && !isContainingBlock(offsetParent))) {
    return window2;
  }
  return offsetParent || getContainingBlock(element2) || window2;
}
function isRTL(element2) {
  return getComputedStyle2(element2).direction === "rtl";
}
function observeMove(element2, onMove) {
  let io = null;
  let timeoutId;
  const root2 = getDocumentElement(element2);
  function cleanup() {
    var _io;
    clearTimeout(timeoutId);
    (_io = io) == null || _io.disconnect();
    io = null;
  }
  function refresh(skip, threshold) {
    if (skip === void 0) {
      skip = false;
    }
    if (threshold === void 0) {
      threshold = 1;
    }
    cleanup();
    const {
      left,
      top,
      width,
      height
    } = element2.getBoundingClientRect();
    if (!skip) {
      onMove();
    }
    if (!width || !height) {
      return;
    }
    const insetTop = floor(top);
    const insetRight = floor(root2.clientWidth - (left + width));
    const insetBottom = floor(root2.clientHeight - (top + height));
    const insetLeft = floor(left);
    const rootMargin = -insetTop + "px " + -insetRight + "px " + -insetBottom + "px " + -insetLeft + "px";
    const options2 = {
      rootMargin,
      threshold: max(0, min(1, threshold)) || 1
    };
    let isFirstUpdate = true;
    function handleObserve(entries) {
      const ratio = entries[0].intersectionRatio;
      if (ratio !== threshold) {
        if (!isFirstUpdate) {
          return refresh();
        }
        if (!ratio) {
          timeoutId = setTimeout(() => {
            refresh(false, 1e-7);
          }, 100);
        } else {
          refresh(false, ratio);
        }
      }
      isFirstUpdate = false;
    }
    try {
      io = new IntersectionObserver(handleObserve, {
        ...options2,
        // Handle <iframe>s
        root: root2.ownerDocument
      });
    } catch (e) {
      io = new IntersectionObserver(handleObserve, options2);
    }
    io.observe(element2);
  }
  refresh(true);
  return cleanup;
}
function autoUpdate(reference, floating, update, options2) {
  if (options2 === void 0) {
    options2 = {};
  }
  const {
    ancestorScroll = true,
    ancestorResize = true,
    elementResize = typeof ResizeObserver === "function",
    layoutShift = typeof IntersectionObserver === "function",
    animationFrame = false
  } = options2;
  const referenceEl = unwrapElement(reference);
  const ancestors = ancestorScroll || ancestorResize ? [...referenceEl ? getOverflowAncestors(referenceEl) : [], ...getOverflowAncestors(floating)] : [];
  ancestors.forEach((ancestor) => {
    ancestorScroll && ancestor.addEventListener("scroll", update, {
      passive: true
    });
    ancestorResize && ancestor.addEventListener("resize", update);
  });
  const cleanupIo = referenceEl && layoutShift ? observeMove(referenceEl, update) : null;
  let reobserveFrame = -1;
  let resizeObserver = null;
  if (elementResize) {
    resizeObserver = new ResizeObserver((_ref) => {
      let [firstEntry] = _ref;
      if (firstEntry && firstEntry.target === referenceEl && resizeObserver) {
        resizeObserver.unobserve(floating);
        cancelAnimationFrame(reobserveFrame);
        reobserveFrame = requestAnimationFrame(() => {
          var _resizeObserver;
          (_resizeObserver = resizeObserver) == null || _resizeObserver.observe(floating);
        });
      }
      update();
    });
    if (referenceEl && !animationFrame) {
      resizeObserver.observe(referenceEl);
    }
    resizeObserver.observe(floating);
  }
  let frameId;
  let prevRefRect = animationFrame ? getBoundingClientRect(reference) : null;
  if (animationFrame) {
    frameLoop();
  }
  function frameLoop() {
    const nextRefRect = getBoundingClientRect(reference);
    if (prevRefRect && (nextRefRect.x !== prevRefRect.x || nextRefRect.y !== prevRefRect.y || nextRefRect.width !== prevRefRect.width || nextRefRect.height !== prevRefRect.height)) {
      update();
    }
    prevRefRect = nextRefRect;
    frameId = requestAnimationFrame(frameLoop);
  }
  update();
  return () => {
    var _resizeObserver2;
    ancestors.forEach((ancestor) => {
      ancestorScroll && ancestor.removeEventListener("scroll", update);
      ancestorResize && ancestor.removeEventListener("resize", update);
    });
    cleanupIo == null || cleanupIo();
    (_resizeObserver2 = resizeObserver) == null || _resizeObserver2.disconnect();
    resizeObserver = null;
    if (animationFrame) {
      cancelAnimationFrame(frameId);
    }
  };
}
var noOffsets, topLayerSelectors, getElementRects, platform, shift2, flip2, size2, arrow2, computePosition2;
var init_floating_ui_dom = __esm({
  "node_modules/@floating-ui/dom/dist/floating-ui.dom.mjs"() {
    init_floating_ui_core();
    init_floating_ui_core();
    init_floating_ui_utils();
    init_floating_ui_utils_dom();
    noOffsets = /* @__PURE__ */ createCoords(0);
    topLayerSelectors = [":popover-open", ":modal"];
    getElementRects = async function(data2) {
      const getOffsetParentFn = this.getOffsetParent || getOffsetParent;
      const getDimensionsFn = this.getDimensions;
      return {
        reference: getRectRelativeToOffsetParent(data2.reference, await getOffsetParentFn(data2.floating), data2.strategy),
        floating: {
          x: 0,
          y: 0,
          ...await getDimensionsFn(data2.floating)
        }
      };
    };
    platform = {
      convertOffsetParentRelativeRectToViewportRelativeRect,
      getDocumentElement,
      getClippingRect,
      getOffsetParent,
      getElementRects,
      getClientRects,
      getDimensions,
      getScale,
      isElement,
      isRTL
    };
    shift2 = shift;
    flip2 = flip;
    size2 = size;
    arrow2 = arrow;
    computePosition2 = (reference, floating, options2) => {
      const cache = /* @__PURE__ */ new Map();
      const mergedOptions = {
        platform,
        ...options2
      };
      const platformWithCache = {
        ...mergedOptions.platform,
        _c: cache
      };
      return computePosition(reference, floating, {
        ...mergedOptions,
        platform: platformWithCache
      });
    };
  }
});

// node_modules/tabbable/dist/index.esm.js
var candidateSelectors, candidateSelector, NoElement, matches, getRootNode, isInert, isContentEditable, getCandidates, getCandidatesIteratively, hasTabIndex, getTabIndex, getSortOrderTabIndex, sortOrderedTabbables, isInput, isHiddenInput, isDetailsWithSummary, getCheckedRadio, isTabbableRadio, isRadio, isNonTabbableRadio, isNodeAttached, isZeroArea, isHidden, isDisabledFromFieldset, isNodeMatchingSelectorFocusable, isNodeMatchingSelectorTabbable, isValidShadowRootTabbable, sortByOrder, tabbable, focusable, isTabbable, focusableCandidateSelector, isFocusable;
var init_index_esm = __esm({
  "node_modules/tabbable/dist/index.esm.js"() {
    candidateSelectors = ["input:not([inert])", "select:not([inert])", "textarea:not([inert])", "a[href]:not([inert])", "button:not([inert])", "[tabindex]:not(slot):not([inert])", "audio[controls]:not([inert])", "video[controls]:not([inert])", '[contenteditable]:not([contenteditable="false"]):not([inert])', "details>summary:first-of-type:not([inert])", "details:not([inert])"];
    candidateSelector = /* @__PURE__ */ candidateSelectors.join(",");
    NoElement = typeof Element === "undefined";
    matches = NoElement ? function() {
    } : Element.prototype.matches || Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    getRootNode = !NoElement && Element.prototype.getRootNode ? function(element2) {
      var _element$getRootNode;
      return element2 === null || element2 === void 0 ? void 0 : (_element$getRootNode = element2.getRootNode) === null || _element$getRootNode === void 0 ? void 0 : _element$getRootNode.call(element2);
    } : function(element2) {
      return element2 === null || element2 === void 0 ? void 0 : element2.ownerDocument;
    };
    isInert = function isInert2(node, lookUp) {
      var _node$getAttribute;
      if (lookUp === void 0) {
        lookUp = true;
      }
      var inertAtt = node === null || node === void 0 ? void 0 : (_node$getAttribute = node.getAttribute) === null || _node$getAttribute === void 0 ? void 0 : _node$getAttribute.call(node, "inert");
      var inert = inertAtt === "" || inertAtt === "true";
      var result = inert || lookUp && node && isInert2(node.parentNode);
      return result;
    };
    isContentEditable = function isContentEditable2(node) {
      var _node$getAttribute2;
      var attValue = node === null || node === void 0 ? void 0 : (_node$getAttribute2 = node.getAttribute) === null || _node$getAttribute2 === void 0 ? void 0 : _node$getAttribute2.call(node, "contenteditable");
      return attValue === "" || attValue === "true";
    };
    getCandidates = function getCandidates2(el, includeContainer, filter) {
      if (isInert(el)) {
        return [];
      }
      var candidates = Array.prototype.slice.apply(el.querySelectorAll(candidateSelector));
      if (includeContainer && matches.call(el, candidateSelector)) {
        candidates.unshift(el);
      }
      candidates = candidates.filter(filter);
      return candidates;
    };
    getCandidatesIteratively = function getCandidatesIteratively2(elements, includeContainer, options2) {
      var candidates = [];
      var elementsToCheck = Array.from(elements);
      while (elementsToCheck.length) {
        var element2 = elementsToCheck.shift();
        if (isInert(element2, false)) {
          continue;
        }
        if (element2.tagName === "SLOT") {
          var assigned = element2.assignedElements();
          var content = assigned.length ? assigned : element2.children;
          var nestedCandidates = getCandidatesIteratively2(content, true, options2);
          if (options2.flatten) {
            candidates.push.apply(candidates, nestedCandidates);
          } else {
            candidates.push({
              scopeParent: element2,
              candidates: nestedCandidates
            });
          }
        } else {
          var validCandidate = matches.call(element2, candidateSelector);
          if (validCandidate && options2.filter(element2) && (includeContainer || !elements.includes(element2))) {
            candidates.push(element2);
          }
          var shadowRoot = element2.shadowRoot || // check for an undisclosed shadow
          typeof options2.getShadowRoot === "function" && options2.getShadowRoot(element2);
          var validShadowRoot = !isInert(shadowRoot, false) && (!options2.shadowRootFilter || options2.shadowRootFilter(element2));
          if (shadowRoot && validShadowRoot) {
            var _nestedCandidates = getCandidatesIteratively2(shadowRoot === true ? element2.children : shadowRoot.children, true, options2);
            if (options2.flatten) {
              candidates.push.apply(candidates, _nestedCandidates);
            } else {
              candidates.push({
                scopeParent: element2,
                candidates: _nestedCandidates
              });
            }
          } else {
            elementsToCheck.unshift.apply(elementsToCheck, element2.children);
          }
        }
      }
      return candidates;
    };
    hasTabIndex = function hasTabIndex2(node) {
      return !isNaN(parseInt(node.getAttribute("tabindex"), 10));
    };
    getTabIndex = function getTabIndex2(node) {
      if (!node) {
        throw new Error("No node provided");
      }
      if (node.tabIndex < 0) {
        if ((/^(AUDIO|VIDEO|DETAILS)$/.test(node.tagName) || isContentEditable(node)) && !hasTabIndex(node)) {
          return 0;
        }
      }
      return node.tabIndex;
    };
    getSortOrderTabIndex = function getSortOrderTabIndex2(node, isScope) {
      var tabIndex = getTabIndex(node);
      if (tabIndex < 0 && isScope && !hasTabIndex(node)) {
        return 0;
      }
      return tabIndex;
    };
    sortOrderedTabbables = function sortOrderedTabbables2(a2, b) {
      return a2.tabIndex === b.tabIndex ? a2.documentOrder - b.documentOrder : a2.tabIndex - b.tabIndex;
    };
    isInput = function isInput2(node) {
      return node.tagName === "INPUT";
    };
    isHiddenInput = function isHiddenInput2(node) {
      return isInput(node) && node.type === "hidden";
    };
    isDetailsWithSummary = function isDetailsWithSummary2(node) {
      var r2 = node.tagName === "DETAILS" && Array.prototype.slice.apply(node.children).some(function(child) {
        return child.tagName === "SUMMARY";
      });
      return r2;
    };
    getCheckedRadio = function getCheckedRadio2(nodes, form) {
      for (var i2 = 0; i2 < nodes.length; i2++) {
        if (nodes[i2].checked && nodes[i2].form === form) {
          return nodes[i2];
        }
      }
    };
    isTabbableRadio = function isTabbableRadio2(node) {
      if (!node.name) {
        return true;
      }
      var radioScope = node.form || getRootNode(node);
      var queryRadios = function queryRadios2(name) {
        return radioScope.querySelectorAll('input[type="radio"][name="' + name + '"]');
      };
      var radioSet;
      if (typeof window !== "undefined" && typeof window.CSS !== "undefined" && typeof window.CSS.escape === "function") {
        radioSet = queryRadios(window.CSS.escape(node.name));
      } else {
        try {
          radioSet = queryRadios(node.name);
        } catch (err) {
          console.error("Looks like you have a radio button with a name attribute containing invalid CSS selector characters and need the CSS.escape polyfill: %s", err.message);
          return false;
        }
      }
      var checked = getCheckedRadio(radioSet, node.form);
      return !checked || checked === node;
    };
    isRadio = function isRadio2(node) {
      return isInput(node) && node.type === "radio";
    };
    isNonTabbableRadio = function isNonTabbableRadio2(node) {
      return isRadio(node) && !isTabbableRadio(node);
    };
    isNodeAttached = function isNodeAttached2(node) {
      var _nodeRoot;
      var nodeRoot = node && getRootNode(node);
      var nodeRootHost = (_nodeRoot = nodeRoot) === null || _nodeRoot === void 0 ? void 0 : _nodeRoot.host;
      var attached = false;
      if (nodeRoot && nodeRoot !== node) {
        var _nodeRootHost, _nodeRootHost$ownerDo, _node$ownerDocument;
        attached = !!((_nodeRootHost = nodeRootHost) !== null && _nodeRootHost !== void 0 && (_nodeRootHost$ownerDo = _nodeRootHost.ownerDocument) !== null && _nodeRootHost$ownerDo !== void 0 && _nodeRootHost$ownerDo.contains(nodeRootHost) || node !== null && node !== void 0 && (_node$ownerDocument = node.ownerDocument) !== null && _node$ownerDocument !== void 0 && _node$ownerDocument.contains(node));
        while (!attached && nodeRootHost) {
          var _nodeRoot2, _nodeRootHost2, _nodeRootHost2$ownerD;
          nodeRoot = getRootNode(nodeRootHost);
          nodeRootHost = (_nodeRoot2 = nodeRoot) === null || _nodeRoot2 === void 0 ? void 0 : _nodeRoot2.host;
          attached = !!((_nodeRootHost2 = nodeRootHost) !== null && _nodeRootHost2 !== void 0 && (_nodeRootHost2$ownerD = _nodeRootHost2.ownerDocument) !== null && _nodeRootHost2$ownerD !== void 0 && _nodeRootHost2$ownerD.contains(nodeRootHost));
        }
      }
      return attached;
    };
    isZeroArea = function isZeroArea2(node) {
      var _node$getBoundingClie = node.getBoundingClientRect(), width = _node$getBoundingClie.width, height = _node$getBoundingClie.height;
      return width === 0 && height === 0;
    };
    isHidden = function isHidden2(node, _ref) {
      var displayCheck = _ref.displayCheck, getShadowRoot = _ref.getShadowRoot;
      if (getComputedStyle(node).visibility === "hidden") {
        return true;
      }
      var isDirectSummary = matches.call(node, "details>summary:first-of-type");
      var nodeUnderDetails = isDirectSummary ? node.parentElement : node;
      if (matches.call(nodeUnderDetails, "details:not([open]) *")) {
        return true;
      }
      if (!displayCheck || displayCheck === "full" || displayCheck === "legacy-full") {
        if (typeof getShadowRoot === "function") {
          var originalNode = node;
          while (node) {
            var parentElement = node.parentElement;
            var rootNode = getRootNode(node);
            if (parentElement && !parentElement.shadowRoot && getShadowRoot(parentElement) === true) {
              return isZeroArea(node);
            } else if (node.assignedSlot) {
              node = node.assignedSlot;
            } else if (!parentElement && rootNode !== node.ownerDocument) {
              node = rootNode.host;
            } else {
              node = parentElement;
            }
          }
          node = originalNode;
        }
        if (isNodeAttached(node)) {
          return !node.getClientRects().length;
        }
        if (displayCheck !== "legacy-full") {
          return true;
        }
      } else if (displayCheck === "non-zero-area") {
        return isZeroArea(node);
      }
      return false;
    };
    isDisabledFromFieldset = function isDisabledFromFieldset2(node) {
      if (/^(INPUT|BUTTON|SELECT|TEXTAREA)$/.test(node.tagName)) {
        var parentNode = node.parentElement;
        while (parentNode) {
          if (parentNode.tagName === "FIELDSET" && parentNode.disabled) {
            for (var i2 = 0; i2 < parentNode.children.length; i2++) {
              var child = parentNode.children.item(i2);
              if (child.tagName === "LEGEND") {
                return matches.call(parentNode, "fieldset[disabled] *") ? true : !child.contains(node);
              }
            }
            return true;
          }
          parentNode = parentNode.parentElement;
        }
      }
      return false;
    };
    isNodeMatchingSelectorFocusable = function isNodeMatchingSelectorFocusable2(options2, node) {
      if (node.disabled || // we must do an inert look up to filter out any elements inside an inert ancestor
      //  because we're limited in the type of selectors we can use in JSDom (see related
      //  note related to `candidateSelectors`)
      isInert(node) || isHiddenInput(node) || isHidden(node, options2) || // For a details element with a summary, the summary element gets the focus
      isDetailsWithSummary(node) || isDisabledFromFieldset(node)) {
        return false;
      }
      return true;
    };
    isNodeMatchingSelectorTabbable = function isNodeMatchingSelectorTabbable2(options2, node) {
      if (isNonTabbableRadio(node) || getTabIndex(node) < 0 || !isNodeMatchingSelectorFocusable(options2, node)) {
        return false;
      }
      return true;
    };
    isValidShadowRootTabbable = function isValidShadowRootTabbable2(shadowHostNode) {
      var tabIndex = parseInt(shadowHostNode.getAttribute("tabindex"), 10);
      if (isNaN(tabIndex) || tabIndex >= 0) {
        return true;
      }
      return false;
    };
    sortByOrder = function sortByOrder2(candidates) {
      var regularTabbables = [];
      var orderedTabbables = [];
      candidates.forEach(function(item, i2) {
        var isScope = !!item.scopeParent;
        var element2 = isScope ? item.scopeParent : item;
        var candidateTabindex = getSortOrderTabIndex(element2, isScope);
        var elements = isScope ? sortByOrder2(item.candidates) : element2;
        if (candidateTabindex === 0) {
          isScope ? regularTabbables.push.apply(regularTabbables, elements) : regularTabbables.push(element2);
        } else {
          orderedTabbables.push({
            documentOrder: i2,
            tabIndex: candidateTabindex,
            item,
            isScope,
            content: elements
          });
        }
      });
      return orderedTabbables.sort(sortOrderedTabbables).reduce(function(acc, sortable) {
        sortable.isScope ? acc.push.apply(acc, sortable.content) : acc.push(sortable.content);
        return acc;
      }, []).concat(regularTabbables);
    };
    tabbable = function tabbable2(container, options2) {
      options2 = options2 || {};
      var candidates;
      if (options2.getShadowRoot) {
        candidates = getCandidatesIteratively([container], options2.includeContainer, {
          filter: isNodeMatchingSelectorTabbable.bind(null, options2),
          flatten: false,
          getShadowRoot: options2.getShadowRoot,
          shadowRootFilter: isValidShadowRootTabbable
        });
      } else {
        candidates = getCandidates(container, options2.includeContainer, isNodeMatchingSelectorTabbable.bind(null, options2));
      }
      return sortByOrder(candidates);
    };
    focusable = function focusable2(container, options2) {
      options2 = options2 || {};
      var candidates;
      if (options2.getShadowRoot) {
        candidates = getCandidatesIteratively([container], options2.includeContainer, {
          filter: isNodeMatchingSelectorFocusable.bind(null, options2),
          flatten: true,
          getShadowRoot: options2.getShadowRoot
        });
      } else {
        candidates = getCandidates(container, options2.includeContainer, isNodeMatchingSelectorFocusable.bind(null, options2));
      }
      return candidates;
    };
    isTabbable = function isTabbable2(node, options2) {
      options2 = options2 || {};
      if (!node) {
        throw new Error("No node provided");
      }
      if (matches.call(node, candidateSelector) === false) {
        return false;
      }
      return isNodeMatchingSelectorTabbable(options2, node);
    };
    focusableCandidateSelector = /* @__PURE__ */ candidateSelectors.concat("iframe").join(",");
    isFocusable = function isFocusable2(node, options2) {
      options2 = options2 || {};
      if (!node) {
        throw new Error("No node provided");
      }
      if (matches.call(node, focusableCandidateSelector) === false) {
        return false;
      }
      return isNodeMatchingSelectorFocusable(options2, node);
    };
  }
});

// node_modules/focus-trap/dist/focus-trap.esm.js
function ownKeys(e, r2) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r2 && (o = o.filter(function(r3) {
      return Object.getOwnPropertyDescriptor(e, r3).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r2 = 1; r2 < arguments.length; r2++) {
    var t = null != arguments[r2] ? arguments[r2] : {};
    r2 % 2 ? ownKeys(Object(t), true).forEach(function(r3) {
      _defineProperty(e, r3, t[r3]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r3) {
      Object.defineProperty(e, r3, Object.getOwnPropertyDescriptor(t, r3));
    });
  }
  return e;
}
function _defineProperty(obj, key2, value) {
  key2 = _toPropertyKey(key2);
  if (key2 in obj) {
    Object.defineProperty(obj, key2, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key2] = value;
  }
  return obj;
}
function _toPrimitive(input, hint) {
  if (typeof input !== "object" || input === null)
    return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== void 0) {
    var res = prim.call(input, hint || "default");
    if (typeof res !== "object")
      return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}
function _toPropertyKey(arg) {
  var key2 = _toPrimitive(arg, "string");
  return typeof key2 === "symbol" ? key2 : String(key2);
}
var activeFocusTraps, isSelectableInput, isEscapeEvent, isTabEvent, isKeyForward, isKeyBackward, delay, findIndex, valueOrHandler, getActualTarget, internalTrapStack, createFocusTrap;
var init_focus_trap_esm = __esm({
  "node_modules/focus-trap/dist/focus-trap.esm.js"() {
    init_index_esm();
    activeFocusTraps = {
      activateTrap: function activateTrap(trapStack, trap) {
        if (trapStack.length > 0) {
          var activeTrap = trapStack[trapStack.length - 1];
          if (activeTrap !== trap) {
            activeTrap.pause();
          }
        }
        var trapIndex = trapStack.indexOf(trap);
        if (trapIndex === -1) {
          trapStack.push(trap);
        } else {
          trapStack.splice(trapIndex, 1);
          trapStack.push(trap);
        }
      },
      deactivateTrap: function deactivateTrap(trapStack, trap) {
        var trapIndex = trapStack.indexOf(trap);
        if (trapIndex !== -1) {
          trapStack.splice(trapIndex, 1);
        }
        if (trapStack.length > 0) {
          trapStack[trapStack.length - 1].unpause();
        }
      }
    };
    isSelectableInput = function isSelectableInput2(node) {
      return node.tagName && node.tagName.toLowerCase() === "input" && typeof node.select === "function";
    };
    isEscapeEvent = function isEscapeEvent2(e) {
      return (e === null || e === void 0 ? void 0 : e.key) === "Escape" || (e === null || e === void 0 ? void 0 : e.key) === "Esc" || (e === null || e === void 0 ? void 0 : e.keyCode) === 27;
    };
    isTabEvent = function isTabEvent2(e) {
      return (e === null || e === void 0 ? void 0 : e.key) === "Tab" || (e === null || e === void 0 ? void 0 : e.keyCode) === 9;
    };
    isKeyForward = function isKeyForward2(e) {
      return isTabEvent(e) && !e.shiftKey;
    };
    isKeyBackward = function isKeyBackward2(e) {
      return isTabEvent(e) && e.shiftKey;
    };
    delay = function delay2(fn) {
      return setTimeout(fn, 0);
    };
    findIndex = function findIndex2(arr, fn) {
      var idx = -1;
      arr.every(function(value, i2) {
        if (fn(value)) {
          idx = i2;
          return false;
        }
        return true;
      });
      return idx;
    };
    valueOrHandler = function valueOrHandler2(value) {
      for (var _len = arguments.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        params[_key - 1] = arguments[_key];
      }
      return typeof value === "function" ? value.apply(void 0, params) : value;
    };
    getActualTarget = function getActualTarget2(event) {
      return event.target.shadowRoot && typeof event.composedPath === "function" ? event.composedPath()[0] : event.target;
    };
    internalTrapStack = [];
    createFocusTrap = function createFocusTrap2(elements, userOptions) {
      var doc = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.document) || document;
      var trapStack = (userOptions === null || userOptions === void 0 ? void 0 : userOptions.trapStack) || internalTrapStack;
      var config = _objectSpread2({
        returnFocusOnDeactivate: true,
        escapeDeactivates: true,
        delayInitialFocus: true,
        isKeyForward,
        isKeyBackward
      }, userOptions);
      var state = {
        // containers given to createFocusTrap()
        // @type {Array<HTMLElement>}
        containers: [],
        // list of objects identifying tabbable nodes in `containers` in the trap
        // NOTE: it's possible that a group has no tabbable nodes if nodes get removed while the trap
        //  is active, but the trap should never get to a state where there isn't at least one group
        //  with at least one tabbable node in it (that would lead to an error condition that would
        //  result in an error being thrown)
        // @type {Array<{
        //   container: HTMLElement,
        //   tabbableNodes: Array<HTMLElement>, // empty if none
        //   focusableNodes: Array<HTMLElement>, // empty if none
        //   posTabIndexesFound: boolean,
        //   firstTabbableNode: HTMLElement|undefined,
        //   lastTabbableNode: HTMLElement|undefined,
        //   firstDomTabbableNode: HTMLElement|undefined,
        //   lastDomTabbableNode: HTMLElement|undefined,
        //   nextTabbableNode: (node: HTMLElement, forward: boolean) => HTMLElement|undefined
        // }>}
        containerGroups: [],
        // same order/length as `containers` list
        // references to objects in `containerGroups`, but only those that actually have
        //  tabbable nodes in them
        // NOTE: same order as `containers` and `containerGroups`, but __not necessarily__
        //  the same length
        tabbableGroups: [],
        nodeFocusedBeforeActivation: null,
        mostRecentlyFocusedNode: null,
        active: false,
        paused: false,
        // timer ID for when delayInitialFocus is true and initial focus in this trap
        //  has been delayed during activation
        delayInitialFocusTimer: void 0,
        // the most recent KeyboardEvent for the configured nav key (typically [SHIFT+]TAB), if any
        recentNavEvent: void 0
      };
      var trap;
      var getOption = function getOption2(configOverrideOptions, optionName, configOptionName) {
        return configOverrideOptions && configOverrideOptions[optionName] !== void 0 ? configOverrideOptions[optionName] : config[configOptionName || optionName];
      };
      var findContainerIndex = function findContainerIndex2(element2, event) {
        var composedPath = typeof (event === null || event === void 0 ? void 0 : event.composedPath) === "function" ? event.composedPath() : void 0;
        return state.containerGroups.findIndex(function(_ref) {
          var container = _ref.container, tabbableNodes = _ref.tabbableNodes;
          return container.contains(element2) || // fall back to explicit tabbable search which will take into consideration any
          //  web components if the `tabbableOptions.getShadowRoot` option was used for
          //  the trap, enabling shadow DOM support in tabbable (`Node.contains()` doesn't
          //  look inside web components even if open)
          (composedPath === null || composedPath === void 0 ? void 0 : composedPath.includes(container)) || tabbableNodes.find(function(node) {
            return node === element2;
          });
        });
      };
      var getNodeForOption = function getNodeForOption2(optionName) {
        var optionValue = config[optionName];
        if (typeof optionValue === "function") {
          for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            params[_key2 - 1] = arguments[_key2];
          }
          optionValue = optionValue.apply(void 0, params);
        }
        if (optionValue === true) {
          optionValue = void 0;
        }
        if (!optionValue) {
          if (optionValue === void 0 || optionValue === false) {
            return optionValue;
          }
          throw new Error("`".concat(optionName, "` was specified but was not a node, or did not return a node"));
        }
        var node = optionValue;
        if (typeof optionValue === "string") {
          node = doc.querySelector(optionValue);
          if (!node) {
            throw new Error("`".concat(optionName, "` as selector refers to no known node"));
          }
        }
        return node;
      };
      var getInitialFocusNode = function getInitialFocusNode2() {
        var node = getNodeForOption("initialFocus");
        if (node === false) {
          return false;
        }
        if (node === void 0 || !isFocusable(node, config.tabbableOptions)) {
          if (findContainerIndex(doc.activeElement) >= 0) {
            node = doc.activeElement;
          } else {
            var firstTabbableGroup = state.tabbableGroups[0];
            var firstTabbableNode = firstTabbableGroup && firstTabbableGroup.firstTabbableNode;
            node = firstTabbableNode || getNodeForOption("fallbackFocus");
          }
        }
        if (!node) {
          throw new Error("Your focus-trap needs to have at least one focusable element");
        }
        return node;
      };
      var updateTabbableNodes = function updateTabbableNodes2() {
        state.containerGroups = state.containers.map(function(container) {
          var tabbableNodes = tabbable(container, config.tabbableOptions);
          var focusableNodes = focusable(container, config.tabbableOptions);
          var firstTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[0] : void 0;
          var lastTabbableNode = tabbableNodes.length > 0 ? tabbableNodes[tabbableNodes.length - 1] : void 0;
          var firstDomTabbableNode = focusableNodes.find(function(node) {
            return isTabbable(node);
          });
          var lastDomTabbableNode = focusableNodes.slice().reverse().find(function(node) {
            return isTabbable(node);
          });
          var posTabIndexesFound = !!tabbableNodes.find(function(node) {
            return getTabIndex(node) > 0;
          });
          return {
            container,
            tabbableNodes,
            focusableNodes,
            /** True if at least one node with positive `tabindex` was found in this container. */
            posTabIndexesFound,
            /** First tabbable node in container, __tabindex__ order; `undefined` if none. */
            firstTabbableNode,
            /** Last tabbable node in container, __tabindex__ order; `undefined` if none. */
            lastTabbableNode,
            // NOTE: DOM order is NOT NECESSARILY "document position" order, but figuring that out
            //  would require more than just https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
            //  because that API doesn't work with Shadow DOM as well as it should (@see
            //  https://github.com/whatwg/dom/issues/320) and since this first/last is only needed, so far,
            //  to address an edge case related to positive tabindex support, this seems like a much easier,
            //  "close enough most of the time" alternative for positive tabindexes which should generally
            //  be avoided anyway...
            /** First tabbable node in container, __DOM__ order; `undefined` if none. */
            firstDomTabbableNode,
            /** Last tabbable node in container, __DOM__ order; `undefined` if none. */
            lastDomTabbableNode,
            /**
             * Finds the __tabbable__ node that follows the given node in the specified direction,
             *  in this container, if any.
             * @param {HTMLElement} node
             * @param {boolean} [forward] True if going in forward tab order; false if going
             *  in reverse.
             * @returns {HTMLElement|undefined} The next tabbable node, if any.
             */
            nextTabbableNode: function nextTabbableNode(node) {
              var forward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
              var nodeIdx = tabbableNodes.indexOf(node);
              if (nodeIdx < 0) {
                if (forward) {
                  return focusableNodes.slice(focusableNodes.indexOf(node) + 1).find(function(el) {
                    return isTabbable(el);
                  });
                }
                return focusableNodes.slice(0, focusableNodes.indexOf(node)).reverse().find(function(el) {
                  return isTabbable(el);
                });
              }
              return tabbableNodes[nodeIdx + (forward ? 1 : -1)];
            }
          };
        });
        state.tabbableGroups = state.containerGroups.filter(function(group) {
          return group.tabbableNodes.length > 0;
        });
        if (state.tabbableGroups.length <= 0 && !getNodeForOption("fallbackFocus")) {
          throw new Error("Your focus-trap must have at least one container with at least one tabbable node in it at all times");
        }
        if (state.containerGroups.find(function(g2) {
          return g2.posTabIndexesFound;
        }) && state.containerGroups.length > 1) {
          throw new Error("At least one node with a positive tabindex was found in one of your focus-trap's multiple containers. Positive tabindexes are only supported in single-container focus-traps.");
        }
      };
      var getActiveElement = function getActiveElement2(el) {
        var activeElement = el.activeElement;
        if (!activeElement) {
          return;
        }
        if (activeElement.shadowRoot && activeElement.shadowRoot.activeElement !== null) {
          return getActiveElement2(activeElement.shadowRoot);
        }
        return activeElement;
      };
      var tryFocus = function tryFocus2(node) {
        if (node === false) {
          return;
        }
        if (node === getActiveElement(document)) {
          return;
        }
        if (!node || !node.focus) {
          tryFocus2(getInitialFocusNode());
          return;
        }
        node.focus({
          preventScroll: !!config.preventScroll
        });
        state.mostRecentlyFocusedNode = node;
        if (isSelectableInput(node)) {
          node.select();
        }
      };
      var getReturnFocusNode = function getReturnFocusNode2(previousActiveElement) {
        var node = getNodeForOption("setReturnFocus", previousActiveElement);
        return node ? node : node === false ? false : previousActiveElement;
      };
      var findNextNavNode = function findNextNavNode2(_ref2) {
        var target = _ref2.target, event = _ref2.event, _ref2$isBackward = _ref2.isBackward, isBackward = _ref2$isBackward === void 0 ? false : _ref2$isBackward;
        target = target || getActualTarget(event);
        updateTabbableNodes();
        var destinationNode = null;
        if (state.tabbableGroups.length > 0) {
          var containerIndex = findContainerIndex(target, event);
          var containerGroup = containerIndex >= 0 ? state.containerGroups[containerIndex] : void 0;
          if (containerIndex < 0) {
            if (isBackward) {
              destinationNode = state.tabbableGroups[state.tabbableGroups.length - 1].lastTabbableNode;
            } else {
              destinationNode = state.tabbableGroups[0].firstTabbableNode;
            }
          } else if (isBackward) {
            var startOfGroupIndex = findIndex(state.tabbableGroups, function(_ref3) {
              var firstTabbableNode = _ref3.firstTabbableNode;
              return target === firstTabbableNode;
            });
            if (startOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target, false))) {
              startOfGroupIndex = containerIndex;
            }
            if (startOfGroupIndex >= 0) {
              var destinationGroupIndex = startOfGroupIndex === 0 ? state.tabbableGroups.length - 1 : startOfGroupIndex - 1;
              var destinationGroup = state.tabbableGroups[destinationGroupIndex];
              destinationNode = getTabIndex(target) >= 0 ? destinationGroup.lastTabbableNode : destinationGroup.lastDomTabbableNode;
            } else if (!isTabEvent(event)) {
              destinationNode = containerGroup.nextTabbableNode(target, false);
            }
          } else {
            var lastOfGroupIndex = findIndex(state.tabbableGroups, function(_ref4) {
              var lastTabbableNode = _ref4.lastTabbableNode;
              return target === lastTabbableNode;
            });
            if (lastOfGroupIndex < 0 && (containerGroup.container === target || isFocusable(target, config.tabbableOptions) && !isTabbable(target, config.tabbableOptions) && !containerGroup.nextTabbableNode(target))) {
              lastOfGroupIndex = containerIndex;
            }
            if (lastOfGroupIndex >= 0) {
              var _destinationGroupIndex = lastOfGroupIndex === state.tabbableGroups.length - 1 ? 0 : lastOfGroupIndex + 1;
              var _destinationGroup = state.tabbableGroups[_destinationGroupIndex];
              destinationNode = getTabIndex(target) >= 0 ? _destinationGroup.firstTabbableNode : _destinationGroup.firstDomTabbableNode;
            } else if (!isTabEvent(event)) {
              destinationNode = containerGroup.nextTabbableNode(target);
            }
          }
        } else {
          destinationNode = getNodeForOption("fallbackFocus");
        }
        return destinationNode;
      };
      var checkPointerDown = function checkPointerDown2(e) {
        var target = getActualTarget(e);
        if (findContainerIndex(target, e) >= 0) {
          return;
        }
        if (valueOrHandler(config.clickOutsideDeactivates, e)) {
          trap.deactivate({
            // NOTE: by setting `returnFocus: false`, deactivate() will do nothing,
            //  which will result in the outside click setting focus to the node
            //  that was clicked (and if not focusable, to "nothing"); by setting
            //  `returnFocus: true`, we'll attempt to re-focus the node originally-focused
            //  on activation (or the configured `setReturnFocus` node), whether the
            //  outside click was on a focusable node or not
            returnFocus: config.returnFocusOnDeactivate
          });
          return;
        }
        if (valueOrHandler(config.allowOutsideClick, e)) {
          return;
        }
        e.preventDefault();
      };
      var checkFocusIn = function checkFocusIn2(event) {
        var target = getActualTarget(event);
        var targetContained = findContainerIndex(target, event) >= 0;
        if (targetContained || target instanceof Document) {
          if (targetContained) {
            state.mostRecentlyFocusedNode = target;
          }
        } else {
          event.stopImmediatePropagation();
          var nextNode;
          var navAcrossContainers = true;
          if (state.mostRecentlyFocusedNode) {
            if (getTabIndex(state.mostRecentlyFocusedNode) > 0) {
              var mruContainerIdx = findContainerIndex(state.mostRecentlyFocusedNode);
              var tabbableNodes = state.containerGroups[mruContainerIdx].tabbableNodes;
              if (tabbableNodes.length > 0) {
                var mruTabIdx = tabbableNodes.findIndex(function(node) {
                  return node === state.mostRecentlyFocusedNode;
                });
                if (mruTabIdx >= 0) {
                  if (config.isKeyForward(state.recentNavEvent)) {
                    if (mruTabIdx + 1 < tabbableNodes.length) {
                      nextNode = tabbableNodes[mruTabIdx + 1];
                      navAcrossContainers = false;
                    }
                  } else {
                    if (mruTabIdx - 1 >= 0) {
                      nextNode = tabbableNodes[mruTabIdx - 1];
                      navAcrossContainers = false;
                    }
                  }
                }
              }
            } else {
              if (!state.containerGroups.some(function(g2) {
                return g2.tabbableNodes.some(function(n) {
                  return getTabIndex(n) > 0;
                });
              })) {
                navAcrossContainers = false;
              }
            }
          } else {
            navAcrossContainers = false;
          }
          if (navAcrossContainers) {
            nextNode = findNextNavNode({
              // move FROM the MRU node, not event-related node (which will be the node that is
              //  outside the trap causing the focus escape we're trying to fix)
              target: state.mostRecentlyFocusedNode,
              isBackward: config.isKeyBackward(state.recentNavEvent)
            });
          }
          if (nextNode) {
            tryFocus(nextNode);
          } else {
            tryFocus(state.mostRecentlyFocusedNode || getInitialFocusNode());
          }
        }
        state.recentNavEvent = void 0;
      };
      var checkKeyNav = function checkKeyNav2(event) {
        var isBackward = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
        state.recentNavEvent = event;
        var destinationNode = findNextNavNode({
          event,
          isBackward
        });
        if (destinationNode) {
          if (isTabEvent(event)) {
            event.preventDefault();
          }
          tryFocus(destinationNode);
        }
      };
      var checkKey = function checkKey2(event) {
        if (isEscapeEvent(event) && valueOrHandler(config.escapeDeactivates, event) !== false) {
          event.preventDefault();
          trap.deactivate();
          return;
        }
        if (config.isKeyForward(event) || config.isKeyBackward(event)) {
          checkKeyNav(event, config.isKeyBackward(event));
        }
      };
      var checkClick = function checkClick2(e) {
        var target = getActualTarget(e);
        if (findContainerIndex(target, e) >= 0) {
          return;
        }
        if (valueOrHandler(config.clickOutsideDeactivates, e)) {
          return;
        }
        if (valueOrHandler(config.allowOutsideClick, e)) {
          return;
        }
        e.preventDefault();
        e.stopImmediatePropagation();
      };
      var addListeners = function addListeners2() {
        if (!state.active) {
          return;
        }
        activeFocusTraps.activateTrap(trapStack, trap);
        state.delayInitialFocusTimer = config.delayInitialFocus ? delay(function() {
          tryFocus(getInitialFocusNode());
        }) : tryFocus(getInitialFocusNode());
        doc.addEventListener("focusin", checkFocusIn, true);
        doc.addEventListener("mousedown", checkPointerDown, {
          capture: true,
          passive: false
        });
        doc.addEventListener("touchstart", checkPointerDown, {
          capture: true,
          passive: false
        });
        doc.addEventListener("click", checkClick, {
          capture: true,
          passive: false
        });
        doc.addEventListener("keydown", checkKey, {
          capture: true,
          passive: false
        });
        return trap;
      };
      var removeListeners = function removeListeners2() {
        if (!state.active) {
          return;
        }
        doc.removeEventListener("focusin", checkFocusIn, true);
        doc.removeEventListener("mousedown", checkPointerDown, true);
        doc.removeEventListener("touchstart", checkPointerDown, true);
        doc.removeEventListener("click", checkClick, true);
        doc.removeEventListener("keydown", checkKey, true);
        return trap;
      };
      var checkDomRemoval = function checkDomRemoval2(mutations) {
        var isFocusedNodeRemoved = mutations.some(function(mutation) {
          var removedNodes = Array.from(mutation.removedNodes);
          return removedNodes.some(function(node) {
            return node === state.mostRecentlyFocusedNode;
          });
        });
        if (isFocusedNodeRemoved) {
          tryFocus(getInitialFocusNode());
        }
      };
      var mutationObserver = typeof window !== "undefined" && "MutationObserver" in window ? new MutationObserver(checkDomRemoval) : void 0;
      var updateObservedNodes = function updateObservedNodes2() {
        if (!mutationObserver) {
          return;
        }
        mutationObserver.disconnect();
        if (state.active && !state.paused) {
          state.containers.map(function(container) {
            mutationObserver.observe(container, {
              subtree: true,
              childList: true
            });
          });
        }
      };
      trap = {
        get active() {
          return state.active;
        },
        get paused() {
          return state.paused;
        },
        activate: function activate(activateOptions) {
          if (state.active) {
            return this;
          }
          var onActivate = getOption(activateOptions, "onActivate");
          var onPostActivate = getOption(activateOptions, "onPostActivate");
          var checkCanFocusTrap = getOption(activateOptions, "checkCanFocusTrap");
          if (!checkCanFocusTrap) {
            updateTabbableNodes();
          }
          state.active = true;
          state.paused = false;
          state.nodeFocusedBeforeActivation = doc.activeElement;
          onActivate === null || onActivate === void 0 || onActivate();
          var finishActivation = function finishActivation2() {
            if (checkCanFocusTrap) {
              updateTabbableNodes();
            }
            addListeners();
            updateObservedNodes();
            onPostActivate === null || onPostActivate === void 0 || onPostActivate();
          };
          if (checkCanFocusTrap) {
            checkCanFocusTrap(state.containers.concat()).then(finishActivation, finishActivation);
            return this;
          }
          finishActivation();
          return this;
        },
        deactivate: function deactivate(deactivateOptions) {
          if (!state.active) {
            return this;
          }
          var options2 = _objectSpread2({
            onDeactivate: config.onDeactivate,
            onPostDeactivate: config.onPostDeactivate,
            checkCanReturnFocus: config.checkCanReturnFocus
          }, deactivateOptions);
          clearTimeout(state.delayInitialFocusTimer);
          state.delayInitialFocusTimer = void 0;
          removeListeners();
          state.active = false;
          state.paused = false;
          updateObservedNodes();
          activeFocusTraps.deactivateTrap(trapStack, trap);
          var onDeactivate = getOption(options2, "onDeactivate");
          var onPostDeactivate = getOption(options2, "onPostDeactivate");
          var checkCanReturnFocus = getOption(options2, "checkCanReturnFocus");
          var returnFocus = getOption(options2, "returnFocus", "returnFocusOnDeactivate");
          onDeactivate === null || onDeactivate === void 0 || onDeactivate();
          var finishDeactivation = function finishDeactivation2() {
            delay(function() {
              if (returnFocus) {
                tryFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation));
              }
              onPostDeactivate === null || onPostDeactivate === void 0 || onPostDeactivate();
            });
          };
          if (returnFocus && checkCanReturnFocus) {
            checkCanReturnFocus(getReturnFocusNode(state.nodeFocusedBeforeActivation)).then(finishDeactivation, finishDeactivation);
            return this;
          }
          finishDeactivation();
          return this;
        },
        pause: function pause(pauseOptions) {
          if (state.paused || !state.active) {
            return this;
          }
          var onPause = getOption(pauseOptions, "onPause");
          var onPostPause = getOption(pauseOptions, "onPostPause");
          state.paused = true;
          onPause === null || onPause === void 0 || onPause();
          removeListeners();
          updateObservedNodes();
          onPostPause === null || onPostPause === void 0 || onPostPause();
          return this;
        },
        unpause: function unpause(unpauseOptions) {
          if (!state.paused || !state.active) {
            return this;
          }
          var onUnpause = getOption(unpauseOptions, "onUnpause");
          var onPostUnpause = getOption(unpauseOptions, "onPostUnpause");
          state.paused = false;
          onUnpause === null || onUnpause === void 0 || onUnpause();
          updateTabbableNodes();
          addListeners();
          updateObservedNodes();
          onPostUnpause === null || onPostUnpause === void 0 || onPostUnpause();
          return this;
        },
        updateContainerElements: function updateContainerElements(containerElements) {
          var elementsAsArray = [].concat(containerElements).filter(Boolean);
          state.containers = elementsAsArray.map(function(element2) {
            return typeof element2 === "string" ? doc.querySelector(element2) : element2;
          });
          if (state.active) {
            updateTabbableNodes();
          }
          updateObservedNodes();
          return this;
        }
      };
      trap.updateContainerElements(elements);
      return trap;
    };
  }
});

// .svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/_layout.svelte.js
var layout_svelte_exports3 = {};
__export(layout_svelte_exports3, {
  default: () => _layout2
});
function create_custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  return new CustomEvent(type, { detail, bubbles, cancelable });
}
function createEventDispatcher() {
  const component_context = current_component_context;
  if (component_context === null) {
    throw new Error("createEventDispatcher can only be used during component initialisation.");
  }
  return (type, detail, options2) => {
    const events = (
      /** @type {Record<string, Function | Function[]>} */
      component_context.s.$$events?.[
        /** @type {any} */
        type
      ]
    );
    if (events) {
      const callbacks = is_array(events) ? events.slice() : [events];
      const event = create_custom_event(
        /** @type {string} */
        type,
        detail,
        options2
      );
      for (const fn of callbacks) {
        fn.call(component_context.x, event);
      }
      return !event.defaultPrevented;
    }
    return true;
  };
}
function last(array2) {
  return array2[array2.length - 1];
}
function wrapArray(array2, startIndex) {
  return array2.map((_, index21) => array2[(startIndex + index21) % array2.length]);
}
function styleToString(style) {
  return Object.keys(style).reduce((str, key2) => {
    if (style[key2] === void 0)
      return str;
    return str + `${key2}:${style[key2]};`;
  }, "");
}
function disabledAttr(disabled) {
  return disabled ? true : void 0;
}
function portalAttr(portal) {
  if (portal !== null) {
    return "";
  }
  return void 0;
}
function lightable(value) {
  function subscribe(run2) {
    run2(value);
    return () => {
    };
  }
  return { subscribe };
}
function makeElement(name, args) {
  const { stores, action, returned } = args ?? {};
  const derivedStore = (() => {
    if (stores && returned) {
      return derived(stores, (values) => {
        const result = returned(values);
        if (isFunctionWithParams(result)) {
          const fn = (...args2) => {
            return hiddenAction({
              ...result(...args2),
              [`data-melt-${name}`]: "",
              action: action ?? noop4
            });
          };
          fn.action = action ?? noop4;
          return fn;
        }
        return hiddenAction({
          ...result,
          [`data-melt-${name}`]: "",
          action: action ?? noop4
        });
      });
    } else {
      const returnedFn = returned;
      const result = returnedFn?.();
      if (isFunctionWithParams(result)) {
        const resultFn = (...args2) => {
          return hiddenAction({
            ...result(...args2),
            [`data-melt-${name}`]: "",
            action: action ?? noop4
          });
        };
        resultFn.action = action ?? noop4;
        return lightable(resultFn);
      }
      return lightable(hiddenAction({
        ...result,
        [`data-melt-${name}`]: "",
        action: action ?? noop4
      }));
    }
  })();
  const actionFn = action ?? (() => {
  });
  actionFn.subscribe = derivedStore.subscribe;
  return actionFn;
}
function createElHelpers(prefix2) {
  const name = (part) => part ? `${prefix2}-${part}` : prefix2;
  const attribute = (part) => `data-melt-${prefix2}${part ? `-${part}` : ""}`;
  const selector = (part) => `[data-melt-${prefix2}${part ? `-${part}` : ""}]`;
  const getEl = (part) => document.querySelector(selector(part));
  return {
    name,
    attribute,
    selector,
    getEl
  };
}
function isElement2(element2) {
  return element2 instanceof Element;
}
function isHTMLElement2(element2) {
  return element2 instanceof HTMLElement;
}
function isElementDisabled(element2) {
  const ariaDisabled = element2.getAttribute("aria-disabled");
  const disabled = element2.getAttribute("disabled");
  const dataDisabled = element2.hasAttribute("data-disabled");
  if (ariaDisabled === "true" || disabled !== null || dataDisabled) {
    return true;
  }
  return false;
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
function isReadable(value) {
  return isObject(value) && "subscribe" in value;
}
function executeCallbacks(...callbacks) {
  return (...args) => {
    for (const callback of callbacks) {
      if (typeof callback === "function") {
        callback(...args);
      }
    }
  };
}
function noop4() {
}
function addEventListener(target, event, handler2, options2) {
  const events = Array.isArray(event) ? event : [event];
  events.forEach((_event) => target.addEventListener(_event, handler2, options2));
  return () => {
    events.forEach((_event) => target.removeEventListener(_event, handler2, options2));
  };
}
function addMeltEventListener(target, event, handler2, options2) {
  const events = Array.isArray(event) ? event : [event];
  if (typeof handler2 === "function") {
    const handlerWithMelt = withMelt((_event) => handler2(_event));
    events.forEach((_event) => target.addEventListener(_event, handlerWithMelt, options2));
    return () => {
      events.forEach((_event) => target.removeEventListener(_event, handlerWithMelt, options2));
    };
  }
  return () => noop4();
}
function dispatchMeltEvent(originalEvent) {
  const node = originalEvent.currentTarget;
  if (!isHTMLElement2(node))
    return null;
  const customMeltEvent = new CustomEvent(`m-${originalEvent.type}`, {
    detail: {
      originalEvent
    },
    cancelable: true
  });
  node.dispatchEvent(customMeltEvent);
  return customMeltEvent;
}
function withMelt(handler2) {
  return (event) => {
    const customEvent = dispatchMeltEvent(event);
    if (customEvent?.defaultPrevented)
      return;
    return handler2(event);
  };
}
function addHighlight(element2) {
  element2.setAttribute("data-highlighted", "");
}
function removeHighlight(element2) {
  element2.removeAttribute("data-highlighted");
}
function omit(obj, ...keys) {
  const result = {};
  for (const key2 of Object.keys(obj)) {
    if (!keys.includes(key2)) {
      result[key2] = obj[key2];
    }
  }
  return result;
}
function withGet(store) {
  return {
    ...store,
    get: () => get_store_value(store)
  };
}
function sleep2(ms) {
  return new Promise((resolve2) => setTimeout(resolve2, ms));
}
function generateId$1() {
  return nanoid(10);
}
function generateIds(args) {
  return args.reduce((acc, curr) => {
    acc[curr] = generateId$1();
    return acc;
  }, {});
}
function debounce(fn, wait = 500) {
  let timeout = null;
  return function(...args) {
    const later = () => {
      timeout = null;
      fn(...args);
    };
    timeout && clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
function getPlatform() {
  const agent = navigator.userAgentData;
  return agent?.platform ?? navigator.platform;
}
function assignStyle(el, style) {
  if (!el)
    return;
  const previousStyle = el.style.cssText;
  Object.assign(el.style, style);
  return () => {
    el.style.cssText = previousStyle;
  };
}
function setCSSProperty(el, property, value) {
  if (!el)
    return;
  const previousValue = el.style.getPropertyValue(property);
  el.style.setProperty(property, value);
  return () => {
    if (previousValue) {
      el.style.setProperty(property, previousValue);
    } else {
      el.style.removeProperty(property);
    }
  };
}
function getPaddingProperty(documentElement) {
  const documentLeft = documentElement.getBoundingClientRect().left;
  const scrollbarX = Math.round(documentLeft) + documentElement.scrollLeft;
  return scrollbarX ? "paddingLeft" : "paddingRight";
}
function removeScroll(_document) {
  const doc = _document ?? document;
  const win = doc.defaultView ?? window;
  const { documentElement, body: body2 } = doc;
  const locked = body2.hasAttribute(LOCK_CLASSNAME);
  if (locked)
    return noop4;
  body2.setAttribute(LOCK_CLASSNAME, "");
  const scrollbarWidth = win.innerWidth - documentElement.clientWidth;
  const setScrollbarWidthProperty = () => setCSSProperty(documentElement, "--scrollbar-width", `${scrollbarWidth}px`);
  const paddingProperty = getPaddingProperty(documentElement);
  const scrollbarSidePadding = win.getComputedStyle(body2)[paddingProperty];
  const setStyle = () => assignStyle(body2, {
    overflow: "hidden",
    [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`
  });
  const setIOSStyle = () => {
    const { scrollX, scrollY, visualViewport } = win;
    const offsetLeft = visualViewport?.offsetLeft ?? 0;
    const offsetTop = visualViewport?.offsetTop ?? 0;
    const restoreStyle = assignStyle(body2, {
      position: "fixed",
      overflow: "hidden",
      top: `${-(scrollY - Math.floor(offsetTop))}px`,
      left: `${-(scrollX - Math.floor(offsetLeft))}px`,
      right: "0",
      [paddingProperty]: `calc(${scrollbarSidePadding} + ${scrollbarWidth}px)`
    });
    return () => {
      restoreStyle?.();
      win.scrollTo(scrollX, scrollY);
    };
  };
  const cleanups = [setScrollbarWidthProperty(), isIos() ? setIOSStyle() : setStyle()];
  return () => {
    cleanups.forEach((fn) => fn?.());
    body2.removeAttribute(LOCK_CLASSNAME);
  };
}
function derivedVisible(obj) {
  const { open, forceVisible, activeTrigger } = obj;
  return derived([open, forceVisible, activeTrigger], ([$open, $forceVisible, $activeTrigger]) => ($open || $forceVisible) && $activeTrigger !== null);
}
function effect(stores, fn) {
  let cb = void 0;
  const destroy = derived(stores, (stores2) => {
    cb?.();
    cb = fn(stores2);
  }).subscribe(noop4);
  const unsub = () => {
    destroy();
    cb?.();
  };
  safeOnDestroy(unsub);
  return unsub;
}
function toWritableStores(properties) {
  const result = {};
  Object.keys(properties).forEach((key2) => {
    const propertyKey = key2;
    const value = properties[propertyKey];
    result[propertyKey] = withGet(writable(value));
  });
  return result;
}
function handleRovingFocus(nextElement) {
  if (!isBrowser3)
    return;
  sleep2(1).then(() => {
    const currentFocusedElement = document.activeElement;
    if (!isHTMLElement2(currentFocusedElement) || currentFocusedElement === nextElement)
      return;
    currentFocusedElement.tabIndex = -1;
    if (nextElement) {
      nextElement.tabIndex = 0;
      nextElement.focus();
    }
  });
}
function getFocusableElements() {
  return Array.from(document.querySelectorAll('a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), textarea:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'));
}
function getNextFocusable(currentElement) {
  const focusableElements = getFocusableElements();
  const currentIndex = focusableElements.indexOf(currentElement);
  const nextIndex = currentIndex + 1;
  const nextElement = focusableElements[nextIndex];
  if (nextIndex < focusableElements.length && isHTMLElement2(nextElement)) {
    return nextElement;
  }
  return null;
}
function getPreviousFocusable(currentElement) {
  const focusableElements = getFocusableElements();
  const currentIndex = focusableElements.indexOf(currentElement);
  const previousIndex = currentIndex - 1;
  const prevElement = focusableElements[previousIndex];
  if (previousIndex >= 0 && isHTMLElement2(prevElement)) {
    return prevElement;
  }
  return null;
}
function createTypeaheadSearch(args = {}) {
  const withDefaults = { ...defaults$3, ...args };
  const typed = withGet(writable([]));
  const resetTyped = debounce(() => {
    typed.update(() => []);
  });
  const handleTypeaheadSearch = (key2, items) => {
    if (ignoredKeys.has(key2))
      return;
    const currentItem = withDefaults.getCurrentItem();
    const $typed = get_store_value(typed);
    if (!Array.isArray($typed)) {
      return;
    }
    $typed.push(key2.toLowerCase());
    typed.set($typed);
    const candidateItems = items.filter((item) => {
      if (item.getAttribute("disabled") === "true" || item.getAttribute("aria-disabled") === "true" || item.hasAttribute("data-disabled")) {
        return false;
      }
      return true;
    });
    const isRepeated = $typed.length > 1 && $typed.every((char) => char === $typed[0]);
    const normalizeSearch = isRepeated ? $typed[0] : $typed.join("");
    const currentItemIndex = isHTMLElement2(currentItem) ? candidateItems.indexOf(currentItem) : -1;
    let wrappedItems = wrapArray(candidateItems, Math.max(currentItemIndex, 0));
    const excludeCurrentItem = normalizeSearch.length === 1;
    if (excludeCurrentItem) {
      wrappedItems = wrappedItems.filter((v) => v !== currentItem);
    }
    const nextItem = wrappedItems.find((item) => item?.innerText && item.innerText.toLowerCase().startsWith(normalizeSearch.toLowerCase()));
    if (isHTMLElement2(nextItem) && nextItem !== currentItem) {
      withDefaults.onMatch(nextItem);
    }
    resetTyped();
  };
  return {
    typed,
    resetTyped,
    handleTypeaheadSearch
  };
}
function getPortalParent(node) {
  let parent = node.parentElement;
  while (isHTMLElement2(parent) && !parent.hasAttribute("data-portal")) {
    parent = parent.parentElement;
  }
  return parent || "body";
}
function getPortalDestination(node, portalProp) {
  if (portalProp !== void 0)
    return portalProp;
  const portalParent = getPortalParent(node);
  if (portalParent === "body")
    return document.body;
  return null;
}
async function handleFocus(args) {
  const { prop, defaultEl } = args;
  await Promise.all([sleep2(1), tick]);
  if (prop === void 0) {
    defaultEl?.focus();
    return;
  }
  const returned = isFunction(prop) ? prop(defaultEl) : prop;
  if (typeof returned === "string") {
    const el = document.querySelector(returned);
    if (!isHTMLElement2(el))
      return;
    el.focus();
  } else if (isHTMLElement2(returned)) {
    returned.focus();
  }
}
function useFloating(reference, floating, opts = {}) {
  if (!floating || !reference || opts === null)
    return {
      destroy: noop4
    };
  const options2 = { ...defaultConfig$1, ...opts };
  const arrowEl = floating.querySelector("[data-arrow=true]");
  const middleware = [];
  if (options2.flip) {
    middleware.push(flip2({
      boundary: options2.boundary,
      padding: options2.overflowPadding
    }));
  }
  const arrowOffset = isHTMLElement2(arrowEl) ? arrowEl.offsetHeight / 2 : 0;
  if (options2.gutter || options2.offset) {
    const data2 = options2.gutter ? { mainAxis: options2.gutter } : options2.offset;
    if (data2?.mainAxis != null) {
      data2.mainAxis += arrowOffset;
    }
    middleware.push(offset(data2));
  }
  middleware.push(shift2({
    boundary: options2.boundary,
    crossAxis: options2.overlap,
    padding: options2.overflowPadding
  }));
  if (arrowEl) {
    middleware.push(arrow2({ element: arrowEl, padding: 8 }));
  }
  middleware.push(size2({
    padding: options2.overflowPadding,
    apply({ rects, availableHeight, availableWidth }) {
      if (options2.sameWidth) {
        Object.assign(floating.style, {
          width: `${Math.round(rects.reference.width)}px`,
          minWidth: "unset"
        });
      }
      if (options2.fitViewport) {
        Object.assign(floating.style, {
          maxWidth: `${availableWidth}px`,
          maxHeight: `${availableHeight}px`
        });
      }
    }
  }));
  function compute() {
    if (!reference || !floating)
      return;
    if (isHTMLElement2(reference) && !reference.ownerDocument.documentElement.contains(reference))
      return;
    const { placement, strategy } = options2;
    computePosition2(reference, floating, {
      placement,
      middleware,
      strategy
    }).then((data2) => {
      const x2 = Math.round(data2.x);
      const y2 = Math.round(data2.y);
      Object.assign(floating.style, {
        position: options2.strategy,
        top: `${y2}px`,
        left: `${x2}px`
      });
      if (isHTMLElement2(arrowEl) && data2.middlewareData.arrow) {
        const { x: x22, y: y22 } = data2.middlewareData.arrow;
        const dir = data2.placement.split("-")[0];
        Object.assign(arrowEl.style, {
          position: "absolute",
          left: x22 != null ? `${x22}px` : "",
          top: y22 != null ? `${y22}px` : "",
          [dir]: `calc(100% - ${arrowOffset}px)`,
          transform: ARROW_TRANSFORM[dir],
          backgroundColor: "inherit",
          zIndex: "inherit"
        });
      }
      return data2;
    });
  }
  Object.assign(floating.style, {
    position: options2.strategy
  });
  return {
    destroy: autoUpdate(reference, floating, compute)
  };
}
function createFocusTrap3(config = {}) {
  let trap;
  const { immediate, ...focusTrapOptions } = config;
  const hasFocus = writable(false);
  const isPaused = writable(false);
  const activate = (opts) => trap?.activate(opts);
  const deactivate = (opts) => {
    trap?.deactivate(opts);
  };
  const pause = () => {
    if (trap) {
      trap.pause();
      isPaused.set(true);
    }
  };
  const unpause = () => {
    if (trap) {
      trap.unpause();
      isPaused.set(false);
    }
  };
  const useFocusTrap = (node) => {
    trap = createFocusTrap(node, {
      ...focusTrapOptions,
      onActivate() {
        hasFocus.set(true);
        config.onActivate?.();
      },
      onDeactivate() {
        hasFocus.set(false);
        config.onDeactivate?.();
      }
    });
    if (immediate) {
      activate();
    }
    return {
      destroy() {
        deactivate();
        trap = void 0;
      }
    };
  };
  return {
    useFocusTrap,
    hasFocus: readonly(hasFocus),
    isPaused: readonly(isPaused),
    activate,
    deactivate,
    pause,
    unpause
  };
}
function useModal(node, config) {
  let unsubInteractOutside = noop4;
  function removeNodeFromVisibleModals() {
    const index21 = visibleModals.indexOf(node);
    if (index21 >= 0) {
      visibleModals.splice(index21, 1);
    }
  }
  function update(config2) {
    unsubInteractOutside();
    const { open, onClose, shouldCloseOnInteractOutside, closeOnInteractOutside } = config2;
    sleep2(100).then(() => {
      if (open) {
        visibleModals.push(node);
      } else {
        removeNodeFromVisibleModals();
      }
    });
    function isLastModal() {
      return last(visibleModals) === node;
    }
    function closeModal() {
      if (isLastModal() && onClose) {
        onClose();
        removeNodeFromVisibleModals();
      }
    }
    function onInteractOutsideStart(e) {
      const target = e.target;
      if (!isElement2(target))
        return;
      if (target && isLastModal()) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
      }
    }
    function onInteractOutside(e) {
      if (shouldCloseOnInteractOutside?.(e) && isLastModal()) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        closeModal();
      }
    }
    unsubInteractOutside = useInteractOutside(node, {
      onInteractOutsideStart,
      onInteractOutside: closeOnInteractOutside ? onInteractOutside : void 0,
      enabled: open
    }).destroy;
  }
  update(config);
  return {
    update,
    destroy() {
      removeNodeFromVisibleModals();
      unsubInteractOutside();
    }
  };
}
function useInteractOutside(node, config) {
  let unsub = noop4;
  let isPointerDown = false;
  let isPointerDownInside = false;
  let ignoreEmulatedMouseEvents = false;
  function update(config2) {
    unsub();
    const { onInteractOutside, onInteractOutsideStart, enabled } = config2;
    if (!enabled)
      return;
    function onPointerDown(e) {
      if (onInteractOutside && isValidEvent(e, node)) {
        onInteractOutsideStart?.(e);
      }
      const target = e.target;
      if (isElement2(target) && isOrContainsTarget(node, target)) {
        isPointerDownInside = true;
      }
      isPointerDown = true;
    }
    function triggerInteractOutside(e) {
      onInteractOutside?.(e);
    }
    const documentObj = getOwnerDocument(node);
    if (typeof PointerEvent !== "undefined") {
      const onPointerUp = (e) => {
        if (shouldTriggerInteractOutside(e)) {
          triggerInteractOutside(e);
        }
        resetPointerState();
      };
      unsub = executeCallbacks(addEventListener(documentObj, "pointerdown", onPointerDown, true), addEventListener(documentObj, "pointerup", onPointerUp, true));
    } else {
      const onMouseUp = (e) => {
        if (ignoreEmulatedMouseEvents) {
          ignoreEmulatedMouseEvents = false;
        } else if (shouldTriggerInteractOutside(e)) {
          triggerInteractOutside(e);
        }
        resetPointerState();
      };
      const onTouchEnd = (e) => {
        ignoreEmulatedMouseEvents = true;
        if (shouldTriggerInteractOutside(e)) {
          triggerInteractOutside(e);
        }
        resetPointerState();
      };
      unsub = executeCallbacks(addEventListener(documentObj, "mousedown", onPointerDown, true), addEventListener(documentObj, "mouseup", onMouseUp, true), addEventListener(documentObj, "touchstart", onPointerDown, true), addEventListener(documentObj, "touchend", onTouchEnd, true));
    }
  }
  function shouldTriggerInteractOutside(e) {
    if (isPointerDown && !isPointerDownInside && isValidEvent(e, node)) {
      return true;
    }
    return false;
  }
  function resetPointerState() {
    isPointerDown = false;
    isPointerDownInside = false;
  }
  update(config);
  return {
    update,
    destroy: unsub
  };
}
function isValidEvent(e, node) {
  if ("button" in e && e.button > 0)
    return false;
  const target = e.target;
  if (!isElement2(target))
    return false;
  const ownerDocument = target.ownerDocument;
  if (!ownerDocument || !ownerDocument.documentElement.contains(target)) {
    return false;
  }
  return node && !isOrContainsTarget(node, target);
}
function isOrContainsTarget(node, target) {
  return node === target || node.contains(target);
}
function getOwnerDocument(el) {
  return el?.ownerDocument ?? document;
}
function createMenuBuilder(opts) {
  const { name, selector } = createElHelpers(opts.selector);
  const { preventScroll, arrowSize, positioning, closeOnEscape, closeOnOutsideClick, portal, forceVisible, typeahead, loop, closeFocus, disableFocusFirstItem, closeOnItemClick, onOutsideClick } = opts.rootOptions;
  const rootOpen = opts.rootOpen;
  const rootActiveTrigger = opts.rootActiveTrigger;
  const nextFocusable = opts.nextFocusable;
  const prevFocusable = opts.prevFocusable;
  const isUsingKeyboard = withGet.writable(false);
  const lastPointerX = withGet(writable(0));
  const pointerGraceIntent = withGet(writable(null));
  const pointerDir = withGet(writable("right"));
  const currentFocusedItem = withGet(writable(null));
  const pointerMovingToSubmenu = withGet(derived([pointerDir, pointerGraceIntent], ([$pointerDir, $pointerGraceIntent]) => {
    return (e) => {
      const isMovingTowards = $pointerDir === $pointerGraceIntent?.side;
      return isMovingTowards && isPointerInGraceArea(e, $pointerGraceIntent?.area);
    };
  }));
  const { typed, handleTypeaheadSearch } = createTypeaheadSearch();
  const rootIds = toWritableStores({ ...generateIds(menuIdParts), ...opts.ids });
  const isVisible = derivedVisible({
    open: rootOpen,
    forceVisible,
    activeTrigger: rootActiveTrigger
  });
  const rootMenu = makeElement(name(), {
    stores: [isVisible, portal, rootIds.menu, rootIds.trigger],
    returned: ([$isVisible, $portal, $rootMenuId, $rootTriggerId]) => {
      return {
        role: "menu",
        hidden: $isVisible ? void 0 : true,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        id: $rootMenuId,
        "aria-labelledby": $rootTriggerId,
        "data-state": $isVisible ? "open" : "closed",
        "data-portal": portalAttr($portal),
        tabindex: -1
      };
    },
    action: (node) => {
      let unsubPopper = noop4;
      const unsubDerived = effect([isVisible, rootActiveTrigger, positioning, closeOnOutsideClick, portal, closeOnEscape], ([$isVisible, $rootActiveTrigger, $positioning, $closeOnOutsideClick, $portal, $closeOnEscape]) => {
        unsubPopper();
        if (!$isVisible || !$rootActiveTrigger)
          return;
        tick().then(() => {
          setMeltMenuAttribute(node, selector);
          const popper = usePopper(node, {
            anchorElement: $rootActiveTrigger,
            open: rootOpen,
            options: {
              floating: $positioning,
              modal: {
                closeOnInteractOutside: $closeOnOutsideClick,
                shouldCloseOnInteractOutside: (e) => {
                  onOutsideClick.get()?.(e);
                  if (e.defaultPrevented)
                    return false;
                  if (isHTMLElement2($rootActiveTrigger) && $rootActiveTrigger.contains(e.target)) {
                    return false;
                  }
                  return true;
                },
                onClose: () => {
                  rootOpen.set(false);
                  $rootActiveTrigger.focus();
                },
                open: $isVisible
              },
              portal: getPortalDestination(node, $portal),
              escapeKeydown: $closeOnEscape ? void 0 : null
            }
          });
          if (popper && popper.destroy) {
            unsubPopper = popper.destroy;
          }
        });
      });
      const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => {
        const target = e.target;
        const menuEl = e.currentTarget;
        if (!isHTMLElement2(target) || !isHTMLElement2(menuEl))
          return;
        const isKeyDownInside = target.closest('[role="menu"]') === menuEl;
        if (!isKeyDownInside)
          return;
        if (FIRST_LAST_KEYS.includes(e.key)) {
          handleMenuNavigation(e, loop.get() ?? false);
        }
        if (e.key === kbd.TAB) {
          e.preventDefault();
          rootOpen.set(false);
          handleTabNavigation(e, nextFocusable, prevFocusable);
          return;
        }
        const isCharacterKey = e.key.length === 1;
        const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
        if (!isModifierKey && isCharacterKey && typeahead.get() === true) {
          handleTypeaheadSearch(e.key, getMenuItems(menuEl));
        }
      }));
      return {
        destroy() {
          unsubDerived();
          unsubEvents();
          unsubPopper();
        }
      };
    }
  });
  const rootTrigger = makeElement(name("trigger"), {
    stores: [rootOpen, rootIds.menu, rootIds.trigger],
    returned: ([$rootOpen, $rootMenuId, $rootTriggerId]) => {
      return {
        "aria-controls": $rootMenuId,
        "aria-expanded": $rootOpen,
        "data-state": $rootOpen ? "open" : "closed",
        id: $rootTriggerId,
        tabindex: 0
      };
    },
    action: (node) => {
      applyAttrsIfDisabled(node);
      rootActiveTrigger.update((p2) => {
        if (p2)
          return p2;
        return node;
      });
      const unsub = executeCallbacks(addMeltEventListener(node, "click", (e) => {
        const $rootOpen = rootOpen.get();
        const triggerEl = e.currentTarget;
        if (!isHTMLElement2(triggerEl))
          return;
        handleOpen(triggerEl);
        if (!$rootOpen)
          e.preventDefault();
      }), addMeltEventListener(node, "keydown", (e) => {
        const triggerEl = e.currentTarget;
        if (!isHTMLElement2(triggerEl))
          return;
        if (!(SELECTION_KEYS.includes(e.key) || e.key === kbd.ARROW_DOWN))
          return;
        e.preventDefault();
        handleOpen(triggerEl);
        const menuId = triggerEl.getAttribute("aria-controls");
        if (!menuId)
          return;
        const menu = document.getElementById(menuId);
        if (!menu)
          return;
        const menuItems = getMenuItems(menu);
        if (!menuItems.length)
          return;
        handleRovingFocus(menuItems[0]);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const rootArrow = makeElement(name("arrow"), {
    stores: arrowSize,
    returned: ($arrowSize) => ({
      "data-arrow": true,
      style: styleToString({
        position: "absolute",
        width: `var(--arrow-size, ${$arrowSize}px)`,
        height: `var(--arrow-size, ${$arrowSize}px)`
      })
    })
  });
  const overlay = makeElement(name("overlay"), {
    stores: [isVisible],
    returned: ([$isVisible]) => {
      return {
        hidden: $isVisible ? void 0 : true,
        tabindex: -1,
        style: styleToString({
          display: $isVisible ? void 0 : "none"
        }),
        "aria-hidden": "true",
        "data-state": stateAttr($isVisible)
      };
    },
    action: (node) => {
      let unsubEscapeKeydown = noop4;
      if (closeOnEscape.get()) {
        const escapeKeydown = useEscapeKeydown(node, {
          handler: () => {
            rootOpen.set(false);
            const $rootActiveTrigger = rootActiveTrigger.get();
            if ($rootActiveTrigger)
              $rootActiveTrigger.focus();
          }
        });
        if (escapeKeydown && escapeKeydown.destroy) {
          unsubEscapeKeydown = escapeKeydown.destroy;
        }
      }
      const unsubPortal = effect([portal], ([$portal]) => {
        if ($portal === null)
          return noop4;
        const portalDestination = getPortalDestination(node, $portal);
        if (portalDestination === null)
          return noop4;
        const portalAction = usePortal(node, portalDestination);
        if (portalAction && portalAction.destroy) {
          return portalAction.destroy;
        } else {
          return noop4;
        }
      });
      return {
        destroy() {
          unsubEscapeKeydown();
          unsubPortal();
        }
      };
    }
  });
  const item = makeElement(name("item"), {
    returned: () => {
      return {
        role: "menuitem",
        tabindex: -1,
        "data-orientation": "vertical"
      };
    },
    action: (node) => {
      setMeltMenuAttribute(node, selector);
      applyAttrsIfDisabled(node);
      const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
        const itemEl = e.currentTarget;
        if (!isHTMLElement2(itemEl))
          return;
        if (isElementDisabled(itemEl)) {
          e.preventDefault();
          return;
        }
      }), addMeltEventListener(node, "click", (e) => {
        const itemEl = e.currentTarget;
        if (!isHTMLElement2(itemEl))
          return;
        if (isElementDisabled(itemEl)) {
          e.preventDefault();
          return;
        }
        if (e.defaultPrevented) {
          handleRovingFocus(itemEl);
          return;
        }
        if (closeOnItemClick.get()) {
          sleep2(1).then(() => {
            rootOpen.set(false);
          });
        }
      }), addMeltEventListener(node, "keydown", (e) => {
        onItemKeyDown(e);
      }), addMeltEventListener(node, "pointermove", (e) => {
        onMenuItemPointerMove(e);
      }), addMeltEventListener(node, "pointerleave", (e) => {
        onMenuItemPointerLeave(e);
      }), addMeltEventListener(node, "focusin", (e) => {
        onItemFocusIn(e);
      }), addMeltEventListener(node, "focusout", (e) => {
        onItemFocusOut(e);
      }));
      return {
        destroy: unsub
      };
    }
  });
  const group = makeElement(name("group"), {
    returned: () => {
      return (groupId) => ({
        role: "group",
        "aria-labelledby": groupId
      });
    }
  });
  const groupLabel = makeElement(name("group-label"), {
    returned: () => {
      return (groupId) => ({
        id: groupId
      });
    }
  });
  const checkboxItemDefaults = {
    defaultChecked: false,
    disabled: false
  };
  const createCheckboxItem = (props) => {
    const withDefaults = { ...checkboxItemDefaults, ...props };
    const checkedWritable = withDefaults.checked ?? writable(withDefaults.defaultChecked ?? null);
    const checked = overridable(checkedWritable, withDefaults.onCheckedChange);
    const disabled = writable(withDefaults.disabled);
    const checkboxItem = makeElement(name("checkbox-item"), {
      stores: [checked, disabled],
      returned: ([$checked, $disabled]) => {
        return {
          role: "menuitemcheckbox",
          tabindex: -1,
          "data-orientation": "vertical",
          "aria-checked": isIndeterminate($checked) ? "mixed" : $checked ? "true" : "false",
          "data-disabled": disabledAttr($disabled),
          "data-state": getCheckedState($checked)
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector);
        applyAttrsIfDisabled(node);
        const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement2(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            e.preventDefault();
            return;
          }
        }), addMeltEventListener(node, "click", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement2(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            e.preventDefault();
            return;
          }
          if (e.defaultPrevented) {
            handleRovingFocus(itemEl);
            return;
          }
          checked.update((prev) => {
            if (isIndeterminate(prev))
              return true;
            return !prev;
          });
          if (closeOnItemClick.get()) {
            tick().then(() => {
              rootOpen.set(false);
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          onItemKeyDown(e);
        }), addMeltEventListener(node, "pointermove", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement2(itemEl))
            return;
          if (isElementDisabled(itemEl)) {
            onItemLeave(e);
            return;
          }
          onMenuItemPointerMove(e, itemEl);
        }), addMeltEventListener(node, "pointerleave", (e) => {
          onMenuItemPointerLeave(e);
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          onItemFocusOut(e);
        }));
        return {
          destroy: unsub
        };
      }
    });
    const isChecked = derived(checked, ($checked) => $checked === true);
    const _isIndeterminate = derived(checked, ($checked) => $checked === "indeterminate");
    return {
      elements: {
        checkboxItem
      },
      states: {
        checked
      },
      helpers: {
        isChecked,
        isIndeterminate: _isIndeterminate
      },
      options: {
        disabled
      }
    };
  };
  const createMenuRadioGroup = (args = {}) => {
    const valueWritable = args.value ?? writable(args.defaultValue ?? null);
    const value = overridable(valueWritable, args.onValueChange);
    const radioGroup = makeElement(name("radio-group"), {
      returned: () => ({
        role: "group"
      })
    });
    const radioItemDefaults = {
      disabled: false
    };
    const radioItem = makeElement(name("radio-item"), {
      stores: [value],
      returned: ([$value]) => {
        return (itemProps) => {
          const { value: itemValue, disabled } = { ...radioItemDefaults, ...itemProps };
          const checked = $value === itemValue;
          return {
            disabled,
            role: "menuitemradio",
            "data-state": checked ? "checked" : "unchecked",
            "aria-checked": checked,
            "data-disabled": disabledAttr(disabled),
            "data-value": itemValue,
            "data-orientation": "vertical",
            tabindex: -1
          };
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector);
        const unsub = executeCallbacks(addMeltEventListener(node, "pointerdown", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement2(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            e.preventDefault();
            return;
          }
        }), addMeltEventListener(node, "click", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement2(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            e.preventDefault();
            return;
          }
          if (e.defaultPrevented) {
            if (!isHTMLElement2(itemEl))
              return;
            handleRovingFocus(itemEl);
            return;
          }
          value.set(itemValue);
          if (closeOnItemClick.get()) {
            tick().then(() => {
              rootOpen.set(false);
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          onItemKeyDown(e);
        }), addMeltEventListener(node, "pointermove", (e) => {
          const itemEl = e.currentTarget;
          if (!isHTMLElement2(itemEl))
            return;
          const itemValue = node.dataset.value;
          const disabled = node.dataset.disabled;
          if (disabled || itemValue === void 0) {
            onItemLeave(e);
            return;
          }
          onMenuItemPointerMove(e, itemEl);
        }), addMeltEventListener(node, "pointerleave", (e) => {
          onMenuItemPointerLeave(e);
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          onItemFocusOut(e);
        }));
        return {
          destroy: unsub
        };
      }
    });
    const isChecked = derived(value, ($value) => {
      return (itemValue) => {
        return $value === itemValue;
      };
    });
    return {
      elements: {
        radioGroup,
        radioItem
      },
      states: {
        value
      },
      helpers: {
        isChecked
      }
    };
  };
  const { elements: { root: separator } } = createSeparator({
    orientation: "horizontal"
  });
  const subMenuDefaults = {
    ...defaults$2,
    disabled: false,
    positioning: {
      placement: "right-start",
      gutter: 8
    }
  };
  const createSubmenu = (args) => {
    const withDefaults = { ...subMenuDefaults, ...args };
    const subOpenWritable = withDefaults.open ?? writable(false);
    const subOpen = overridable(subOpenWritable, withDefaults?.onOpenChange);
    const options2 = toWritableStores(omit(withDefaults, "ids"));
    const { positioning: positioning2, arrowSize: arrowSize2, disabled } = options2;
    const subActiveTrigger = withGet(writable(null));
    const subOpenTimer = withGet(writable(null));
    const pointerGraceTimer = withGet(writable(0));
    const subIds = toWritableStores({ ...generateIds(menuIdParts), ...withDefaults.ids });
    safeOnMount(() => {
      const subTrigger2 = document.getElementById(subIds.trigger.get());
      if (subTrigger2) {
        subActiveTrigger.set(subTrigger2);
      }
    });
    const subIsVisible = derivedVisible({
      open: subOpen,
      forceVisible,
      activeTrigger: subActiveTrigger
    });
    const subMenu = makeElement(name("submenu"), {
      stores: [subIsVisible, subIds.menu, subIds.trigger],
      returned: ([$subIsVisible, $subMenuId, $subTriggerId]) => {
        return {
          role: "menu",
          hidden: $subIsVisible ? void 0 : true,
          style: styleToString({
            display: $subIsVisible ? void 0 : "none"
          }),
          id: $subMenuId,
          "aria-labelledby": $subTriggerId,
          "data-state": $subIsVisible ? "open" : "closed",
          // unit tests fail on `.closest` if the id starts with a number
          // so using a data attribute
          "data-id": $subMenuId,
          tabindex: -1
        };
      },
      action: (node) => {
        let unsubPopper = noop4;
        const unsubDerived = effect([subIsVisible, positioning2], ([$subIsVisible, $positioning]) => {
          unsubPopper();
          if (!$subIsVisible)
            return;
          const activeTrigger = subActiveTrigger.get();
          if (!activeTrigger)
            return;
          tick().then(() => {
            const parentMenuEl = getParentMenu(activeTrigger);
            const popper = usePopper(node, {
              anchorElement: activeTrigger,
              open: subOpen,
              options: {
                floating: $positioning,
                portal: isHTMLElement2(parentMenuEl) ? parentMenuEl : void 0,
                modal: null,
                focusTrap: null,
                escapeKeydown: null
              }
            });
            if (popper && popper.destroy) {
              unsubPopper = popper.destroy;
            }
          });
        });
        const unsubEvents = executeCallbacks(addMeltEventListener(node, "keydown", (e) => {
          if (e.key === kbd.ESCAPE) {
            return;
          }
          const target = e.target;
          const menuEl = e.currentTarget;
          if (!isHTMLElement2(target) || !isHTMLElement2(menuEl))
            return;
          const isKeyDownInside = target.closest('[role="menu"]') === menuEl;
          if (!isKeyDownInside)
            return;
          if (FIRST_LAST_KEYS.includes(e.key)) {
            e.stopImmediatePropagation();
            handleMenuNavigation(e, loop.get() ?? false);
            return;
          }
          const isCloseKey = SUB_CLOSE_KEYS["ltr"].includes(e.key);
          const isModifierKey = e.ctrlKey || e.altKey || e.metaKey;
          const isCharacterKey = e.key.length === 1;
          if (isCloseKey) {
            const $subActiveTrigger = subActiveTrigger.get();
            e.preventDefault();
            subOpen.update(() => {
              if ($subActiveTrigger) {
                handleRovingFocus($subActiveTrigger);
              }
              return false;
            });
            return;
          }
          if (e.key === kbd.TAB) {
            e.preventDefault();
            rootOpen.set(false);
            handleTabNavigation(e, nextFocusable, prevFocusable);
            return;
          }
          if (!isModifierKey && isCharacterKey && typeahead.get() === true) {
            handleTypeaheadSearch(e.key, getMenuItems(menuEl));
          }
        }), addMeltEventListener(node, "pointermove", (e) => {
          onMenuPointerMove(e);
        }), addMeltEventListener(node, "focusout", (e) => {
          const $subActiveTrigger = subActiveTrigger.get();
          if (isUsingKeyboard.get()) {
            const target = e.target;
            const submenuEl = document.getElementById(subIds.menu.get());
            if (!isHTMLElement2(submenuEl) || !isHTMLElement2(target))
              return;
            if (!submenuEl.contains(target) && target !== $subActiveTrigger) {
              subOpen.set(false);
            }
          } else {
            const menuEl = e.currentTarget;
            const relatedTarget = e.relatedTarget;
            if (!isHTMLElement2(relatedTarget) || !isHTMLElement2(menuEl))
              return;
            if (!menuEl.contains(relatedTarget) && relatedTarget !== $subActiveTrigger) {
              subOpen.set(false);
            }
          }
        }));
        return {
          destroy() {
            unsubDerived();
            unsubPopper();
            unsubEvents();
          }
        };
      }
    });
    const subTrigger = makeElement(name("subtrigger"), {
      stores: [subOpen, disabled, subIds.menu, subIds.trigger],
      returned: ([$subOpen, $disabled, $subMenuId, $subTriggerId]) => {
        return {
          role: "menuitem",
          id: $subTriggerId,
          tabindex: -1,
          "aria-controls": $subMenuId,
          "aria-expanded": $subOpen,
          "data-state": $subOpen ? "open" : "closed",
          "data-disabled": disabledAttr($disabled),
          "aria-haspopop": "menu"
        };
      },
      action: (node) => {
        setMeltMenuAttribute(node, selector);
        applyAttrsIfDisabled(node);
        subActiveTrigger.update((p2) => {
          if (p2)
            return p2;
          return node;
        });
        const unsubTimer = () => {
          clearTimerStore(subOpenTimer);
          window.clearTimeout(pointerGraceTimer.get());
          pointerGraceIntent.set(null);
        };
        const unsubEvents = executeCallbacks(addMeltEventListener(node, "click", (e) => {
          if (e.defaultPrevented)
            return;
          const triggerEl = e.currentTarget;
          if (!isHTMLElement2(triggerEl) || isElementDisabled(triggerEl))
            return;
          handleRovingFocus(triggerEl);
          if (!subOpen.get()) {
            subOpen.update((prev) => {
              const isAlreadyOpen = prev;
              if (!isAlreadyOpen) {
                subActiveTrigger.set(triggerEl);
                return !prev;
              }
              return prev;
            });
          }
        }), addMeltEventListener(node, "keydown", (e) => {
          const $typed = typed.get();
          const triggerEl = e.currentTarget;
          if (!isHTMLElement2(triggerEl) || isElementDisabled(triggerEl))
            return;
          const isTypingAhead = $typed.length > 0;
          if (isTypingAhead && e.key === kbd.SPACE)
            return;
          if (SUB_OPEN_KEYS["ltr"].includes(e.key)) {
            if (!subOpen.get()) {
              triggerEl.click();
              e.preventDefault();
              return;
            }
            const menuId = triggerEl.getAttribute("aria-controls");
            if (!menuId)
              return;
            const menuEl = document.getElementById(menuId);
            if (!isHTMLElement2(menuEl))
              return;
            const firstItem = getMenuItems(menuEl)[0];
            handleRovingFocus(firstItem);
          }
        }), addMeltEventListener(node, "pointermove", (e) => {
          if (!isMouse(e))
            return;
          onItemEnter(e);
          if (e.defaultPrevented)
            return;
          const triggerEl = e.currentTarget;
          if (!isHTMLElement2(triggerEl))
            return;
          if (!isFocusWithinSubmenu(subIds.menu.get())) {
            handleRovingFocus(triggerEl);
          }
          const openTimer = subOpenTimer.get();
          if (!subOpen.get() && !openTimer && !isElementDisabled(triggerEl)) {
            subOpenTimer.set(window.setTimeout(() => {
              subOpen.update(() => {
                subActiveTrigger.set(triggerEl);
                return true;
              });
              clearTimerStore(subOpenTimer);
            }, 100));
          }
        }), addMeltEventListener(node, "pointerleave", (e) => {
          if (!isMouse(e))
            return;
          clearTimerStore(subOpenTimer);
          const submenuEl = document.getElementById(subIds.menu.get());
          const contentRect = submenuEl?.getBoundingClientRect();
          if (contentRect) {
            const side = submenuEl?.dataset.side;
            const rightSide = side === "right";
            const bleed = rightSide ? -5 : 5;
            const contentNearEdge = contentRect[rightSide ? "left" : "right"];
            const contentFarEdge = contentRect[rightSide ? "right" : "left"];
            pointerGraceIntent.set({
              area: [
                // Apply a bleed on clientX to ensure that our exit point is
                // consistently within polygon bounds
                { x: e.clientX + bleed, y: e.clientY },
                { x: contentNearEdge, y: contentRect.top },
                { x: contentFarEdge, y: contentRect.top },
                { x: contentFarEdge, y: contentRect.bottom },
                { x: contentNearEdge, y: contentRect.bottom }
              ],
              side
            });
            window.clearTimeout(pointerGraceTimer.get());
            pointerGraceTimer.set(window.setTimeout(() => {
              pointerGraceIntent.set(null);
            }, 300));
          } else {
            onTriggerLeave(e);
            if (e.defaultPrevented)
              return;
            pointerGraceIntent.set(null);
          }
        }), addMeltEventListener(node, "focusout", (e) => {
          const triggerEl = e.currentTarget;
          if (!isHTMLElement2(triggerEl))
            return;
          removeHighlight(triggerEl);
          const relatedTarget = e.relatedTarget;
          if (!isHTMLElement2(relatedTarget))
            return;
          const menuId = triggerEl.getAttribute("aria-controls");
          if (!menuId)
            return;
          const menu = document.getElementById(menuId);
          if (menu && !menu.contains(relatedTarget)) {
            subOpen.set(false);
          }
        }), addMeltEventListener(node, "focusin", (e) => {
          onItemFocusIn(e);
        }));
        return {
          destroy() {
            unsubTimer();
            unsubEvents();
          }
        };
      }
    });
    const subArrow = makeElement(name("subarrow"), {
      stores: arrowSize2,
      returned: ($arrowSize) => ({
        "data-arrow": true,
        style: styleToString({
          position: "absolute",
          width: `var(--arrow-size, ${$arrowSize}px)`,
          height: `var(--arrow-size, ${$arrowSize}px)`
        })
      })
    });
    effect([rootOpen], ([$rootOpen]) => {
      if (!$rootOpen) {
        subActiveTrigger.set(null);
        subOpen.set(false);
      }
    });
    effect([pointerGraceIntent], ([$pointerGraceIntent]) => {
      if (!isBrowser3 || $pointerGraceIntent)
        return;
      window.clearTimeout(pointerGraceTimer.get());
    });
    effect([subOpen], ([$subOpen]) => {
      if (!isBrowser3)
        return;
      if ($subOpen && isUsingKeyboard.get()) {
        sleep2(1).then(() => {
          const menuEl = document.getElementById(subIds.menu.get());
          if (!menuEl)
            return;
          const menuItems = getMenuItems(menuEl);
          if (!menuItems.length)
            return;
          handleRovingFocus(menuItems[0]);
        });
      }
      if (!$subOpen) {
        const focusedItem = currentFocusedItem.get();
        const subTriggerEl = document.getElementById(subIds.trigger.get());
        if (focusedItem) {
          sleep2(1).then(() => {
            const menuEl = document.getElementById(subIds.menu.get());
            if (!menuEl)
              return;
            if (menuEl.contains(focusedItem)) {
              removeHighlight(focusedItem);
            }
          });
        }
        if (!subTriggerEl || document.activeElement === subTriggerEl)
          return;
        removeHighlight(subTriggerEl);
      }
    });
    return {
      ids: subIds,
      elements: {
        subTrigger,
        subMenu,
        subArrow
      },
      states: {
        subOpen
      },
      options: options2
    };
  };
  safeOnMount(() => {
    const triggerEl = document.getElementById(rootIds.trigger.get());
    if (isHTMLElement2(triggerEl) && rootOpen.get()) {
      rootActiveTrigger.set(triggerEl);
    }
    const unsubs = [];
    const handlePointer = () => isUsingKeyboard.set(false);
    const handleKeyDown = () => {
      isUsingKeyboard.set(true);
      unsubs.push(executeCallbacks(addEventListener(document, "pointerdown", handlePointer, { capture: true, once: true }), addEventListener(document, "pointermove", handlePointer, { capture: true, once: true })));
    };
    const keydownListener = (e) => {
      if (e.key === kbd.ESCAPE && closeOnEscape.get()) {
        rootOpen.set(false);
        return;
      }
    };
    unsubs.push(addEventListener(document, "keydown", handleKeyDown, { capture: true }));
    unsubs.push(addEventListener(document, "keydown", keydownListener));
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  effect([rootOpen, currentFocusedItem], ([$rootOpen, $currentFocusedItem]) => {
    if (!$rootOpen && $currentFocusedItem) {
      removeHighlight($currentFocusedItem);
    }
  });
  effect([rootOpen], ([$rootOpen]) => {
    if (!isBrowser3)
      return;
    if (!$rootOpen) {
      const $rootActiveTrigger = rootActiveTrigger.get();
      if (!$rootActiveTrigger)
        return;
      const $closeFocus = closeFocus.get();
      if (!$rootOpen && $rootActiveTrigger) {
        handleFocus({ prop: $closeFocus, defaultEl: $rootActiveTrigger });
      }
    }
  });
  effect([rootOpen, preventScroll], ([$rootOpen, $preventScroll]) => {
    if (!isBrowser3)
      return;
    const unsubs = [];
    if (opts.removeScroll && $rootOpen && $preventScroll) {
      unsubs.push(removeScroll());
    }
    sleep2(1).then(() => {
      const menuEl = document.getElementById(rootIds.menu.get());
      if (menuEl && $rootOpen && isUsingKeyboard.get()) {
        if (disableFocusFirstItem.get()) {
          handleRovingFocus(menuEl);
          return;
        }
        const menuItems = getMenuItems(menuEl);
        if (!menuItems.length)
          return;
        handleRovingFocus(menuItems[0]);
      }
    });
    return () => {
      unsubs.forEach((unsub) => unsub());
    };
  });
  effect(rootOpen, ($rootOpen) => {
    if (!isBrowser3)
      return;
    const handlePointer = () => isUsingKeyboard.set(false);
    const handleKeyDown = (e) => {
      isUsingKeyboard.set(true);
      if (e.key === kbd.ESCAPE && $rootOpen && closeOnEscape.get()) {
        rootOpen.set(false);
        return;
      }
    };
    return executeCallbacks(addEventListener(document, "pointerdown", handlePointer, { capture: true, once: true }), addEventListener(document, "pointermove", handlePointer, { capture: true, once: true }), addEventListener(document, "keydown", handleKeyDown, { capture: true }));
  });
  function handleOpen(triggerEl) {
    rootOpen.update((prev) => {
      const isOpen = !prev;
      if (isOpen) {
        nextFocusable.set(getNextFocusable(triggerEl));
        prevFocusable.set(getPreviousFocusable(triggerEl));
        rootActiveTrigger.set(triggerEl);
      }
      return isOpen;
    });
  }
  function onItemFocusIn(e) {
    const itemEl = e.currentTarget;
    if (!isHTMLElement2(itemEl))
      return;
    const $currentFocusedItem = currentFocusedItem.get();
    if ($currentFocusedItem) {
      removeHighlight($currentFocusedItem);
    }
    addHighlight(itemEl);
    currentFocusedItem.set(itemEl);
  }
  function onItemFocusOut(e) {
    const itemEl = e.currentTarget;
    if (!isHTMLElement2(itemEl))
      return;
    removeHighlight(itemEl);
  }
  function onItemEnter(e) {
    if (isPointerMovingToSubmenu(e)) {
      e.preventDefault();
    }
  }
  function onItemLeave(e) {
    if (isPointerMovingToSubmenu(e)) {
      return;
    }
    const target = e.target;
    if (!isHTMLElement2(target))
      return;
    const parentMenuEl = getParentMenu(target);
    if (!parentMenuEl)
      return;
    handleRovingFocus(parentMenuEl);
  }
  function onTriggerLeave(e) {
    if (isPointerMovingToSubmenu(e)) {
      e.preventDefault();
    }
  }
  function onMenuPointerMove(e) {
    if (!isMouse(e))
      return;
    const target = e.target;
    const currentTarget = e.currentTarget;
    if (!isHTMLElement2(currentTarget) || !isHTMLElement2(target))
      return;
    const $lastPointerX = lastPointerX.get();
    const pointerXHasChanged = $lastPointerX !== e.clientX;
    if (currentTarget.contains(target) && pointerXHasChanged) {
      const newDir = e.clientX > $lastPointerX ? "right" : "left";
      pointerDir.set(newDir);
      lastPointerX.set(e.clientX);
    }
  }
  function onMenuItemPointerMove(e, currTarget = null) {
    if (!isMouse(e))
      return;
    onItemEnter(e);
    if (e.defaultPrevented)
      return;
    if (currTarget) {
      handleRovingFocus(currTarget);
      return;
    }
    const currentTarget = e.currentTarget;
    if (!isHTMLElement2(currentTarget))
      return;
    handleRovingFocus(currentTarget);
  }
  function onMenuItemPointerLeave(e) {
    if (!isMouse(e))
      return;
    onItemLeave(e);
  }
  function onItemKeyDown(e) {
    const $typed = typed.get();
    const isTypingAhead = $typed.length > 0;
    if (isTypingAhead && e.key === kbd.SPACE) {
      e.preventDefault();
      return;
    }
    if (SELECTION_KEYS.includes(e.key)) {
      e.preventDefault();
      const itemEl = e.currentTarget;
      if (!isHTMLElement2(itemEl))
        return;
      itemEl.click();
    }
  }
  function isIndeterminate(checked) {
    return checked === "indeterminate";
  }
  function getCheckedState(checked) {
    return isIndeterminate(checked) ? "indeterminate" : checked ? "checked" : "unchecked";
  }
  function isPointerMovingToSubmenu(e) {
    return pointerMovingToSubmenu.get()(e);
  }
  function getParentMenu(element2) {
    const parentMenuEl = element2.closest('[role="menu"]');
    if (!isHTMLElement2(parentMenuEl))
      return null;
    return parentMenuEl;
  }
  return {
    elements: {
      trigger: rootTrigger,
      menu: rootMenu,
      overlay,
      item,
      group,
      groupLabel,
      arrow: rootArrow,
      separator
    },
    builders: {
      createCheckboxItem,
      createSubmenu,
      createMenuRadioGroup
    },
    states: {
      open: rootOpen
    },
    helpers: {
      handleTypeaheadSearch
    },
    ids: rootIds,
    options: opts.rootOptions
  };
}
function handleTabNavigation(e, nextFocusable, prevFocusable) {
  if (e.shiftKey) {
    const $prevFocusable = prevFocusable.get();
    if ($prevFocusable) {
      e.preventDefault();
      sleep2(1).then(() => $prevFocusable.focus());
      prevFocusable.set(null);
    }
  } else {
    const $nextFocusable = nextFocusable.get();
    if ($nextFocusable) {
      e.preventDefault();
      sleep2(1).then(() => $nextFocusable.focus());
      nextFocusable.set(null);
    }
  }
}
function getMenuItems(menuElement) {
  return Array.from(menuElement.querySelectorAll(`[data-melt-menu-id="${menuElement.id}"]`)).filter((item) => isHTMLElement2(item));
}
function applyAttrsIfDisabled(element2) {
  if (!element2 || !isElementDisabled(element2))
    return;
  element2.setAttribute("data-disabled", "");
  element2.setAttribute("aria-disabled", "true");
}
function clearTimerStore(timerStore) {
  if (!isBrowser3)
    return;
  const timer = timerStore.get();
  if (timer) {
    window.clearTimeout(timer);
    timerStore.set(null);
  }
}
function isMouse(e) {
  return e.pointerType === "mouse";
}
function setMeltMenuAttribute(element2, selector) {
  if (!element2)
    return;
  const menuEl = element2.closest(`${selector()}, ${selector("submenu")}`);
  if (!isHTMLElement2(menuEl))
    return;
  element2.setAttribute("data-melt-menu-id", menuEl.id);
}
function handleMenuNavigation(e, loop) {
  e.preventDefault();
  const currentFocusedItem = document.activeElement;
  const currentTarget = e.currentTarget;
  if (!isHTMLElement2(currentFocusedItem) || !isHTMLElement2(currentTarget))
    return;
  const menuItems = getMenuItems(currentTarget);
  if (!menuItems.length)
    return;
  const candidateNodes = menuItems.filter((item) => {
    if (item.hasAttribute("data-disabled") || item.getAttribute("disabled") === "true") {
      return false;
    }
    return true;
  });
  const currentIndex = candidateNodes.indexOf(currentFocusedItem);
  let nextIndex;
  switch (e.key) {
    case kbd.ARROW_DOWN:
      if (loop) {
        nextIndex = currentIndex < candidateNodes.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex < candidateNodes.length - 1 ? currentIndex + 1 : currentIndex;
      }
      break;
    case kbd.ARROW_UP:
      if (loop) {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : candidateNodes.length - 1;
      } else {
        nextIndex = currentIndex < 0 ? candidateNodes.length - 1 : currentIndex > 0 ? currentIndex - 1 : 0;
      }
      break;
    case kbd.HOME:
      nextIndex = 0;
      break;
    case kbd.END:
      nextIndex = candidateNodes.length - 1;
      break;
    default:
      return;
  }
  handleRovingFocus(candidateNodes[nextIndex]);
}
function isPointerInGraceArea(e, area) {
  if (!area)
    return false;
  const cursorPos = { x: e.clientX, y: e.clientY };
  return isPointInPolygon(cursorPos, area);
}
function isPointInPolygon(point, polygon) {
  const { x: x2, y: y2 } = point;
  let inside = false;
  for (let i2 = 0, j2 = polygon.length - 1; i2 < polygon.length; j2 = i2++) {
    const xi = polygon[i2].x;
    const yi = polygon[i2].y;
    const xj = polygon[j2].x;
    const yj = polygon[j2].y;
    const intersect = yi > y2 !== yj > y2 && x2 < (xj - xi) * (y2 - yi) / (yj - yi) + xi;
    if (intersect)
      inside = !inside;
  }
  return inside;
}
function isFocusWithinSubmenu(submenuId) {
  const activeEl = document.activeElement;
  if (!isHTMLElement2(activeEl))
    return false;
  const submenuEl = activeEl.closest(`[data-id="${submenuId}"]`);
  return isHTMLElement2(submenuEl);
}
function stateAttr(open) {
  return open ? "open" : "closed";
}
function createDropdownMenu(props) {
  const withDefaults = { ...defaults$1, ...props };
  const rootOptions = toWritableStores(omit(withDefaults, "ids"));
  const openWritable = withDefaults.open ?? writable(withDefaults.defaultOpen);
  const rootOpen = overridable(openWritable, withDefaults?.onOpenChange);
  const rootActiveTrigger = withGet(writable(null));
  const nextFocusable = withGet(writable(null));
  const prevFocusable = withGet(writable(null));
  const { elements, builders, ids, states, options: options2 } = createMenuBuilder({
    rootOptions,
    rootOpen,
    rootActiveTrigger: withGet(rootActiveTrigger),
    nextFocusable: withGet(nextFocusable),
    prevFocusable: withGet(prevFocusable),
    selector: "dropdown-menu",
    removeScroll: true,
    ids: withDefaults.ids
  });
  return {
    ids,
    elements,
    states,
    builders,
    options: options2
  };
}
function createBitAttrs(bit, parts) {
  const attrs = {};
  parts.forEach((part) => {
    attrs[part] = {
      [`data-${bit}-${part}`]: ""
    };
  });
  return (part) => attrs[part];
}
function disabledAttrs(disabled) {
  return disabled ? { "aria-disabled": "true", "data-disabled": "" } : { "aria-disabled": void 0, "data-disabled": void 0 };
}
function createDispatcher() {
  const dispatch = createEventDispatcher();
  return (e) => {
    const { originalEvent } = e.detail;
    const { cancelable } = e;
    const type = originalEvent.type;
    const shouldContinue = dispatch(type, { originalEvent, currentTarget: originalEvent.currentTarget }, { cancelable });
    if (!shouldContinue) {
      e.preventDefault();
    }
  };
}
function generateId() {
  return nanoid(10);
}
function removeUndefined(obj) {
  const result = {};
  for (const key2 in obj) {
    const value = obj[key2];
    if (value !== void 0) {
      result[key2] = value;
    }
  }
  return result;
}
function getOptionUpdater(options2) {
  return function(key2, value) {
    if (value === void 0)
      return;
    const store = options2[key2];
    if (store) {
      store.set(value);
    }
  };
}
function getAttrs(builders) {
  const attrs = {};
  builders.forEach((builder) => {
    Object.keys(builder).forEach((key2) => {
      if (key2 !== "action") {
        attrs[key2] = builder[key2];
      }
    });
  });
  return attrs;
}
function Button$1($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "href",
    "type",
    "builders",
    "el",
    "$$props"
  ]);
  push(false);
  let href = value_or_fallback($$props["href"], void 0);
  let type = value_or_fallback($$props["type"], void 0);
  let builders = value_or_fallback($$props["builders"], []);
  let el = value_or_fallback($$props["el"], void 0);
  const attrs = { "data-button-root": "" };
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (builders && builders.length) {
    $$payload.out += "<!--ssr:if:true-->";
    const $$tag = href ? "a" : "button";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    if ($$tag)
      element(
        $$payload,
        $$tag,
        () => {
          $$payload.out += `${spread_attributes(
            [
              { "type": href ? void 0 : type },
              { "href": href },
              { "tabindex": "0" },
              getAttrs(builders),
              $$restProps,
              attrs
            ],
            true,
            false,
            ""
          )}`;
        },
        () => {
          const anchor_2 = create_anchor($$payload);
          $$payload.out += `${anchor_2}`;
          slot($$payload, $$props.children, {}, null);
          $$payload.out += `${anchor_2}`;
        }
      );
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const $$tag_1 = href ? "a" : "button";
    const anchor_3 = create_anchor($$payload);
    $$payload.out += `${anchor_3}`;
    if ($$tag_1)
      element(
        $$payload,
        $$tag_1,
        () => {
          $$payload.out += `${spread_attributes(
            [
              { "type": href ? void 0 : type },
              { "href": href },
              { "tabindex": "0" },
              $$restProps,
              attrs
            ],
            true,
            false,
            ""
          )}`;
        },
        () => {
          const anchor_4 = create_anchor($$payload);
          $$payload.out += `${anchor_4}`;
          slot($$payload, $$props.children, {}, null);
          $$payload.out += `${anchor_4}`;
        }
      );
    $$payload.out += `${anchor_3}`;
  }
  $$payload.out += `${anchor}`;
  bind_props($$props, { href, type, builders, el });
  pop();
}
function getPositioningUpdater(store) {
  return (props = {}) => {
    return updatePositioning$1(store, props);
  };
}
function updatePositioning$1(store, props) {
  const defaultPositioningProps = {
    side: "bottom",
    align: "center",
    sideOffset: 0,
    alignOffset: 0,
    sameWidth: false,
    avoidCollisions: true,
    collisionPadding: 8,
    fitViewport: false,
    strategy: "absolute",
    overlap: false
  };
  const withDefaults = { ...defaultPositioningProps, ...props };
  store.update((prev) => {
    return {
      ...prev,
      placement: joinPlacement(withDefaults.side, withDefaults.align),
      offset: {
        ...prev.offset,
        mainAxis: withDefaults.sideOffset,
        crossAxis: withDefaults.alignOffset
      },
      gutter: 0,
      sameWidth: withDefaults.sameWidth,
      flip: withDefaults.avoidCollisions,
      overflowPadding: withDefaults.collisionPadding,
      boundary: withDefaults.collisionBoundary,
      fitViewport: withDefaults.fitViewport,
      strategy: withDefaults.strategy,
      overlap: withDefaults.overlap
    };
  });
}
function joinPlacement(side, align) {
  if (align === "center")
    return side;
  return `${side}-${align}`;
}
function getMenuData() {
  const NAME = "menu";
  const SUB_NAME = "menu-submenu";
  const RADIO_GROUP_NAME = "menu-radiogroup";
  const CHECKBOX_ITEM_NAME = "menu-checkboxitem";
  const RADIO_ITEM_NAME = "menu-radioitem";
  const GROUP_NAME = "menu-group";
  const PARTS = [
    "arrow",
    "checkbox-indicator",
    "checkbox-item",
    "content",
    "group",
    "item",
    "label",
    "radio-group",
    "radio-item",
    "radio-indicator",
    "separator",
    "sub-content",
    "sub-trigger",
    "trigger"
  ];
  return {
    NAME,
    SUB_NAME,
    RADIO_GROUP_NAME,
    CHECKBOX_ITEM_NAME,
    RADIO_ITEM_NAME,
    GROUP_NAME,
    PARTS
  };
}
function getCtx() {
  const { NAME } = getMenuData();
  return getContext(NAME);
}
function setCtx(props) {
  const { NAME, PARTS } = getMenuData();
  const getAttrs2 = createBitAttrs("menu", PARTS);
  const dropdownMenu = {
    ...createDropdownMenu({ ...removeUndefined(props), forceVisible: true }),
    getAttrs: getAttrs2
  };
  setContext(NAME, dropdownMenu);
  return {
    ...dropdownMenu,
    updateOption: getOptionUpdater(dropdownMenu.options)
  };
}
function getGroupLabel() {
  const { GROUP_NAME } = getMenuData();
  const id = getContext(GROUP_NAME) ?? generateId();
  const { elements: { groupLabel }, getAttrs: getAttrs2 } = getCtx();
  return { groupLabel, id, getAttrs: getAttrs2 };
}
function updatePositioning(props) {
  const defaultPlacement = {
    side: "bottom",
    align: "center"
  };
  const withDefaults = { ...defaultPlacement, ...props };
  const { options: { positioning } } = getCtx();
  const updater = getPositioningUpdater(positioning);
  updater(withDefaults);
}
function Menu_item($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "href",
    "asChild",
    "disabled",
    "el",
    "$$props"
  ]);
  push(false);
  var $$store_subs;
  let builder, attrs;
  let href = value_or_fallback($$props["href"], void 0);
  let asChild = value_or_fallback($$props["asChild"], false);
  let disabled = value_or_fallback($$props["disabled"], false);
  let el = value_or_fallback($$props["el"], void 0);
  const { elements: { item }, getAttrs: getAttrs2 } = getCtx();
  createDispatcher();
  builder = store_get($$store_subs ?? ($$store_subs = {}), "$item", item);
  attrs = {
    ...getAttrs2("item"),
    ...disabledAttrs(disabled)
  };
  Object.assign(builder, attrs);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (asChild) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        }
      },
      null
    );
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const $$tag = href ? "a" : "div";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `${anchor_2}`;
    if ($$tag)
      element(
        $$payload,
        $$tag,
        () => {
          $$payload.out += `${spread_attributes([{ "href": href }, builder, $$restProps], true, false, "")}`;
        },
        () => {
          const anchor_3 = create_anchor($$payload);
          $$payload.out += `${anchor_3}`;
          slot(
            $$payload,
            $$props.children,
            {
              get builder() {
                return builder;
              }
            },
            null
          );
          $$payload.out += `${anchor_3}`;
        }
      );
    $$payload.out += `${anchor_2}`;
  }
  $$payload.out += `${anchor}`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { href, asChild, disabled, el });
  pop();
}
function Menu_label($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push(false);
  var $$store_subs;
  let builder;
  let asChild = value_or_fallback($$props["asChild"], false);
  let el = value_or_fallback($$props["el"], void 0);
  const { groupLabel, id, getAttrs: getAttrs2 } = getGroupLabel();
  const attrs = getAttrs2("label");
  builder = store_get($$store_subs ?? ($$store_subs = {}), "$groupLabel", groupLabel)(id);
  Object.assign(builder, attrs);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (asChild) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        }
      },
      null
    );
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `<div${spread_attributes([builder, $$restProps], true, false, "")}>${anchor_2}`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        }
      },
      null
    );
    $$payload.out += `${anchor_2}</div>`;
  }
  $$payload.out += `${anchor}`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, el });
  pop();
}
function Menu_separator($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "el", "$$props"]);
  push(false);
  var $$store_subs;
  let builder;
  let asChild = value_or_fallback($$props["asChild"], false);
  let el = value_or_fallback($$props["el"], void 0);
  const { elements: { separator }, getAttrs: getAttrs2 } = getCtx();
  const attrs = getAttrs2("separator");
  builder = store_get($$store_subs ?? ($$store_subs = {}), "$separator", separator);
  Object.assign(builder, attrs);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (asChild) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        }
      },
      null
    );
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    $$payload.out += `<div${spread_attributes(
      [
        store_get($$store_subs ?? ($$store_subs = {}), "$separator", separator),
        $$restProps
      ],
      true,
      false,
      ""
    )}></div>`;
  }
  $$payload.out += `${anchor}`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, el });
  pop();
}
function Menu($$payload, $$props) {
  push(false);
  var $$store_subs;
  let closeOnOutsideClick = value_or_fallback($$props["closeOnOutsideClick"], void 0);
  let closeOnEscape = value_or_fallback($$props["closeOnEscape"], void 0);
  let portal = value_or_fallback($$props["portal"], void 0);
  let open = value_or_fallback($$props["open"], void 0);
  let onOpenChange = value_or_fallback($$props["onOpenChange"], void 0);
  let preventScroll = value_or_fallback($$props["preventScroll"], void 0);
  let loop = value_or_fallback($$props["loop"], void 0);
  let dir = value_or_fallback($$props["dir"], void 0);
  let typeahead = value_or_fallback($$props["typeahead"], void 0);
  let closeFocus = value_or_fallback($$props["closeFocus"], void 0);
  let disableFocusFirstItem = value_or_fallback($$props["disableFocusFirstItem"], void 0);
  let closeOnItemClick = value_or_fallback($$props["closeOnItemClick"], void 0);
  let onOutsideClick = value_or_fallback($$props["onOutsideClick"], void 0);
  const {
    states: { open: localOpen },
    updateOption,
    ids
  } = setCtx({
    closeOnOutsideClick,
    closeOnEscape,
    portal,
    forceVisible: true,
    defaultOpen: open,
    preventScroll,
    loop,
    dir,
    typeahead,
    closeFocus,
    disableFocusFirstItem,
    closeOnItemClick,
    onOutsideClick,
    onOpenChange: ({ next }) => {
      if (open !== next) {
        onOpenChange?.(next);
        open = next;
      }
      return next;
    }
  });
  const idValues = derived([ids.menu, ids.trigger], ([$menuId, $triggerId]) => ({ menu: $menuId, trigger: $triggerId }));
  open !== void 0 && localOpen.set(open);
  updateOption("closeOnOutsideClick", closeOnOutsideClick);
  updateOption("closeOnEscape", closeOnEscape);
  updateOption("portal", portal);
  updateOption("preventScroll", preventScroll);
  updateOption("loop", loop);
  updateOption("dir", dir);
  updateOption("closeFocus", closeFocus);
  updateOption("disableFocusFirstItem", disableFocusFirstItem);
  updateOption("typeahead", typeahead);
  updateOption("closeOnItemClick", closeOnItemClick);
  updateOption("onOutsideClick", onOutsideClick);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  slot(
    $$payload,
    $$props.children,
    {
      get ids() {
        return store_get($$store_subs ?? ($$store_subs = {}), "$idValues", idValues);
      }
    },
    null
  );
  $$payload.out += `${anchor}`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, {
    closeOnOutsideClick,
    closeOnEscape,
    portal,
    open,
    onOpenChange,
    preventScroll,
    loop,
    dir,
    typeahead,
    closeFocus,
    disableFocusFirstItem,
    closeOnItemClick,
    onOutsideClick
  });
  pop();
}
function Menu_content($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "transition",
    "transitionConfig",
    "inTransition",
    "inTransitionConfig",
    "outTransition",
    "outTransitionConfig",
    "asChild",
    "id",
    "side",
    "align",
    "sideOffset",
    "alignOffset",
    "collisionPadding",
    "avoidCollisions",
    "collisionBoundary",
    "sameWidth",
    "fitViewport",
    "strategy",
    "overlap",
    "el",
    "$$props"
  ]);
  push(false);
  var $$store_subs;
  let builder;
  let transition = value_or_fallback($$props["transition"], void 0);
  let transitionConfig = value_or_fallback($$props["transitionConfig"], void 0);
  let inTransition = value_or_fallback($$props["inTransition"], void 0);
  let inTransitionConfig = value_or_fallback($$props["inTransitionConfig"], void 0);
  let outTransition = value_or_fallback($$props["outTransition"], void 0);
  let outTransitionConfig = value_or_fallback($$props["outTransitionConfig"], void 0);
  let asChild = value_or_fallback($$props["asChild"], false);
  let id = value_or_fallback($$props["id"], void 0);
  let side = value_or_fallback($$props["side"], "bottom");
  let align = value_or_fallback($$props["align"], "center");
  let sideOffset = value_or_fallback($$props["sideOffset"], 0);
  let alignOffset = value_or_fallback($$props["alignOffset"], 0);
  let collisionPadding = value_or_fallback($$props["collisionPadding"], 8);
  let avoidCollisions = value_or_fallback($$props["avoidCollisions"], true);
  let collisionBoundary = value_or_fallback($$props["collisionBoundary"], void 0);
  let sameWidth = value_or_fallback($$props["sameWidth"], false);
  let fitViewport = value_or_fallback($$props["fitViewport"], false);
  let strategy = value_or_fallback($$props["strategy"], "absolute");
  let overlap = value_or_fallback($$props["overlap"], false);
  let el = value_or_fallback($$props["el"], void 0);
  const {
    elements: { menu },
    states: { open },
    ids,
    getAttrs: getAttrs2
  } = getCtx();
  createDispatcher();
  const attrs = getAttrs2("content");
  if (id) {
    ids.menu.set(id);
  }
  builder = store_get($$store_subs ?? ($$store_subs = {}), "$menu", menu);
  Object.assign(builder, attrs);
  if (store_get($$store_subs ?? ($$store_subs = {}), "$open", open)) {
    updatePositioning({
      side,
      align,
      sideOffset,
      alignOffset,
      collisionPadding,
      avoidCollisions,
      collisionBoundary,
      sameWidth,
      fitViewport,
      strategy,
      overlap
    });
  }
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (asChild && store_get($$store_subs ?? ($$store_subs = {}), "$open", open)) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        }
      },
      null
    );
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `${anchor_2}`;
    if (transition && store_get($$store_subs ?? ($$store_subs = {}), "$open", open)) {
      $$payload.out += "<!--ssr:if:true-->";
      const anchor_3 = create_anchor($$payload);
      $$payload.out += `<div${spread_attributes([builder, $$restProps], true, false, "")}>${anchor_3}`;
      slot(
        $$payload,
        $$props.children,
        {
          get builder() {
            return builder;
          }
        },
        null
      );
      $$payload.out += `${anchor_3}</div>`;
    } else {
      $$payload.out += "<!--ssr:if:false-->";
      const anchor_4 = create_anchor($$payload);
      $$payload.out += `${anchor_4}`;
      if (inTransition && outTransition && store_get($$store_subs ?? ($$store_subs = {}), "$open", open)) {
        $$payload.out += "<!--ssr:if:true-->";
        const anchor_5 = create_anchor($$payload);
        $$payload.out += `<div${spread_attributes([builder, $$restProps], true, false, "")}>${anchor_5}`;
        slot(
          $$payload,
          $$props.children,
          {
            get builder() {
              return builder;
            }
          },
          null
        );
        $$payload.out += `${anchor_5}</div>`;
      } else {
        $$payload.out += "<!--ssr:if:false-->";
        const anchor_6 = create_anchor($$payload);
        $$payload.out += `${anchor_6}`;
        if (inTransition && store_get($$store_subs ?? ($$store_subs = {}), "$open", open)) {
          $$payload.out += "<!--ssr:if:true-->";
          const anchor_7 = create_anchor($$payload);
          $$payload.out += `<div${spread_attributes([builder, $$restProps], true, false, "")}>${anchor_7}`;
          slot(
            $$payload,
            $$props.children,
            {
              get builder() {
                return builder;
              }
            },
            null
          );
          $$payload.out += `${anchor_7}</div>`;
        } else {
          $$payload.out += "<!--ssr:if:false-->";
          const anchor_8 = create_anchor($$payload);
          $$payload.out += `${anchor_8}`;
          if (outTransition && store_get($$store_subs ?? ($$store_subs = {}), "$open", open)) {
            $$payload.out += "<!--ssr:if:true-->";
            const anchor_9 = create_anchor($$payload);
            $$payload.out += `<div${spread_attributes([builder, $$restProps], true, false, "")}>${anchor_9}`;
            slot(
              $$payload,
              $$props.children,
              {
                get builder() {
                  return builder;
                }
              },
              null
            );
            $$payload.out += `${anchor_9}</div>`;
          } else {
            $$payload.out += "<!--ssr:if:false-->";
            const anchor_10 = create_anchor($$payload);
            $$payload.out += `${anchor_10}`;
            if (store_get($$store_subs ?? ($$store_subs = {}), "$open", open)) {
              $$payload.out += "<!--ssr:if:true-->";
              const anchor_11 = create_anchor($$payload);
              $$payload.out += `<div${spread_attributes([builder, $$restProps], true, false, "")}>${anchor_11}`;
              slot(
                $$payload,
                $$props.children,
                {
                  get builder() {
                    return builder;
                  }
                },
                null
              );
              $$payload.out += `${anchor_11}</div>`;
            } else {
              $$payload.out += "<!--ssr:if:false-->";
            }
            $$payload.out += `${anchor_10}`;
          }
          $$payload.out += `${anchor_8}`;
        }
        $$payload.out += `${anchor_6}`;
      }
      $$payload.out += `${anchor_4}`;
    }
    $$payload.out += `${anchor_2}`;
  }
  $$payload.out += `${anchor}`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, {
    transition,
    transitionConfig,
    inTransition,
    inTransitionConfig,
    outTransition,
    outTransitionConfig,
    asChild,
    id,
    side,
    align,
    sideOffset,
    alignOffset,
    collisionPadding,
    avoidCollisions,
    collisionBoundary,
    sameWidth,
    fitViewport,
    strategy,
    overlap,
    el
  });
  pop();
}
function Menu_trigger($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["asChild", "id", "el", "$$props"]);
  push(false);
  var $$store_subs;
  let builder;
  let asChild = value_or_fallback($$props["asChild"], false);
  let id = value_or_fallback($$props["id"], void 0);
  let el = value_or_fallback($$props["el"], void 0);
  const { elements: { trigger }, ids, getAttrs: getAttrs2 } = getCtx();
  createDispatcher();
  const attrs = getAttrs2("trigger");
  if (id) {
    ids.trigger.set(id);
  }
  builder = store_get($$store_subs ?? ($$store_subs = {}), "$trigger", trigger);
  Object.assign(builder, attrs);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (asChild) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        }
      },
      null
    );
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `<button${spread_attributes([builder, { "type": "button" }, $$restProps], true, false, "")}>${anchor_2}`;
    slot(
      $$payload,
      $$props.children,
      {
        get builder() {
          return builder;
        }
      },
      null
    );
    $$payload.out += `${anchor_2}</button>`;
  }
  $$payload.out += `${anchor}`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { asChild, id, el });
  pop();
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
function Button($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "class",
    "variant",
    "size",
    "builders",
    "$$props"
  ]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  let variant = value_or_fallback($$props["variant"], "default");
  let size22 = value_or_fallback($$props["size"], "default");
  let builders = value_or_fallback($$props["builders"], []);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Button$1($$payload, spread_props([
    {
      builders,
      class: cn(buttonVariants({ variant, size: size22, className })),
      type: "button"
    },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        const anchor_1 = create_anchor($$payload2);
        $$payload2.out += `${anchor_1}`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `${anchor_1}`;
      }
    }
  ]));
  $$payload.out += `${anchor}`;
  bind_props($$props, { class: className, variant, size: size22, builders });
  pop();
}
function Dropdown_menu_item($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "inset", "$$props"]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  let inset = value_or_fallback($$props["inset"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Menu_item($$payload, spread_props([
    {
      class: cn("relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50", inset && "pl-8", className)
    },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        const anchor_1 = create_anchor($$payload2);
        $$payload2.out += `${anchor_1}`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `${anchor_1}`;
      }
    }
  ]));
  $$payload.out += `${anchor}`;
  bind_props($$props, { class: className, inset });
  pop();
}
function Dropdown_menu_label($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "inset", "$$props"]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  let inset = value_or_fallback($$props["inset"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Menu_label($$payload, spread_props([
    {
      class: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className)
    },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        const anchor_1 = create_anchor($$payload2);
        $$payload2.out += `${anchor_1}`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `${anchor_1}`;
      }
    }
  ]));
  $$payload.out += `${anchor}`;
  bind_props($$props, { class: className, inset });
  pop();
}
function Dropdown_menu_content($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, [
    "class",
    "sideOffset",
    "transition",
    "transitionConfig",
    "$$props"
  ]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  let sideOffset = value_or_fallback($$props["sideOffset"], 4);
  let transition = value_or_fallback($$props["transition"], flyAndScale);
  let transitionConfig = value_or_fallback($$props["transitionConfig"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Menu_content($$payload, spread_props([
    {
      transition,
      transitionConfig,
      sideOffset,
      class: cn("z-50 min-w-[8rem] rounded-md border bg-popover p-1 text-popover-foreground shadow-md focus:outline-none", className)
    },
    $$restProps,
    {
      children: ($$payload2, $$slotProps) => {
        const anchor_1 = create_anchor($$payload2);
        $$payload2.out += `${anchor_1}`;
        slot($$payload2, $$props.children, {}, null);
        $$payload2.out += `${anchor_1}`;
      }
    }
  ]));
  $$payload.out += `${anchor}`;
  bind_props($$props, {
    class: className,
    sideOffset,
    transition,
    transitionConfig
  });
  pop();
}
function Dropdown_menu_shortcut($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `<span${spread_attributes(
    [
      {
        "class": cn("ml-auto text-xs tracking-widest opacity-60", className)
      },
      $$restProps
    ],
    true,
    false,
    ""
  )}>${anchor}`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `${anchor}</span>`;
  bind_props($$props, { class: className });
  pop();
}
function Dropdown_menu_separator($$payload, $$props) {
  const $$sanitized_props = sanitize_props($$props);
  const $$restProps = rest_props($$sanitized_props, ["class", "$$props"]);
  push(false);
  let className = value_or_fallback($$props["class"], void 0);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Menu_separator($$payload, spread_props([
    {
      class: cn("-mx-1 my-1 h-px bg-muted", className)
    },
    $$restProps
  ]));
  $$payload.out += `${anchor}`;
  bind_props($$props, { class: className });
  pop();
}
function DropDownIcon($$payload, $$props) {
  push(false);
  const anchor = create_anchor($$payload);
  $$payload.out += `<span class="block relative">${anchor}`;
  Root2($$payload, {
    children: ($$payload2, $$slotProps) => {
      const anchor_1 = create_anchor($$payload2);
      const anchor_3 = create_anchor($$payload2);
      $$payload2.out += `${anchor_1}`;
      Trigger($$payload2, {
        asChild: true,
        children: ($$payload3, $$slotProps2) => {
          const builder = $$slotProps2.builder;
          const anchor_2 = create_anchor($$payload3);
          $$payload3.out += `${anchor_2}`;
          Button($$payload3, {
            builders: [builder],
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `<img src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" class="w-10 h-10 rounded-full" alt="Rounded avatar">`;
            }
          });
          $$payload3.out += `${anchor_2}`;
        }
      });
      $$payload2.out += `${anchor_1} ${anchor_3}`;
      Dropdown_menu_content($$payload2, {
        class: "w-56",
        children: ($$payload3, $$slotProps2) => {
          const anchor_4 = create_anchor($$payload3);
          const anchor_5 = create_anchor($$payload3);
          const anchor_6 = create_anchor($$payload3);
          $$payload3.out += `${anchor_4}`;
          Dropdown_menu_label($$payload3, {
            children: ($$payload4, $$slotProps3) => {
              $$payload4.out += `LEILA BERDZENISHVILI`;
            }
          });
          $$payload3.out += `${anchor_4} ${anchor_5}`;
          Dropdown_menu_separator($$payload3, {});
          $$payload3.out += `${anchor_5} ${anchor_6}`;
          Dropdown_menu_item($$payload3, {
            children: ($$payload4, $$slotProps3) => {
              const anchor_7 = create_anchor($$payload4);
              $$payload4.out += `<form action="/admin/logout" method="POST"><button type="submit">Log out</button></form> ${anchor_7}`;
              Dropdown_menu_shortcut($$payload4, {
                children: ($$payload5, $$slotProps4) => {
                  $$payload5.out += `\u21E7\u2318Q`;
                }
              });
              $$payload4.out += `${anchor_7}`;
            }
          });
          $$payload3.out += `${anchor_6}`;
        }
      });
      $$payload2.out += `${anchor_3}`;
    }
  });
  $$payload.out += `${anchor}</span>`;
  pop();
}
function TopBar($$payload, $$props) {
  push(false);
  const anchor = create_anchor($$payload);
  $$payload.out += `<header class="h-20 items-center relative z-10"><div class="flex flex-center flex-col h-full justify-center mx-auto relative px-3 text-white z-10"><div class="flex items-center pl-1 relative w-full sm:ml-0 sm:pr-2 lg:max-w-68"><div class="flex group h-full items-center relative w-12"><button type="button" aria-expanded="false" aria-label="Toggle sidenav" class="text-4xl text-white focus:outline-none">\u2261</button></div> <div class="container flex left-0 relative w-3/4"><div class="group hidden items-center ml-8 relative w-full md:flex lg:w-72"><div class="absolute cursor-pointer flex items-center justify-center h-10 p-3 pr-2 text-gray-500 text-sm uppercase w-auto sm:hidden"><svg fill="none" class="h-5 relative w-5" stroke-linecap="round" stroke-linejoin="round"${attr("stroke-width", 2, false)} stroke="currentColor" viewBox="0 0 24 24"><path d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></div> <svg class="absolute fill-current h-4 hidden left-0 ml-4 pointer-events-none text-gray-500 w-4 group-hover:text-gray-400 sm:block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path></svg> <input type="text" class="bg-gray-800 block leading-normal pl-10 py-1.5 pr-4 ring-opacity-90 rounded-2xl text-gray-400 w-full focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Search"></div></div> <div class="flex items-center justify-end ml-5 p-1 relative w-full sm:mr-0 sm:right-auto"><span class="block pr-5"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round"${attr("stroke-width", 2, false)} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg></span> <span class="block pr-5"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round"${attr("stroke-width", 2, false)} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg></span> <span class="block pr-5 relative"><svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round"${attr("stroke-width", 2, false)} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg></span> <span class="block relative">${anchor}`;
  DropDownIcon($$payload);
  $$payload.out += `${anchor}</span></div></div></div></header>`;
  pop();
}
function Overlay($$payload, $$props) {
  push(false);
  var $$store_subs;
  $$payload.out += `<button${attr("class", store_get($$store_subs ?? ($$store_subs = {}), "$sidebarOpen", sidebarOpen) ? "bg-black fixed h-screen left-0 opacity-40 top-0 w-screen z-30 lg:bg-transparent" : "", false)}></button>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
function HomeIcon($$payload, $$props) {
  push(false);
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>`;
  pop();
}
function StatusIcon($$payload, $$props) {
  push(false);
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>`;
  pop();
}
function CreditsIcon($$payload, $$props) {
  push(false);
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>`;
  pop();
}
function ArchivesIcon($$payload, $$props) {
  push(false);
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>`;
  pop();
}
function SettingsIcon($$payload, $$props) {
  push(false);
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>`;
  pop();
}
function DocumentationIcon($$payload, $$props) {
  push(false);
  $$payload.out += `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>`;
  pop();
}
function SidebarItems($$payload, $$props) {
  push(false);
  var $$store_subs;
  const style = {
    title: `mx-4 text-sm whitespace-pre`,
    active: `bg-gray-700 rounded-full`,
    link: `flex items-center justify-start my-1 p-3 w-full hover:text-white whitespace-pre`,
    close: `lg:duration-700 lg:ease-out lg:invisible lg:opacity-0 lg:transition-all`,
    open: `lg:duration-500 lg:ease-in lg:h-auto lg:opacity-100 lg:transition-all lg:w-auto`
  };
  const anchor = create_anchor($$payload);
  const each_array = ensure_array_like(data);
  $$payload.out += `<ul class="md:pl-3"><li>${anchor}`;
  for (let $$index = 0; $$index < each_array.length; $$index++) {
    const item = each_array[$$index];
    const anchor_1 = create_anchor($$payload);
    const anchor_2 = create_anchor($$payload);
    $$payload.out += `${anchor_1}<a${attr("class", style.link, false)}${attr("href", item.link, false)}><div${attr("class", `p-2 ${item.link === store_get($$store_subs ?? ($$store_subs = {}), "$page", page).url.pathname ? style.active : ""}`, false)}><span>${anchor_2}`;
    item.icon?.($$payload, {});
    $$payload.out += `${anchor_2}</span></div> <span${attr("class", `${style.title} ${store_get($$store_subs ?? ($$store_subs = {}), "$sidebarOpen", sidebarOpen) ? style.open : style.close}`, false)}>${escape(item.title)}</span></a>${anchor_1}`;
  }
  $$payload.out += `${anchor}</li></ul>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
function SidebarHeader($$payload, $$props) {
  push(false);
  $$payload.out += `<div class="bg-gray-900 flex items-center justify-center mb-6 pb-6 pt-3 sticky top-0 z-10"><span class="text-white text-wrap text-center text-md">PR WAVE</span></div>`;
  pop();
}
function Sidebar($$payload, $$props) {
  push(false);
  var $$store_subs;
  const style = {
    mobileOrientation: { start: "left-0 ", end: "right-0 lg:left-0" },
    container: `pb-32 lg:pb-12`,
    close: `duration-700 ease-out hidden transition-all lg:w-24`,
    open: `absolute duration-500 ease-in transition-all w-8/12 z-40 sm:w-5/12 md:w-64`,
    default: `h-screen overflow-y-auto text-white top-0 lg:absolute bg-gray-900 lg:block lg:z-40`
  };
  let mobileOrientation = value_or_fallback($$props["mobileOrientation"], "end");
  const anchor = create_anchor($$payload);
  const anchor_1 = create_anchor($$payload);
  $$payload.out += `<aside${attr(
    "class",
    `${stringify(`${style.default} ${style.mobileOrientation}
       ${store_get($$store_subs ?? ($$store_subs = {}), "$sidebarOpen", sidebarOpen) ? style.open : style.close} scrollbar`)} svelte-1lb8cde`,
    false
  )}><div${attr("class", `${stringify(style.container)} svelte-1lb8cde`, false)}>${anchor}`;
  SidebarHeader($$payload);
  $$payload.out += `${anchor} ${anchor_1}`;
  SidebarItems($$payload);
  $$payload.out += `${anchor_1}</div></aside>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  bind_props($$props, { mobileOrientation });
  pop();
}
function Layout2($$payload, $$props) {
  push(false);
  const style = {
    container: `bg-gray-900 h-screen overflow-hidden relative w-full`,
    mainContainer: `flex flex-col h-screen pl-0 lg:w-screen w-full lg:pl-20 lg:space-y-4`,
    main: `h-screen w-full overflow-auto pb-36 pt-4 px-2 md:pb-8 md:pt-4 lg:pt-0 lg:px-4`
  };
  const anchor = create_anchor($$payload);
  const anchor_1 = create_anchor($$payload);
  const anchor_2 = create_anchor($$payload);
  const anchor_3 = create_anchor($$payload);
  $$payload.out += `<div${attr("class", style.container, false)}><div class="flex items-start">${anchor}`;
  Overlay($$payload);
  $$payload.out += `${anchor} ${anchor_1}`;
  Sidebar($$payload, { mobileOrientation: "end" });
  $$payload.out += `${anchor_1} <div${attr("class", style.mainContainer, false)}>${anchor_2}`;
  TopBar($$payload);
  $$payload.out += `${anchor_2} <main${attr("class", style.main, false)}>${anchor_3}`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `${anchor_3}</main></div></div></div>`;
  pop();
}
function _layout2($$payload, $$props) {
  push(false);
  const anchor = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  Layout2($$payload, {
    children: ($$payload2, $$slotProps) => {
      const anchor_1 = create_anchor($$payload2);
      $$payload2.out += `${anchor_1}`;
      slot($$payload2, $$props.children, {}, null);
      $$payload2.out += `${anchor_1}`;
    }
  });
  $$payload.out += `${anchor}`;
  pop();
}
var sidebarOpen, hiddenAction, isFunctionWithParams, isBrowser3, isFunction, safeOnMount, safeOnDestroy, overridable, kbd, FIRST_KEYS, LAST_KEYS, FIRST_LAST_KEYS, SELECTION_KEYS, isDom, pt, isTouchDevice, isMac, isApple, isIos, LOCK_CLASSNAME, ignoredKeys, defaults$3, documentEscapeKeyStore, useEscapeKeydown, defaultConfig$1, ARROW_TRANSFORM, visibleModals, defaultConfig, usePopper, usePortal, SUB_OPEN_KEYS, SUB_CLOSE_KEYS, menuIdParts, defaults$2, defaults$1, defaults, createSeparator, flyAndScale, buttonVariants, Root2, Trigger, data;
var init_layout_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/_layout.svelte.js"() {
    init_index3();
    init_stores();
    init_dist2();
    init_index2();
    init_main_server();
    init_clsx();
    init_dist3();
    init_non_secure();
    init_floating_ui_dom();
    init_focus_trap_esm();
    init_bundle_mjs();
    sidebarOpen = writable(false);
    ({
      type: "hidden",
      "aria-hidden": true,
      hidden: true,
      tabIndex: -1,
      style: styleToString({
        position: "absolute",
        opacity: 0,
        "pointer-events": "none",
        margin: 0,
        transform: "translateX(-100%)"
      })
    });
    hiddenAction = (obj) => {
      return new Proxy(obj, {
        get(target, prop, receiver) {
          return Reflect.get(target, prop, receiver);
        },
        ownKeys(target) {
          return Reflect.ownKeys(target).filter((key2) => key2 !== "action");
        }
      });
    };
    isFunctionWithParams = (fn) => {
      return typeof fn === "function";
    };
    makeElement("empty");
    isBrowser3 = typeof document !== "undefined";
    isFunction = (v) => typeof v === "function";
    safeOnMount = (fn) => {
      try {
        onMount(fn);
      } catch {
        return fn;
      }
    };
    safeOnDestroy = (fn) => {
      try {
        onDestroy(fn);
      } catch {
        return fn;
      }
    };
    withGet.writable = function(initial2) {
      const internal2 = writable(initial2);
      let value = initial2;
      return {
        subscribe: internal2.subscribe,
        set(newValue) {
          internal2.set(newValue);
          value = newValue;
        },
        update(updater) {
          const newValue = updater(value);
          internal2.set(newValue);
          value = newValue;
        },
        get() {
          return value;
        }
      };
    };
    withGet.derived = function(stores, fn) {
      const subscribers = /* @__PURE__ */ new Map();
      const get4 = () => {
        const values = Array.isArray(stores) ? stores.map((store) => store.get()) : stores.get();
        return fn(values);
      };
      const subscribe = (subscriber) => {
        const unsubscribers = [];
        const storesArr = Array.isArray(stores) ? stores : [stores];
        storesArr.forEach((store) => {
          unsubscribers.push(store.subscribe(() => {
            subscriber(get4());
          }));
        });
        subscriber(get4());
        subscribers.set(subscriber, unsubscribers);
        return () => {
          const unsubscribers2 = subscribers.get(subscriber);
          if (unsubscribers2) {
            for (const unsubscribe of unsubscribers2) {
              unsubscribe();
            }
          }
          subscribers.delete(subscriber);
        };
      };
      return {
        get: get4,
        subscribe
      };
    };
    overridable = (_store, onChange) => {
      const store = withGet(_store);
      const update = (updater, sideEffect) => {
        store.update((curr) => {
          const next = updater(curr);
          let res = next;
          if (onChange) {
            res = onChange({ curr, next });
          }
          sideEffect?.(res);
          return res;
        });
      };
      const set2 = (curr) => {
        update(() => curr);
      };
      return {
        ...store,
        update,
        set: set2
      };
    };
    kbd = {
      ALT: "Alt",
      ARROW_DOWN: "ArrowDown",
      ARROW_LEFT: "ArrowLeft",
      ARROW_RIGHT: "ArrowRight",
      ARROW_UP: "ArrowUp",
      BACKSPACE: "Backspace",
      CAPS_LOCK: "CapsLock",
      CONTROL: "Control",
      DELETE: "Delete",
      END: "End",
      ENTER: "Enter",
      ESCAPE: "Escape",
      F1: "F1",
      F10: "F10",
      F11: "F11",
      F12: "F12",
      F2: "F2",
      F3: "F3",
      F4: "F4",
      F5: "F5",
      F6: "F6",
      F7: "F7",
      F8: "F8",
      F9: "F9",
      HOME: "Home",
      META: "Meta",
      PAGE_DOWN: "PageDown",
      PAGE_UP: "PageUp",
      SHIFT: "Shift",
      SPACE: " ",
      TAB: "Tab",
      CTRL: "Control",
      ASTERISK: "*",
      A: "a",
      P: "p"
    };
    FIRST_KEYS = [kbd.ARROW_DOWN, kbd.PAGE_UP, kbd.HOME];
    LAST_KEYS = [kbd.ARROW_UP, kbd.PAGE_DOWN, kbd.END];
    FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
    SELECTION_KEYS = [kbd.ENTER, kbd.SPACE];
    isDom = () => typeof window !== "undefined";
    pt = (v) => isDom() && v.test(getPlatform().toLowerCase());
    isTouchDevice = () => isDom() && !!navigator.maxTouchPoints;
    isMac = () => pt(/^mac/) && !isTouchDevice();
    isApple = () => pt(/mac|iphone|ipad|ipod/i);
    isIos = () => isApple() && !isMac();
    LOCK_CLASSNAME = "data-melt-scroll-lock";
    ignoredKeys = /* @__PURE__ */ new Set(["Shift", "Control", "Alt", "Meta", "CapsLock", "NumLock"]);
    defaults$3 = {
      onMatch: handleRovingFocus,
      getCurrentItem: () => document.activeElement
    };
    readable(void 0, (set2) => {
      function clicked(event) {
        set2(event);
        set2(void 0);
      }
      const unsubscribe = addEventListener(document, "pointerup", clicked, {
        passive: false,
        capture: true
      });
      return unsubscribe;
    });
    documentEscapeKeyStore = readable(void 0, (set2) => {
      function keydown(event) {
        if (event && event.key === kbd.ESCAPE) {
          set2(event);
        }
        set2(void 0);
      }
      const unsubscribe = addEventListener(document, "keydown", keydown, {
        passive: false
      });
      return unsubscribe;
    });
    useEscapeKeydown = (node, config = {}) => {
      let unsub = noop4;
      function update(config2 = {}) {
        unsub();
        const options2 = { enabled: true, ...config2 };
        const enabled = isReadable(options2.enabled) ? options2.enabled : readable(options2.enabled);
        unsub = executeCallbacks(
          // Handle escape keydowns
          documentEscapeKeyStore.subscribe((e) => {
            if (!e || !get_store_value(enabled))
              return;
            const target = e.target;
            if (!isHTMLElement2(target) || target.closest("[data-escapee]") !== node) {
              return;
            }
            e.preventDefault();
            if (options2.ignore) {
              if (isFunction(options2.ignore)) {
                if (options2.ignore(e))
                  return;
              } else if (Array.isArray(options2.ignore)) {
                if (options2.ignore.length > 0 && options2.ignore.some((ignoreEl) => {
                  return ignoreEl && target === ignoreEl;
                }))
                  return;
              }
            }
            options2.handler?.(e);
          }),
          effect(enabled, ($enabled) => {
            if ($enabled) {
              node.dataset.escapee = "";
            } else {
              delete node.dataset.escapee;
            }
          })
        );
      }
      update(config);
      return {
        update,
        destroy() {
          node.removeAttribute("data-escapee");
          unsub();
        }
      };
    };
    defaultConfig$1 = {
      strategy: "absolute",
      placement: "top",
      gutter: 5,
      flip: true,
      sameWidth: false,
      overflowPadding: 8
    };
    ARROW_TRANSFORM = {
      bottom: "rotate(45deg)",
      left: "rotate(135deg)",
      top: "rotate(225deg)",
      right: "rotate(315deg)"
    };
    visibleModals = [];
    defaultConfig = {
      floating: {},
      focusTrap: {},
      modal: {},
      escapeKeydown: {},
      portal: "body"
    };
    usePopper = (popperElement, args) => {
      popperElement.dataset.escapee = "";
      const { anchorElement, open, options: options2 } = args;
      if (!anchorElement || !open || !options2) {
        return { destroy: noop4 };
      }
      const opts = { ...defaultConfig, ...options2 };
      const callbacks = [];
      if (opts.portal !== null) {
        const portal = usePortal(popperElement, opts.portal);
        if (portal?.destroy) {
          callbacks.push(portal.destroy);
        }
      }
      callbacks.push(useFloating(anchorElement, popperElement, opts.floating).destroy);
      if (opts.focusTrap !== null) {
        const { useFocusTrap } = createFocusTrap3({
          immediate: true,
          escapeDeactivates: false,
          allowOutsideClick: true,
          returnFocusOnDeactivate: false,
          fallbackFocus: popperElement,
          ...opts.focusTrap
        });
        const usedFocusTrap = useFocusTrap(popperElement);
        if (usedFocusTrap?.destroy) {
          callbacks.push(usedFocusTrap.destroy);
        }
      }
      if (opts.modal !== null) {
        callbacks.push(useModal(popperElement, {
          onClose: () => {
            if (isHTMLElement2(anchorElement)) {
              open.set(false);
              anchorElement.focus();
            }
          },
          shouldCloseOnInteractOutside: (e) => {
            if (e.defaultPrevented)
              return false;
            if (isHTMLElement2(anchorElement) && anchorElement.contains(e.target)) {
              return false;
            }
            return true;
          },
          ...opts.modal
        }).destroy);
      }
      if (opts.escapeKeydown !== null) {
        callbacks.push(useEscapeKeydown(popperElement, {
          enabled: open,
          handler: () => {
            open.set(false);
          },
          ...opts.escapeKeydown
        }).destroy);
      }
      const unsubscribe = executeCallbacks(...callbacks);
      return {
        destroy() {
          unsubscribe();
        }
      };
    };
    usePortal = (el, target = "body") => {
      let targetEl;
      if (!isHTMLElement2(target) && typeof target !== "string") {
        return {
          destroy: noop4
        };
      }
      async function update(newTarget) {
        target = newTarget;
        if (typeof target === "string") {
          targetEl = document.querySelector(target);
          if (targetEl === null) {
            await tick();
            targetEl = document.querySelector(target);
          }
          if (targetEl === null) {
            throw new Error(`No element found matching css selector: "${target}"`);
          }
        } else if (target instanceof HTMLElement) {
          targetEl = target;
        } else {
          throw new TypeError(`Unknown portal target type: ${target === null ? "null" : typeof target}. Allowed types: string (CSS selector) or HTMLElement.`);
        }
        el.dataset.portal = "";
        targetEl.appendChild(el);
        el.hidden = false;
      }
      function destroy() {
        el.remove();
      }
      update(target);
      return {
        update,
        destroy
      };
    };
    ({
      prefix: "",
      disabled: readable(false),
      required: readable(false),
      name: readable(void 0)
    });
    SUB_OPEN_KEYS = {
      ltr: [...SELECTION_KEYS, kbd.ARROW_RIGHT],
      rtl: [...SELECTION_KEYS, kbd.ARROW_LEFT]
    };
    SUB_CLOSE_KEYS = {
      ltr: [kbd.ARROW_LEFT],
      rtl: [kbd.ARROW_RIGHT]
    };
    menuIdParts = ["menu", "trigger"];
    defaults$2 = {
      arrowSize: 8,
      positioning: {
        placement: "bottom"
      },
      preventScroll: true,
      closeOnEscape: true,
      closeOnOutsideClick: true,
      portal: void 0,
      loop: false,
      dir: "ltr",
      defaultOpen: false,
      typeahead: true,
      closeOnItemClick: true,
      onOutsideClick: void 0
    };
    defaults$1 = {
      arrowSize: 8,
      positioning: {
        placement: "bottom"
      },
      preventScroll: true,
      closeOnEscape: true,
      closeOnOutsideClick: true,
      portal: void 0,
      loop: false,
      dir: "ltr",
      defaultOpen: false,
      forceVisible: false,
      typeahead: true,
      closeFocus: void 0,
      disableFocusFirstItem: false,
      closeOnItemClick: true,
      onOutsideClick: void 0
    };
    defaults = {
      orientation: "horizontal",
      decorative: false
    };
    createSeparator = (props) => {
      const withDefaults = { ...defaults, ...props };
      const options2 = toWritableStores(withDefaults);
      const { orientation, decorative } = options2;
      const root2 = makeElement("separator", {
        stores: [orientation, decorative],
        returned: ([$orientation, $decorative]) => {
          const ariaOrientation = $orientation === "vertical" ? $orientation : void 0;
          return {
            role: $decorative ? "none" : "separator",
            "aria-orientation": ariaOrientation,
            "aria-hidden": $decorative,
            "data-orientation": $orientation
          };
        }
      });
      return {
        elements: {
          root: root2
        },
        options: options2
      };
    };
    flyAndScale = (node, params = { y: -8, x: 0, start: 0.95, duration: 150 }) => {
      const style = getComputedStyle(node);
      const transform = style.transform === "none" ? "" : style.transform;
      const scaleConversion = (valueA, scaleA, scaleB) => {
        const [minA, maxA] = scaleA;
        const [minB, maxB] = scaleB;
        const percentage = (valueA - minA) / (maxA - minA);
        const valueB = percentage * (maxB - minB) + minB;
        return valueB;
      };
      const styleToString2 = (style2) => {
        return Object.keys(style2).reduce((str, key2) => {
          if (style2[key2] === void 0)
            return str;
          return str + `${key2}:${style2[key2]};`;
        }, "");
      };
      return {
        duration: params.duration ?? 200,
        delay: 0,
        css: (t) => {
          const y2 = scaleConversion(t, [0, 1], [params.y ?? 5, 0]);
          const x2 = scaleConversion(t, [0, 1], [params.x ?? 0, 0]);
          const scale = scaleConversion(t, [0, 1], [params.start ?? 0.95, 1]);
          return styleToString2({
            transform: `${transform} translate3d(${x2}px, ${y2}px, 0) scale(${scale})`,
            opacity: t
          });
        },
        easing: cubicOut
      };
    };
    buttonVariants = ce({
      base: "inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
      variants: {
        variant: {
          default: "bg-primary text-primary-foreground hover:bg-primary/90",
          destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
          outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
          secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
          ghost: "hover:bg-accent hover:text-accent-foreground",
          link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
          default: "h-10 px-4 py-2",
          sm: "h-9 rounded-md px-3",
          lg: "h-11 rounded-md px-8",
          icon: "h-10 w-10"
        }
      },
      defaultVariants: {
        variant: "default",
        size: "default"
      }
    });
    Root2 = Menu;
    Trigger = Menu_trigger;
    data = [
      {
        title: "Home",
        icon: HomeIcon,
        link: "/admin/dashboard"
      },
      {
        title: "Services",
        icon: StatusIcon,
        link: "/admin/dashboard/services"
      },
      {
        title: "Courses",
        icon: ArchivesIcon,
        link: "/admin/dashboard/courses"
      },
      {
        title: "Users",
        icon: CreditsIcon,
        link: "/admin/dashboard/users"
      },
      {
        title: "Settings",
        icon: SettingsIcon,
        link: "/admin/dashboard/settings"
      },
      {
        title: "Status",
        icon: StatusIcon,
        link: "/admin/dashboard/status"
      },
      {
        title: "Site",
        icon: DocumentationIcon,
        link: "/"
      }
    ];
  }
});

// .svelte-kit/output/server/nodes/4.js
var __exports4 = {};
__export(__exports4, {
  component: () => component4,
  fonts: () => fonts4,
  imports: () => imports4,
  index: () => index4,
  stylesheets: () => stylesheets4
});
var index4, component_cache4, component4, imports4, stylesheets4, fonts4;
var init__4 = __esm({
  ".svelte-kit/output/server/nodes/4.js"() {
    index4 = 4;
    component4 = async () => component_cache4 ?? (component_cache4 = (await Promise.resolve().then(() => (init_layout_svelte3(), layout_svelte_exports3))).default);
    imports4 = ["_app/immutable/nodes/4.DaJsxvNj.js", "_app/immutable/chunks/disclose-version.B6hs-VaT.js", "_app/immutable/chunks/runtime.BoLIClZE.js", "_app/immutable/chunks/store.BhWaJmKK.js", "_app/immutable/chunks/index.JzF151we.js", "_app/immutable/chunks/stores.Bsvbz3Mb.js", "_app/immutable/chunks/entry.uU8UwhXW.js", "_app/immutable/chunks/control.CYgJF_JY.js", "_app/immutable/chunks/main-client.DWdlEJA0.js", "_app/immutable/chunks/if.CGH3jEpU.js"];
    stylesheets4 = ["_app/immutable/assets/4.DTzw_TXO.css", "_app/immutable/assets/app.s0JklKdm.css"];
    fonts4 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(regular)/_layout.ts.js
var layout_ts_exports = {};
__export(layout_ts_exports, {
  load: () => load
});
var load;
var init_layout_ts = __esm({
  ".svelte-kit/output/server/entries/pages/(regular)/_layout.ts.js"() {
    init_public();
    init_dist();
    load = async ({ fetch: fetch3, data: data2, depends }) => {
      depends("supabase:auth");
      const supabase = createBrowserClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
        global: {
          fetch: fetch3
        },
        cookies: {
          get(key2) {
            if (!isBrowser2()) {
              return JSON.stringify(data2.session);
            }
            const cookie = (0, import_cookie.parse)(document.cookie);
            return cookie[key2];
          }
        }
      });
      const {
        data: { session }
      } = await supabase.auth.getSession();
      return { supabase, session };
    };
  }
});

// .svelte-kit/output/server/entries/pages/(regular)/_layout.server.ts.js
var layout_server_ts_exports = {};
__export(layout_server_ts_exports, {
  load: () => load2
});
var load2;
var init_layout_server_ts = __esm({
  ".svelte-kit/output/server/entries/pages/(regular)/_layout.server.ts.js"() {
    load2 = async ({ locals: { getSession } }) => {
      return {
        session: await getSession()
      };
    };
  }
});

// .svelte-kit/output/server/chunks/Button.js
function Button2($$payload, $$props) {
  push(false);
  let primary = value_or_fallback($$props["primary"], true);
  let secondary = value_or_fallback($$props["secondary"], false);
  let center = value_or_fallback($$props["center"], true);
  if (secondary)
    primary = false;
  const anchor = create_anchor($$payload);
  $$payload.out += `<div${attr("class", `items-center justify-center ${stringify([center ? "flex" : ""].filter(Boolean).join(" "))}`, false)}><button${attr(
    "class",
    `${stringify(`
  ${primary && "text-gray-800 bg-white"}
  ${secondary && "text-gray-50 gradient"}
  mx-auto lg:mx-0 hover:underline font-bold rounded-full my-6 py-4 px-8 shadow-lg focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out
  `)} svelte-9j2yd7`,
    false
  )}>${anchor}`;
  slot($$payload, $$props.children, {}, () => {
    $$payload.out += `Click me!`;
  });
  $$payload.out += `${anchor}</button></div>`;
  bind_props($$props, { primary, secondary, center });
  pop();
}
var init_Button = __esm({
  ".svelte-kit/output/server/chunks/Button.js"() {
    init_index3();
  }
});

// .svelte-kit/output/server/entries/pages/(regular)/_layout.svelte.js
var layout_svelte_exports4 = {};
__export(layout_svelte_exports4, {
  default: () => _layout3
});
function Footer($$payload, $$props) {
  push(false);
  $$payload.out += `<footer class="bg-white"><div class="container mx-auto px-8"><div class="w-full flex flex-col md:flex-row py-6"><div class="flex-1 mb-6 text-black"><a class="text-pink-600 no-underline hover:no-underline font-bold text-2xl lg:text-4xl" href="/"><svg class="h-8 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.005 512.005"><rect fill="#2a2a31" x="16.539" y="425.626" width="479.767" height="50.502" transform="matrix(1,0,0,1,0,0)"></rect><path class="plane-take-off" d=" M 510.7 189.151 C 505.271 168.95 484.565 156.956 464.365 162.385 L 330.156 198.367 L 155.924 35.878 L 107.19 49.008 L 211.729 230.183 L 86.232 263.767 L 36.614 224.754 L 0 234.603 L 45.957 314.27 L 65.274 347.727 L 105.802 336.869 L 240.011 300.886 L 349.726 271.469 L 483.935 235.486 C 504.134 230.057 516.129 209.352 510.7 189.151 Z "></path></svg> PR WAVE</a></div> <div class="flex-1"><p class="uppercase text-gray-500 md:mb-6">Links</p> <ul class="list-reset mb-6"><li class="mt-2 inline-block mr-2 md:block md:mr-0"><a href="/faq" class="no-underline hover:underline text-gray-800 hover:text-pink-500">FAQ</a></li> <li class="mt-2 inline-block mr-2 md:block md:mr-0"><a href="/help" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Help</a></li></ul></div> <div class="flex-1"><p class="uppercase text-gray-500 md:mb-6">Legal</p> <ul class="list-reset mb-6"><li class="mt-2 inline-block mr-2 md:block md:mr-0"><a href="/terms" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Terms</a></li> <li class="mt-2 inline-block mr-2 md:block md:mr-0"><a href="/privacy" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Privacy</a></li></ul></div> <div class="flex-1"><p class="uppercase text-gray-500 md:mb-6">Social</p> <ul class="list-reset mb-6"><li class="mt-2 inline-block mr-2 md:block md:mr-0"><a href="https://www.facebook.com/socialmediagencyprwave" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Facebook</a></li> <li class="mt-2 inline-block mr-2 md:block md:mr-0"><a href="/" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Instagram</a></li></ul></div> <div class="flex-1"><p class="uppercase text-gray-500 md:mb-6">Company</p> <ul class="list-reset mb-6"><li class="mt-2 inline-block mr-2 md:block md:mr-0"><a href="/blog" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Official Blog</a></li> <li class="mt-2 inline-block mr-2 md:block md:mr-0"><a href="/about_us" class="no-underline hover:underline text-gray-800 hover:text-pink-500">About Us</a></li> <li class="mt-2 inline-block mr-2 md:block md:mr-0"><a href="/contact" class="no-underline hover:underline text-gray-800 hover:text-pink-500">Contact</a></li></ul></div></div></div> <a href="https://www.freepik.com/free-photos-vectors/background" class="text-gray-500">@ Copyright. Pr Wave, 2024</a></footer>`;
  pop();
}
function Nav($$payload, $$props) {
  push(false);
  let y2;
  let navFloat = false;
  onDestroy(() => {
  });
  let user = $$props["user"];
  navFloat = y2 > 10;
  const anchor = create_anchor($$payload);
  const anchor_1 = create_anchor($$payload);
  $$payload.out += `<nav id="header"${attr(
    "class",
    `
  fixed w-full z-30 top-0 text-white
  ${navFloat && "bg-white"}
  `,
    false
  )}><div class="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2"><div class="pl-4 flex items-center"><a${attr(
    "class",
    `no-underline hover:no-underline font-bold text-2xl lg:text-4xl ${stringify([
      navFloat ? "text-gray-800" : "",
      !navFloat ? "text-white" : ""
    ].filter(Boolean).join(" "))}`,
    false
  )} href="/"><svg class="h-8 fill-current inline" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.005 512.005"><rect fill="#2a2a31" x="16.539" y="425.626" width="479.767" height="50.502" transform="matrix(1,0,0,1,0,0)"></rect><path class="plane-take-off" d=" M 510.7 189.151 C 505.271 168.95 484.565 156.956 464.365 162.385 L 330.156 198.367 L 155.924 35.878 L 107.19 49.008 L 211.729 230.183 L 86.232 263.767 L 36.614 224.754 L 0 234.603 L 45.957 314.27 L 65.274 347.727 L 105.802 336.869 L 240.011 300.886 L 349.726 271.469 L 483.935 235.486 C 504.134 230.057 516.129 209.352 510.7 189.151 Z "></path></svg> PR WAVE</a></div> <div class="block lg:hidden pr-4"><button id="nav-toggle" class="flex items-center p-1 text-pink-800 hover:text-gray-900 focus:outline-none focus:shadow-outline transform transition hover:scale-105 duration-300 ease-in-out"><svg class="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path></svg></button></div> <div${attr("class", `hidden w-full flex-grow lg:flex lg:items-center lg:w-auto mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20 ${stringify(["hidden"].filter(Boolean).join(" "))}`, false)} id="nav-content"><ul class="list-reset lg:flex justify-end flex-1 items-center">${anchor}`;
  if (user !== void 0) {
    $$payload.out += "<!--ssr:if:true-->";
    $$payload.out += `<li class="mr-3"><a class="inline-block py-2 px-4 text-black font-bold no-underline" href="/admin/dashboard">Dashboard</a></li>`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor} <li class="mr-3"><a class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="/blog">Blog</a></li> <li class="mr-3"><a class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="#course">Course</a></li> <li class="mr-3"><a class="inline-block text-black no-underline hover:text-gray-800 hover:text-underline py-2 px-4" href="#services">Services</a></li></ul> ${anchor_1}`;
  Button2($$payload, {
    secondary: navFloat,
    center: false,
    children: ($$payload2, $$slotProps) => {
      $$payload2.out += `Action2`;
    }
  });
  $$payload.out += `${anchor_1}</div></div> <hr class="border-b border-gray-100 opacity-25 my-0 py-0"></nav>`;
  bind_props($$props, { user });
  pop();
}
function _layout3($$payload, $$props) {
  push(false);
  let data2 = $$props["data"];
  const anchor = create_anchor($$payload);
  const anchor_1 = create_anchor($$payload);
  const anchor_2 = create_anchor($$payload);
  head($$payload, ($$payload2) => {
    $$payload2.title = "<title>";
    $$payload2.title += `PR WAVE</title>`;
    $$payload2.out += `<meta property="og:type" content="article">`;
  });
  $$payload.out += `<div class="leading-normal tracking-normal text-white gradient svelte-bv2ye3" style="font-family: 'Source Sans Pro', sans-serif;">${anchor}`;
  Nav($$payload, { user: data2?.session?.user });
  $$payload.out += `${anchor} ${anchor_1}`;
  slot($$payload, $$props.children, {}, null);
  $$payload.out += `${anchor_1} ${anchor_2}`;
  Footer($$payload);
  $$payload.out += `${anchor_2}</div>`;
  bind_props($$props, { data: data2 });
  pop();
}
var init_layout_svelte4 = __esm({
  ".svelte-kit/output/server/entries/pages/(regular)/_layout.svelte.js"() {
    init_index3();
    init_main_server();
    init_Button();
  }
});

// .svelte-kit/output/server/nodes/5.js
var __exports5 = {};
__export(__exports5, {
  component: () => component5,
  fonts: () => fonts5,
  imports: () => imports5,
  index: () => index5,
  server: () => layout_server_ts_exports,
  server_id: () => server_id,
  stylesheets: () => stylesheets5,
  universal: () => layout_ts_exports,
  universal_id: () => universal_id
});
var index5, component_cache5, component5, universal_id, server_id, imports5, stylesheets5, fonts5;
var init__5 = __esm({
  ".svelte-kit/output/server/nodes/5.js"() {
    init_layout_ts();
    init_layout_server_ts();
    index5 = 5;
    component5 = async () => component_cache5 ?? (component_cache5 = (await Promise.resolve().then(() => (init_layout_svelte4(), layout_svelte_exports4))).default);
    universal_id = "src/routes/(regular)/+layout.ts";
    server_id = "src/routes/(regular)/+layout.server.ts";
    imports5 = ["_app/immutable/nodes/5.Dl-6a7Rl.js", "_app/immutable/chunks/preload-helper.BQ24v_F8.js", "_app/immutable/chunks/disclose-version.B6hs-VaT.js", "_app/immutable/chunks/runtime.BoLIClZE.js", "_app/immutable/chunks/if.CGH3jEpU.js", "_app/immutable/chunks/main-client.DWdlEJA0.js", "_app/immutable/chunks/Button.BtlgTBdo.js"];
    stylesheets5 = ["_app/immutable/assets/5.CHBKdjGz.css", "_app/immutable/assets/app.s0JklKdm.css", "_app/immutable/assets/Button.CWCsxZZL.css"];
    fonts5 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(protected)/admin/_page.server.ts.js
var page_server_ts_exports = {};
__export(page_server_ts_exports, {
  actions: () => actions,
  load: () => load3
});
var load3, actions;
var init_page_server_ts = __esm({
  ".svelte-kit/output/server/entries/pages/(protected)/admin/_page.server.ts.js"() {
    init_chunks();
    load3 = async ({ locals: { supabase } }) => {
      const userFetch = await supabase.auth.getUser();
      if (userFetch.data.user) {
        redirect(303, "/admin/dashboard");
      }
    };
    actions = {
      default: async (event) => {
        const { request, locals: { supabase } } = event;
        const formData = await request.formData();
        const email = formData.get("email");
        const password = formData.get("password");
        const passwordConfirmation = formData.get("passwordConfirmation");
        if (passwordConfirmation != password) {
          return fail(422, {
            error: "Passwords don't match"
          });
        }
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) {
          return fail(422, {
            error: error.message
          });
        }
        redirect(303, "/admin/dashboard");
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/(protected)/admin/_page.svelte.js
var page_svelte_exports = {};
__export(page_svelte_exports, {
  default: () => _page
});
function _page($$payload, $$props) {
  push(false);
  $$payload.out += `<section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800 place-self-center"><h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Sign In</h2> <form method="POST"><div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2"><div><label class="text-gray-700 dark:text-gray-200" for="email">Email Address</label> <input id="email" name="email" type="email" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></div> <div><label class="text-gray-700 dark:text-gray-200" for="password">Password</label> <input id="password" name="password" type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></div> <div><label class="text-gray-700 dark:text-gray-200" for="passwordConfirmation">Password Confirmation</label> <input id="passwordConfirmation" name="passwordConfirmation" type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></div></div> <div class="flex justify-end mt-6"><button type="submit" class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Sign In</button></div></form></section>`;
  pop();
}
var init_page_svelte = __esm({
  ".svelte-kit/output/server/entries/pages/(protected)/admin/_page.svelte.js"() {
    init_index3();
  }
});

// .svelte-kit/output/server/nodes/8.js
var __exports6 = {};
__export(__exports6, {
  component: () => component6,
  fonts: () => fonts6,
  imports: () => imports6,
  index: () => index6,
  server: () => page_server_ts_exports,
  server_id: () => server_id2,
  stylesheets: () => stylesheets6
});
var index6, component_cache6, component6, server_id2, imports6, stylesheets6, fonts6;
var init__6 = __esm({
  ".svelte-kit/output/server/nodes/8.js"() {
    init_page_server_ts();
    index6 = 8;
    component6 = async () => component_cache6 ?? (component_cache6 = (await Promise.resolve().then(() => (init_page_svelte(), page_svelte_exports))).default);
    server_id2 = "src/routes/(protected)/admin/+page.server.ts";
    imports6 = ["_app/immutable/nodes/8.S7W0n8k5.js", "_app/immutable/chunks/disclose-version.B6hs-VaT.js", "_app/immutable/chunks/runtime.BoLIClZE.js"];
    stylesheets6 = [];
    fonts6 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/_page.server.ts.js
var page_server_ts_exports2 = {};
__export(page_server_ts_exports2, {
  load: () => load4
});
var load4;
var init_page_server_ts2 = __esm({
  ".svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/_page.server.ts.js"() {
    init_chunks();
    load4 = async ({ locals: { supabase } }) => {
      const userFetch = await supabase.auth.getUser();
      if (!userFetch.data.user) {
        redirect(303, "/");
      }
    };
  }
});

// .svelte-kit/output/server/chunks/Content.js
function Table($$payload, $$props) {
  push(false);
  let rows = $$props["rows"];
  let cols = $$props["cols"];
  const anchor = create_anchor($$payload);
  const each_array = ensure_array_like(cols);
  const anchor_2 = create_anchor($$payload);
  const each_array_1 = ensure_array_like(rows);
  $$payload.out += `<div class="flex flex-col"><div class="overflow-x-scroll sm:-mx-6 lg:-mx-8"><div class="inline-block min-w-full py-2 sm:px-6 lg:px-8"><div class="overflow-hidden"><div class="max-w-full overflow-x-auto"><table class="min-w-full text-left text-sm font-light text-white"><thead class="border-b border-neutral-200 font-medium dark:border-white/10"><tr><th scope="col" class="px-6 py-4"></th>${anchor}`;
  for (let $$index = 0; $$index < each_array.length; $$index++) {
    const column = each_array[$$index];
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}<th scope="col" class="px-6 py-4">${escape(column.title)}</th>${anchor_1}`;
  }
  $$payload.out += `${anchor}</tr></thead><tbody>${anchor_2}`;
  for (let i2 = 0; i2 < each_array_1.length; i2++) {
    const row = each_array_1[i2];
    const anchor_3 = create_anchor($$payload);
    const anchor_4 = create_anchor($$payload);
    const each_array_2 = ensure_array_like(cols);
    $$payload.out += `${anchor_3}<tr class="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-gray-900 dark:border-white/10 dark:hover:bg-neutral-600"><td class="whitespace-nowrap px-6 py-4 font-medium">${escape(i2 + 1)}</td>${anchor_4}`;
    for (let $$index_1 = 0; $$index_1 < each_array_2.length; $$index_1++) {
      const column = each_array_2[$$index_1];
      const anchor_5 = create_anchor($$payload);
      $$payload.out += `${anchor_5}<td class="whitespace-nowrap px-6 py-4">${escape(row[column.field])}</td>${anchor_5}`;
    }
    $$payload.out += `${anchor_4}</tr>${anchor_3}`;
  }
  $$payload.out += `${anchor_2}</tbody></table></div></div></div></div></div>`;
  bind_props($$props, { rows, cols });
  pop();
}
function Additional_field($$payload, $$props) {
  push(false);
  $$payload.out += `<div class="bg-gray-800 rounded-3xl px-6 pt-6"><div class="flex text-white text-2xl pb-6 font-bold"><p>Client Messages</p></div> <div class="border-t solid border-gray-700 p-4 flex 2xl:items-start w-full hover:bg-gray-700"><div class="pl-4 w-full"><div class="flex items-center justify-between w-full"><div class="text-white font-medium">Mark</div> <div class="flex justify-center items-center cursor-pointer h-7 w-7"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div></div> <p class="my-2 text-sm text-gray-400">I am really impressed! Can't wait to see the final result.</p> <p class="text-right text-gray-400 text-sm">Dec, 12</p></div></div></div>`;
  pop();
}
function Content($$payload, $$props) {
  push(false);
  let title = $$props["title"];
  let columns = $$props["columns"];
  let rows = $$props["rows"];
  let currentDate = /* @__PURE__ */ new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  const anchor = create_anchor($$payload);
  const anchor_2 = create_anchor($$payload);
  $$payload.out += `<div class="flex flex-wrap"><div class="w-full lg:w-8/12 bg-gray-800 py-6 px-6 rounded-3xl"><div class="flex justify-between text-white items-center mb-8"><p class="text-2xl font-bold">${escape(title)}</p> <p>${escape(day + "-" + month + "-" + year)}</p></div> ${anchor}`;
  if (title == "Users" || title == "Services" || title == "Courses") {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    Table($$payload, { rows, cols: columns });
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    $$payload.out += `<h1 class="text-3xl">${escape(title)}</h1>`;
  }
  $$payload.out += `${anchor}</div> <div class="w-full mt-8 lg:mt-0 lg:w-4/12 lg:pl-4">${anchor_2}`;
  Additional_field($$payload);
  $$payload.out += `${anchor_2}</div></div>`;
  bind_props($$props, { title, columns, rows });
  pop();
}
var init_Content = __esm({
  ".svelte-kit/output/server/chunks/Content.js"() {
    init_index3();
  }
});

// .svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/_page.svelte.js
var page_svelte_exports2 = {};
__export(page_svelte_exports2, {
  default: () => _page2
});
function _page2($$payload, $$props) {
  push(false);
  let rows = [];
  let columns = [];
  const anchor = create_anchor($$payload);
  head($$payload, ($$payload2) => {
    $$payload2.title = "<title>";
    $$payload2.title += `Admin Dashboard for PR WAVE Website</title>`;
  });
  $$payload.out += `${anchor}`;
  Content($$payload, { title: "Home", rows, columns });
  $$payload.out += `${anchor}`;
  pop();
}
var init_page_svelte2 = __esm({
  ".svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/_page.svelte.js"() {
    init_index3();
    init_Content();
  }
});

// .svelte-kit/output/server/nodes/9.js
var __exports7 = {};
__export(__exports7, {
  component: () => component7,
  fonts: () => fonts7,
  imports: () => imports7,
  index: () => index7,
  server: () => page_server_ts_exports2,
  server_id: () => server_id3,
  stylesheets: () => stylesheets7
});
var index7, component_cache7, component7, server_id3, imports7, stylesheets7, fonts7;
var init__7 = __esm({
  ".svelte-kit/output/server/nodes/9.js"() {
    init_page_server_ts2();
    index7 = 9;
    component7 = async () => component_cache7 ?? (component_cache7 = (await Promise.resolve().then(() => (init_page_svelte2(), page_svelte_exports2))).default);
    server_id3 = "src/routes/(protected)/admin/dashboard/+page.server.ts";
    imports7 = ["_app/immutable/nodes/9.DXwnHN3M.js", "_app/immutable/chunks/disclose-version.B6hs-VaT.js", "_app/immutable/chunks/runtime.BoLIClZE.js", "_app/immutable/chunks/Content.BVXRajT0.js", "_app/immutable/chunks/if.CGH3jEpU.js"];
    stylesheets7 = [];
    fonts7 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/courses/_page.server.ts.js
var page_server_ts_exports3 = {};
__export(page_server_ts_exports3, {
  load: () => load5
});
var load5;
var init_page_server_ts3 = __esm({
  ".svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/courses/_page.server.ts.js"() {
    init_chunks();
    load5 = async ({ locals: { supabase } }) => {
      const userFetch = await supabase.auth.getUser();
      if (!userFetch.data.user) {
        redirect(303, "/");
      }
      async function getCoursesFromSupabase() {
        try {
          let { data: courses, error } = await supabase.from("courses").select(`
                    course_name,
                    start_date,
                    end_date,
                    isactive
              `);
          if (error) {
            throw error;
          }
          return courses;
        } catch (error) {
        }
      }
      return {
        courses: await getCoursesFromSupabase()
      };
    };
  }
});

// .svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/courses/_page.svelte.js
var page_svelte_exports3 = {};
__export(page_svelte_exports3, {
  default: () => _page3
});
function _page3($$payload, $$props) {
  push(false);
  let data2 = $$props["data"];
  let columns = [
    { title: "Course Name", field: "course_name" },
    { title: "Active", field: "isactive" },
    { title: "Start Date", field: "start_date" },
    { title: "End Date", field: "end_date" }
  ];
  let rows = data2.courses;
  const anchor = create_anchor($$payload);
  head($$payload, ($$payload2) => {
    $$payload2.title = "<title>";
    $$payload2.title += `Courses</title>`;
  });
  $$payload.out += `${anchor}`;
  Content($$payload, { title: "Courses", rows, columns });
  $$payload.out += `${anchor}`;
  bind_props($$props, { data: data2 });
  pop();
}
var init_page_svelte3 = __esm({
  ".svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/courses/_page.svelte.js"() {
    init_index3();
    init_Content();
  }
});

// .svelte-kit/output/server/nodes/10.js
var __exports8 = {};
__export(__exports8, {
  component: () => component8,
  fonts: () => fonts8,
  imports: () => imports8,
  index: () => index8,
  server: () => page_server_ts_exports3,
  server_id: () => server_id4,
  stylesheets: () => stylesheets8
});
var index8, component_cache8, component8, server_id4, imports8, stylesheets8, fonts8;
var init__8 = __esm({
  ".svelte-kit/output/server/nodes/10.js"() {
    init_page_server_ts3();
    index8 = 10;
    component8 = async () => component_cache8 ?? (component_cache8 = (await Promise.resolve().then(() => (init_page_svelte3(), page_svelte_exports3))).default);
    server_id4 = "src/routes/(protected)/admin/dashboard/courses/+page.server.ts";
    imports8 = ["_app/immutable/nodes/10.gMMp3biN.js", "_app/immutable/chunks/disclose-version.B6hs-VaT.js", "_app/immutable/chunks/runtime.BoLIClZE.js", "_app/immutable/chunks/Content.BVXRajT0.js", "_app/immutable/chunks/if.CGH3jEpU.js"];
    stylesheets8 = [];
    fonts8 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/services/_page.server.ts.js
var page_server_ts_exports4 = {};
__export(page_server_ts_exports4, {
  load: () => load6
});
var load6;
var init_page_server_ts4 = __esm({
  ".svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/services/_page.server.ts.js"() {
    init_chunks();
    load6 = async ({ locals: { supabase } }) => {
      const userFetch = await supabase.auth.getUser();
      if (!userFetch.data.user) {
        redirect(303, "/");
      }
      async function getServicesFromSupabase() {
        try {
          let { data: services, error } = await supabase.from("services").select(`
            service_name,
            isactive
      `);
          if (error) {
            throw error;
          }
          return services;
        } catch (error) {
        }
      }
      return {
        services: await getServicesFromSupabase()
      };
    };
  }
});

// .svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/services/_page.svelte.js
var page_svelte_exports4 = {};
__export(page_svelte_exports4, {
  default: () => _page4
});
function _page4($$payload, $$props) {
  push(false);
  let data2 = $$props["data"];
  let columns = [
    { title: "Service Name", field: "service_name" },
    { title: "Active", field: "isactive" }
  ];
  let rows = data2.services;
  const anchor = create_anchor($$payload);
  head($$payload, ($$payload2) => {
    $$payload2.title = "<title>";
    $$payload2.title += `Services</title>`;
  });
  $$payload.out += `${anchor}`;
  Content($$payload, { title: "Services", rows, columns });
  $$payload.out += `${anchor}`;
  bind_props($$props, { data: data2 });
  pop();
}
var init_page_svelte4 = __esm({
  ".svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/services/_page.svelte.js"() {
    init_index3();
    init_Content();
  }
});

// .svelte-kit/output/server/nodes/11.js
var __exports9 = {};
__export(__exports9, {
  component: () => component9,
  fonts: () => fonts9,
  imports: () => imports9,
  index: () => index9,
  server: () => page_server_ts_exports4,
  server_id: () => server_id5,
  stylesheets: () => stylesheets9
});
var index9, component_cache9, component9, server_id5, imports9, stylesheets9, fonts9;
var init__9 = __esm({
  ".svelte-kit/output/server/nodes/11.js"() {
    init_page_server_ts4();
    index9 = 11;
    component9 = async () => component_cache9 ?? (component_cache9 = (await Promise.resolve().then(() => (init_page_svelte4(), page_svelte_exports4))).default);
    server_id5 = "src/routes/(protected)/admin/dashboard/services/+page.server.ts";
    imports9 = ["_app/immutable/nodes/11.CCxGHOpD.js", "_app/immutable/chunks/disclose-version.B6hs-VaT.js", "_app/immutable/chunks/runtime.BoLIClZE.js", "_app/immutable/chunks/Content.BVXRajT0.js", "_app/immutable/chunks/if.CGH3jEpU.js"];
    stylesheets9 = [];
    fonts9 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/settings/_page.server.ts.js
var page_server_ts_exports5 = {};
__export(page_server_ts_exports5, {
  load: () => load7
});
var load7;
var init_page_server_ts5 = __esm({
  ".svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/settings/_page.server.ts.js"() {
    init_chunks();
    load7 = async ({ locals: { supabase } }) => {
      const userFetch = await supabase.auth.getUser();
      if (!userFetch.data.user) {
        redirect(303, "/");
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/settings/_page.svelte.js
var page_svelte_exports5 = {};
__export(page_svelte_exports5, {
  default: () => _page5
});
function _page5($$payload, $$props) {
  push(false);
  const anchor = create_anchor($$payload);
  head($$payload, ($$payload2) => {
    $$payload2.title = "<title>";
    $$payload2.title += `Settings</title>`;
  });
  $$payload.out += `${anchor}`;
  Content($$payload, {
    title: "Settings",
    rows: new Array(),
    columns: new Array()
  });
  $$payload.out += `${anchor}`;
  pop();
}
var init_page_svelte5 = __esm({
  ".svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/settings/_page.svelte.js"() {
    init_index3();
    init_Content();
  }
});

// .svelte-kit/output/server/nodes/12.js
var __exports10 = {};
__export(__exports10, {
  component: () => component10,
  fonts: () => fonts10,
  imports: () => imports10,
  index: () => index10,
  server: () => page_server_ts_exports5,
  server_id: () => server_id6,
  stylesheets: () => stylesheets10
});
var index10, component_cache10, component10, server_id6, imports10, stylesheets10, fonts10;
var init__10 = __esm({
  ".svelte-kit/output/server/nodes/12.js"() {
    init_page_server_ts5();
    index10 = 12;
    component10 = async () => component_cache10 ?? (component_cache10 = (await Promise.resolve().then(() => (init_page_svelte5(), page_svelte_exports5))).default);
    server_id6 = "src/routes/(protected)/admin/dashboard/settings/+page.server.ts";
    imports10 = ["_app/immutable/nodes/12.BRJtlt1e.js", "_app/immutable/chunks/disclose-version.B6hs-VaT.js", "_app/immutable/chunks/runtime.BoLIClZE.js", "_app/immutable/chunks/Content.BVXRajT0.js", "_app/immutable/chunks/if.CGH3jEpU.js"];
    stylesheets10 = [];
    fonts10 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/status/_page.server.ts.js
var page_server_ts_exports6 = {};
__export(page_server_ts_exports6, {
  load: () => load8
});
var load8;
var init_page_server_ts6 = __esm({
  ".svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/status/_page.server.ts.js"() {
    init_chunks();
    load8 = async ({ locals: { supabase } }) => {
      const userFetch = await supabase.auth.getUser();
      if (!userFetch.data.user) {
        redirect(303, "/");
      }
    };
  }
});

// .svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/status/_page.svelte.js
var page_svelte_exports6 = {};
__export(page_svelte_exports6, {
  default: () => _page6
});
function _page6($$payload, $$props) {
  push(false);
  const anchor = create_anchor($$payload);
  head($$payload, ($$payload2) => {
    $$payload2.title = "<title>";
    $$payload2.title += `Status</title>`;
  });
  $$payload.out += `${anchor}`;
  Content($$payload, {
    title: "Status",
    rows: new Array(),
    columns: new Array()
  });
  $$payload.out += `${anchor}`;
  pop();
}
var init_page_svelte6 = __esm({
  ".svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/status/_page.svelte.js"() {
    init_index3();
    init_Content();
  }
});

// .svelte-kit/output/server/nodes/13.js
var __exports11 = {};
__export(__exports11, {
  component: () => component11,
  fonts: () => fonts11,
  imports: () => imports11,
  index: () => index11,
  server: () => page_server_ts_exports6,
  server_id: () => server_id7,
  stylesheets: () => stylesheets11
});
var index11, component_cache11, component11, server_id7, imports11, stylesheets11, fonts11;
var init__11 = __esm({
  ".svelte-kit/output/server/nodes/13.js"() {
    init_page_server_ts6();
    index11 = 13;
    component11 = async () => component_cache11 ?? (component_cache11 = (await Promise.resolve().then(() => (init_page_svelte6(), page_svelte_exports6))).default);
    server_id7 = "src/routes/(protected)/admin/dashboard/status/+page.server.ts";
    imports11 = ["_app/immutable/nodes/13.Dsnn0wck.js", "_app/immutable/chunks/disclose-version.B6hs-VaT.js", "_app/immutable/chunks/runtime.BoLIClZE.js", "_app/immutable/chunks/Content.BVXRajT0.js", "_app/immutable/chunks/if.CGH3jEpU.js"];
    stylesheets11 = [];
    fonts11 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/users/_page.server.ts.js
var page_server_ts_exports7 = {};
__export(page_server_ts_exports7, {
  load: () => load9
});
var load9;
var init_page_server_ts7 = __esm({
  ".svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/users/_page.server.ts.js"() {
    init_chunks();
    load9 = async ({ locals: { supabase } }) => {
      const userFetch = await supabase.auth.getUser();
      if (!userFetch.data.user) {
        redirect(303, "/");
      }
      async function getUsersFromSupabase() {
        try {
          let { data: users, error } = await supabase.from("users").select(`
                    first_name,
                    last_name,
                    mail,
                    phone_number
              `);
          if (error) {
            throw error;
          }
          return users;
        } catch (error) {
        }
      }
      return {
        users: await getUsersFromSupabase()
      };
    };
  }
});

// .svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/users/_page.svelte.js
var page_svelte_exports7 = {};
__export(page_svelte_exports7, {
  default: () => _page7
});
function _page7($$payload, $$props) {
  push(false);
  let data2 = $$props["data"];
  let columns = [
    { title: "First Name", field: "first_name" },
    { title: "Last Name", field: "last_name" },
    { title: "Email", field: "mail" },
    { title: "Phone Number", field: "phone_number" }
  ];
  let rows = data2.users;
  const anchor = create_anchor($$payload);
  head($$payload, ($$payload2) => {
    $$payload2.title = "<title>";
    $$payload2.title += `Users</title>`;
  });
  $$payload.out += `${anchor}`;
  Content($$payload, { title: "Users", rows, columns });
  $$payload.out += `${anchor}`;
  bind_props($$props, { data: data2 });
  pop();
}
var init_page_svelte7 = __esm({
  ".svelte-kit/output/server/entries/pages/(protected)/admin/dashboard/users/_page.svelte.js"() {
    init_index3();
    init_Content();
  }
});

// .svelte-kit/output/server/nodes/14.js
var __exports12 = {};
__export(__exports12, {
  component: () => component12,
  fonts: () => fonts12,
  imports: () => imports12,
  index: () => index12,
  server: () => page_server_ts_exports7,
  server_id: () => server_id8,
  stylesheets: () => stylesheets12
});
var index12, component_cache12, component12, server_id8, imports12, stylesheets12, fonts12;
var init__12 = __esm({
  ".svelte-kit/output/server/nodes/14.js"() {
    init_page_server_ts7();
    index12 = 14;
    component12 = async () => component_cache12 ?? (component_cache12 = (await Promise.resolve().then(() => (init_page_svelte7(), page_svelte_exports7))).default);
    server_id8 = "src/routes/(protected)/admin/dashboard/users/+page.server.ts";
    imports12 = ["_app/immutable/nodes/14.Bn7L6jsa.js", "_app/immutable/chunks/disclose-version.B6hs-VaT.js", "_app/immutable/chunks/runtime.BoLIClZE.js", "_app/immutable/chunks/Content.BVXRajT0.js", "_app/immutable/chunks/if.CGH3jEpU.js"];
    stylesheets12 = [];
    fonts12 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(regular)/about_us/_page.svelte.js
var page_svelte_exports8 = {};
__export(page_svelte_exports8, {
  default: () => _page8
});
function _page8($$payload, $$props) {
  push(false);
  $$payload.out += `<h1>About Us</h1>`;
  pop();
}
var init_page_svelte8 = __esm({
  ".svelte-kit/output/server/entries/pages/(regular)/about_us/_page.svelte.js"() {
    init_index3();
  }
});

// .svelte-kit/output/server/nodes/16.js
var __exports13 = {};
__export(__exports13, {
  component: () => component13,
  fonts: () => fonts13,
  imports: () => imports13,
  index: () => index13,
  stylesheets: () => stylesheets13
});
var index13, component_cache13, component13, imports13, stylesheets13, fonts13;
var init__13 = __esm({
  ".svelte-kit/output/server/nodes/16.js"() {
    index13 = 16;
    component13 = async () => component_cache13 ?? (component_cache13 = (await Promise.resolve().then(() => (init_page_svelte8(), page_svelte_exports8))).default);
    imports13 = ["_app/immutable/nodes/16.BwA6OOjO.js", "_app/immutable/chunks/disclose-version.B6hs-VaT.js", "_app/immutable/chunks/runtime.BoLIClZE.js"];
    stylesheets13 = [];
    fonts13 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(regular)/contact/_page.svelte.js
var page_svelte_exports9 = {};
__export(page_svelte_exports9, {
  default: () => _page9
});
function _page9($$payload, $$props) {
  push(false);
  pop();
}
var init_page_svelte9 = __esm({
  ".svelte-kit/output/server/entries/pages/(regular)/contact/_page.svelte.js"() {
    init_index3();
  }
});

// .svelte-kit/output/server/nodes/17.js
var __exports14 = {};
__export(__exports14, {
  component: () => component14,
  fonts: () => fonts14,
  imports: () => imports14,
  index: () => index14,
  stylesheets: () => stylesheets14
});
var index14, component_cache14, component14, imports14, stylesheets14, fonts14;
var init__14 = __esm({
  ".svelte-kit/output/server/nodes/17.js"() {
    index14 = 17;
    component14 = async () => component_cache14 ?? (component_cache14 = (await Promise.resolve().then(() => (init_page_svelte9(), page_svelte_exports9))).default);
    imports14 = ["_app/immutable/nodes/17.Bd-tUpPQ.js", "_app/immutable/chunks/disclose-version.B6hs-VaT.js", "_app/immutable/chunks/runtime.BoLIClZE.js"];
    stylesheets14 = [];
    fonts14 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(regular)/course/_id_/_page.svelte.js
var page_svelte_exports10 = {};
__export(page_svelte_exports10, {
  default: () => _page10
});
function _page10($$payload, $$props) {
  push(false);
  var $$store_subs;
  store_get($$store_subs ?? ($$store_subs = {}), "$page", page).params.id;
  $$payload.out += `<div class="w-full h-screen mx-auto flex flex-col lg:flex-row pt-8"><div class="w-full lg:w-7/10 border-black border flex flex-col place-items-center"><h2 class="text-white text-2xl pb-2">Course Name</h2> <video class="w-1/2" controls><source src="https://static.videezy.com/system/resources/previews/000/004/862/original/Flare_Logo_Reveal_Animation.mp4" type="video/mp4"> Your browser does not support the video tag.</video></div> <div class="w-full lg:w-3/10 border-red-800 border flex flex-col place-items-center"><section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"><h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Register on Course</h2> <form><div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2"><div><label class="text-gray-700 dark:text-gray-200" for="username">Username</label> <input id="username" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></div> <div><label class="text-gray-700 dark:text-gray-200" for="emailAddress">Email Address</label> <input id="emailAddress" type="email" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></div> <div><label class="text-gray-700 dark:text-gray-200" for="password">Password</label> <input id="password" type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></div> <div><label class="text-gray-700 dark:text-gray-200" for="passwordConfirmation">Password Confirmation</label> <input id="passwordConfirmation" type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></div></div> <div class="flex justify-end mt-6"><button class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button></div></form></section></div></div>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
var init_page_svelte10 = __esm({
  ".svelte-kit/output/server/entries/pages/(regular)/course/_id_/_page.svelte.js"() {
    init_index3();
    init_stores();
  }
});

// .svelte-kit/output/server/nodes/18.js
var __exports15 = {};
__export(__exports15, {
  component: () => component15,
  fonts: () => fonts15,
  imports: () => imports15,
  index: () => index15,
  stylesheets: () => stylesheets15
});
var index15, component_cache15, component15, imports15, stylesheets15, fonts15;
var init__15 = __esm({
  ".svelte-kit/output/server/nodes/18.js"() {
    index15 = 18;
    component15 = async () => component_cache15 ?? (component_cache15 = (await Promise.resolve().then(() => (init_page_svelte10(), page_svelte_exports10))).default);
    imports15 = ["_app/immutable/nodes/18.D2zoIwiu.js", "_app/immutable/chunks/disclose-version.B6hs-VaT.js", "_app/immutable/chunks/runtime.BoLIClZE.js", "_app/immutable/chunks/store.BhWaJmKK.js", "_app/immutable/chunks/index.JzF151we.js", "_app/immutable/chunks/stores.Bsvbz3Mb.js", "_app/immutable/chunks/entry.uU8UwhXW.js", "_app/immutable/chunks/control.CYgJF_JY.js"];
    stylesheets15 = [];
    fonts15 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(regular)/faq/_page.svelte.js
var page_svelte_exports11 = {};
__export(page_svelte_exports11, {
  default: () => _page11
});
function _page11($$payload, $$props) {
  push(false);
  pop();
}
var init_page_svelte11 = __esm({
  ".svelte-kit/output/server/entries/pages/(regular)/faq/_page.svelte.js"() {
    init_index3();
  }
});

// .svelte-kit/output/server/nodes/19.js
var __exports16 = {};
__export(__exports16, {
  component: () => component16,
  fonts: () => fonts16,
  imports: () => imports16,
  index: () => index16,
  stylesheets: () => stylesheets16
});
var index16, component_cache16, component16, imports16, stylesheets16, fonts16;
var init__16 = __esm({
  ".svelte-kit/output/server/nodes/19.js"() {
    index16 = 19;
    component16 = async () => component_cache16 ?? (component_cache16 = (await Promise.resolve().then(() => (init_page_svelte11(), page_svelte_exports11))).default);
    imports16 = ["_app/immutable/nodes/19.Bd-tUpPQ.js", "_app/immutable/chunks/disclose-version.B6hs-VaT.js", "_app/immutable/chunks/runtime.BoLIClZE.js"];
    stylesheets16 = [];
    fonts16 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(regular)/help/_page.svelte.js
var page_svelte_exports12 = {};
__export(page_svelte_exports12, {
  default: () => _page12
});
function _page12($$payload, $$props) {
  push(false);
  pop();
}
var init_page_svelte12 = __esm({
  ".svelte-kit/output/server/entries/pages/(regular)/help/_page.svelte.js"() {
    init_index3();
  }
});

// .svelte-kit/output/server/nodes/20.js
var __exports17 = {};
__export(__exports17, {
  component: () => component17,
  fonts: () => fonts17,
  imports: () => imports17,
  index: () => index17,
  stylesheets: () => stylesheets17
});
var index17, component_cache17, component17, imports17, stylesheets17, fonts17;
var init__17 = __esm({
  ".svelte-kit/output/server/nodes/20.js"() {
    index17 = 20;
    component17 = async () => component_cache17 ?? (component_cache17 = (await Promise.resolve().then(() => (init_page_svelte12(), page_svelte_exports12))).default);
    imports17 = ["_app/immutable/nodes/20.Bd-tUpPQ.js", "_app/immutable/chunks/disclose-version.B6hs-VaT.js", "_app/immutable/chunks/runtime.BoLIClZE.js"];
    stylesheets17 = [];
    fonts17 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(regular)/privacy/_page.svelte.js
var page_svelte_exports13 = {};
__export(page_svelte_exports13, {
  default: () => _page13
});
function _page13($$payload, $$props) {
  push(false);
  pop();
}
var init_page_svelte13 = __esm({
  ".svelte-kit/output/server/entries/pages/(regular)/privacy/_page.svelte.js"() {
    init_index3();
  }
});

// .svelte-kit/output/server/nodes/21.js
var __exports18 = {};
__export(__exports18, {
  component: () => component18,
  fonts: () => fonts18,
  imports: () => imports18,
  index: () => index18,
  stylesheets: () => stylesheets18
});
var index18, component_cache18, component18, imports18, stylesheets18, fonts18;
var init__18 = __esm({
  ".svelte-kit/output/server/nodes/21.js"() {
    index18 = 21;
    component18 = async () => component_cache18 ?? (component_cache18 = (await Promise.resolve().then(() => (init_page_svelte13(), page_svelte_exports13))).default);
    imports18 = ["_app/immutable/nodes/21.Bd-tUpPQ.js", "_app/immutable/chunks/disclose-version.B6hs-VaT.js", "_app/immutable/chunks/runtime.BoLIClZE.js"];
    stylesheets18 = [];
    fonts18 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(regular)/service/_id_/_page.svelte.js
var page_svelte_exports14 = {};
__export(page_svelte_exports14, {
  default: () => _page14
});
function _page14($$payload, $$props) {
  push(false);
  var $$store_subs;
  store_get($$store_subs ?? ($$store_subs = {}), "$page", page).params.id;
  $$payload.out += `<div class="w-full h-screen mx-auto flex flex-col lg:flex-row pt-8"><div class="w-full lg:w-7/10 border-black border flex flex-col place-items-center"><h2 class="text-white text-2xl pb-2">Service Name</h2> <video class="w-1/2" controls><source src="https://static.videezy.com/system/resources/previews/000/004/862/original/Flare_Logo_Reveal_Animation.mp4" type="video/mp4"> Your browser does not support the video tag.</video></div> <div class="w-full lg:w-3/10 border-red-800 border flex flex-col place-items-center"><section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800"><h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Register on Service</h2> <form><div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2"><div><label class="text-gray-700 dark:text-gray-200" for="username">Username</label> <input id="username" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></div> <div><label class="text-gray-700 dark:text-gray-200" for="emailAddress">Email Address</label> <input id="emailAddress" type="email" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></div> <div><label class="text-gray-700 dark:text-gray-200" for="password">Password</label> <input id="password" type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></div> <div><label class="text-gray-700 dark:text-gray-200" for="passwordConfirmation">Password Confirmation</label> <input id="passwordConfirmation" type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"></div></div> <div class="flex justify-end mt-6"><button class="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Save</button></div></form></section></div></div>`;
  if ($$store_subs)
    unsubscribe_stores($$store_subs);
  pop();
}
var init_page_svelte14 = __esm({
  ".svelte-kit/output/server/entries/pages/(regular)/service/_id_/_page.svelte.js"() {
    init_index3();
    init_stores();
  }
});

// .svelte-kit/output/server/nodes/22.js
var __exports19 = {};
__export(__exports19, {
  component: () => component19,
  fonts: () => fonts19,
  imports: () => imports19,
  index: () => index19,
  stylesheets: () => stylesheets19
});
var index19, component_cache19, component19, imports19, stylesheets19, fonts19;
var init__19 = __esm({
  ".svelte-kit/output/server/nodes/22.js"() {
    index19 = 22;
    component19 = async () => component_cache19 ?? (component_cache19 = (await Promise.resolve().then(() => (init_page_svelte14(), page_svelte_exports14))).default);
    imports19 = ["_app/immutable/nodes/22.CMdoMbF-.js", "_app/immutable/chunks/disclose-version.B6hs-VaT.js", "_app/immutable/chunks/runtime.BoLIClZE.js", "_app/immutable/chunks/store.BhWaJmKK.js", "_app/immutable/chunks/index.JzF151we.js", "_app/immutable/chunks/stores.Bsvbz3Mb.js", "_app/immutable/chunks/entry.uU8UwhXW.js", "_app/immutable/chunks/control.CYgJF_JY.js"];
    stylesheets19 = [];
    fonts19 = [];
  }
});

// .svelte-kit/output/server/entries/pages/(regular)/terms/_page.svelte.js
var page_svelte_exports15 = {};
__export(page_svelte_exports15, {
  default: () => _page15
});
function _page15($$payload, $$props) {
  push(false);
  pop();
}
var init_page_svelte15 = __esm({
  ".svelte-kit/output/server/entries/pages/(regular)/terms/_page.svelte.js"() {
    init_index3();
  }
});

// .svelte-kit/output/server/nodes/23.js
var __exports20 = {};
__export(__exports20, {
  component: () => component20,
  fonts: () => fonts20,
  imports: () => imports20,
  index: () => index20,
  stylesheets: () => stylesheets20
});
var index20, component_cache20, component20, imports20, stylesheets20, fonts20;
var init__20 = __esm({
  ".svelte-kit/output/server/nodes/23.js"() {
    index20 = 23;
    component20 = async () => component_cache20 ?? (component_cache20 = (await Promise.resolve().then(() => (init_page_svelte15(), page_svelte_exports15))).default);
    imports20 = ["_app/immutable/nodes/23.Bd-tUpPQ.js", "_app/immutable/chunks/disclose-version.B6hs-VaT.js", "_app/immutable/chunks/runtime.BoLIClZE.js"];
    stylesheets20 = [];
    fonts20 = [];
  }
});

// .svelte-kit/output/server/entries/endpoints/(protected)/admin/logout/_server.ts.js
var server_ts_exports = {};
__export(server_ts_exports, {
  POST: () => POST
});
var POST;
var init_server_ts = __esm({
  ".svelte-kit/output/server/entries/endpoints/(protected)/admin/logout/_server.ts.js"() {
    init_chunks();
    POST = async (event) => {
      const { locals: { supabase } } = event;
      const userFetch = await supabase.auth.getUser();
      if (!userFetch.data.user)
        ;
      const { error } = await supabase.auth.signOut();
      if (error)
        ;
      else {
        redirect(303, "/");
      }
    };
  }
});

// .svelte-kit/output/server/chunks/first-post.js
function First_post_md($$payload, $$props) {
  push(false);
  const anchor = create_anchor($$payload);
  $$payload.out += `<h2 id="markdown">Markdown</h2> <p>Hey friends! \u{1F44B}</p> ${anchor}<pre class="shiki poimandres" style="background-color:#1b1e28;color:#a6accd" tabindex="0"><code><span class="line"><span style="color:#91B4D5">function</span><span style="color:#ADD7FF"> greet</span><span style="color:#A6ACCD">(</span><span style="color:#E4F0FB">name</span><span style="color:#91B4D5">:</span><span style="color:#A6ACCDC0"> string</span><span style="color:#A6ACCD">) &#123;</span></span>
<span class="line"><span style="color:#E4F0FB">	console</span><span style="color:#A6ACCD">.</span><span style="color:#E4F0FBD0">log</span><span style="color:#A6ACCD">(</span><span style="color:#A6ACCD">&#96;</span><span style="color:#5DE4C7">Hey </span><span style="color:#A6ACCD">$&#123;</span><span style="color:#E4F0FB">name</span><span style="color:#A6ACCD">&#125;</span><span style="color:#5DE4C7">! \u{1F44B}</span><span style="color:#A6ACCD">&#96;</span><span style="color:#A6ACCD">)</span></span>
<span class="line"><span style="color:#A6ACCD">&#125;</span></span>
<span class="line"></span></code></pre>${anchor}`;
  pop();
}
var metadata, __vite_glob_0_0;
var init_first_post = __esm({
  ".svelte-kit/output/server/chunks/first-post.js"() {
    init_index3();
    metadata = {
      "title": "First post",
      "description": "First post.",
      "date": "2023-4-14",
      "categories": ["sveltekit", "svelte"],
      "published": true
    };
    __vite_glob_0_0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: First_post_md,
      metadata
    }, Symbol.toStringTag, { value: "Module" }));
  }
});

// .svelte-kit/output/server/chunks/second-post.js
function Second_post_md($$payload, $$props) {
  push(false);
  $$payload.out += `<h2 id="svelte">Svelte</h2> <p>Media inside the <strong>static</strong> folder is served from <code>/</code>.</p>`;
  pop();
}
var metadata2, __vite_glob_0_1;
var init_second_post = __esm({
  ".svelte-kit/output/server/chunks/second-post.js"() {
    init_index3();
    metadata2 = {
      "title": "Second",
      "description": "Second post.",
      "date": "2023-4-16",
      "categories": ["sveltekit", "svelte"],
      "published": true
    };
    __vite_glob_0_1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
      __proto__: null,
      default: Second_post_md,
      metadata: metadata2
    }, Symbol.toStringTag, { value: "Module" }));
  }
});

// .svelte-kit/output/server/chunks/posts.js
async function getPosts() {
  let posts = [];
  const paths = /* @__PURE__ */ Object.assign({ "/src/posts/first-post.md": __vite_glob_0_0, "/src/posts/second-post.md": __vite_glob_0_1 });
  for (const path in paths) {
    const file = paths[path];
    const slug = path.split("/").at(-1)?.replace(".md", "");
    if (file && typeof file === "object" && "metadata" in file && slug) {
      const metadata3 = file.metadata;
      const post2 = { ...metadata3, slug };
      post2.published && posts.push(post2);
    }
  }
  posts = posts.sort(
    (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
  );
  return posts;
}
async function getPostsData() {
  const posts = await getPosts();
  return posts.map((post2) => ({
    title: post2.title,
    description: post2.description,
    slug: post2.slug,
    date: new Date(post2.date).toUTCString()
  }));
}
var init_posts = __esm({
  ".svelte-kit/output/server/chunks/posts.js"() {
    init_first_post();
    init_second_post();
  }
});

// .svelte-kit/output/server/entries/endpoints/(blog)/blog/api/posts/_server.ts.js
var server_ts_exports2 = {};
__export(server_ts_exports2, {
  GET: () => GET
});
async function GET() {
  const posts = await getPostsData();
  return json(posts);
}
var init_server_ts2 = __esm({
  ".svelte-kit/output/server/entries/endpoints/(blog)/blog/api/posts/_server.ts.js"() {
    init_chunks();
    init_posts();
  }
});

// .svelte-kit/output/server/chunks/internal.js
init_index3();
var base = "";
var assets = base;
var initial = { base, assets };
function override(paths) {
  base = paths.base;
  assets = paths.assets;
}
function reset() {
  base = initial.base;
  assets = initial.assets;
}
var public_env = {};
var safe_public_env = {};
function set_private_env(environment) {
}
function set_public_env(environment) {
  public_env = environment;
}
function set_safe_public_env(environment) {
  safe_public_env = environment;
}
function push_reference(target_signal, ref_signal) {
  const references = target_signal.r;
  if (references === null) {
    target_signal.r = [ref_signal];
  } else {
    references.push(ref_signal);
  }
}
function internal_create_effect(type, fn, sync, block, schedule) {
  const signal = {
    b: block,
    c: null,
    d: null,
    e: null,
    f: type | DIRTY,
    l: 0,
    i: fn,
    r: null,
    v: null,
    w: 0,
    x: current_component_context,
    y: null
  };
  if (current_effect !== null) {
    signal.l = current_effect.l + 1;
    if ((type & MANAGED) === 0) {
      push_reference(current_effect, signal);
    }
  }
  if (schedule) {
    schedule_effect(signal, sync);
  }
  return signal;
}
function effect_active() {
  return current_effect ? (current_effect.f & MANAGED) === 0 : false;
}
function render_effect(fn, block = current_block, managed = false, sync = true) {
  let flags = RENDER_EFFECT;
  if (managed) {
    flags |= MANAGED;
  }
  return internal_create_effect(
    flags,
    /** @type {any} */
    fn,
    sync,
    block,
    true
  );
}
function default_equals(a2, b) {
  return a2 === b;
}
function safe_not_equal(a2, b) {
  return a2 != a2 ? (
    // eslint-disable-next-line eqeqeq
    b == b
  ) : a2 !== b || a2 !== null && typeof a2 === "object" || typeof a2 === "function";
}
function safe_equal(a2, b) {
  return !safe_not_equal(a2, b);
}
// @__NO_SIDE_EFFECTS__
function source(initial_value) {
  const signal = {
    c: null,
    e: default_equals,
    f: SOURCE | CLEAN,
    v: initial_value,
    w: 0
  };
  return signal;
}
// @__NO_SIDE_EFFECTS__
function mutable_source(initial_value) {
  var _a;
  const s2 = /* @__PURE__ */ source(initial_value);
  s2.e = safe_equal;
  if (current_component_context) {
    ((_a = current_component_context).d ?? (_a.d = [])).push(s2);
  }
  return s2;
}
function set(signal, value) {
  if (!current_untracking && !ignore_mutation_validation && current_consumer !== null && is_runes(null) && (current_consumer.f & DERIVED) !== 0) {
    throw new Error(
      "ERR_SVELTE_UNSAFE_MUTATION"
    );
  }
  if ((signal.f & SOURCE) !== 0 && !/** @type {import('#client').EqualsFunctions} */
  signal.e(value, signal.v)) {
    signal.v = value;
    signal.w++;
    if (is_runes(null) && !ignore_mutation_validation && current_effect !== null && current_effect.c === null && (current_effect.f & CLEAN) !== 0 && (current_effect.f & MANAGED) === 0) {
      if (current_dependencies !== null && current_dependencies.includes(signal)) {
        set_signal_status(current_effect, DIRTY);
        schedule_effect(current_effect, false);
      } else {
        if (current_untracked_writes === null) {
          set_current_untracked_writes([signal]);
        } else {
          current_untracked_writes.push(signal);
        }
      }
    }
    mark_signal_consumers(signal, DIRTY, true);
  }
  return value;
}
function proxy(value, immutable = true, owners) {
  if (typeof value === "object" && value != null && !is_frozen(value)) {
    if (STATE_SYMBOL in value) {
      const metadata3 = (
        /** @type {import('./types.js').ProxyMetadata<T>} */
        value[STATE_SYMBOL]
      );
      if (metadata3.t === value || metadata3.p === value) {
        return metadata3.p;
      }
    }
    const prototype = get_prototype_of(value);
    if (prototype === object_prototype || prototype === array_prototype) {
      const proxy2 = new Proxy(value, state_proxy_handler);
      define_property(value, STATE_SYMBOL, {
        value: (
          /** @type {import('./types.js').ProxyMetadata} */
          {
            s: /* @__PURE__ */ new Map(),
            v: /* @__PURE__ */ source(0),
            a: is_array(value),
            i: immutable,
            p: proxy2,
            t: value
          }
        ),
        writable: true,
        enumerable: false
      });
      return proxy2;
    }
  }
  return value;
}
function update_version(signal, d = 1) {
  const value = untrack(() => get(signal));
  set(signal, value + d);
}
var state_proxy_handler = {
  defineProperty(target, prop, descriptor) {
    if (descriptor.value) {
      const metadata3 = target[STATE_SYMBOL];
      const s2 = metadata3.s.get(prop);
      if (s2 !== void 0)
        set(s2, proxy(descriptor.value, metadata3.i, metadata3.o));
    }
    return Reflect.defineProperty(target, prop, descriptor);
  },
  deleteProperty(target, prop) {
    const metadata3 = target[STATE_SYMBOL];
    const s2 = metadata3.s.get(prop);
    const is_array2 = metadata3.a;
    const boolean = delete target[prop];
    if (is_array2 && boolean) {
      const ls = metadata3.s.get("length");
      const length = target.length - 1;
      if (ls !== void 0 && ls.v !== length) {
        set(ls, length);
      }
    }
    if (s2 !== void 0)
      set(s2, UNINITIALIZED);
    if (boolean) {
      update_version(metadata3.v);
    }
    return boolean;
  },
  get(target, prop, receiver) {
    if (prop === STATE_SYMBOL) {
      return Reflect.get(target, STATE_SYMBOL);
    }
    const metadata3 = target[STATE_SYMBOL];
    let s2 = metadata3.s.get(prop);
    if (s2 === void 0 && (effect_active() || updating_derived) && (!(prop in target) || get_descriptor(target, prop)?.writable)) {
      s2 = (metadata3.i ? source : mutable_source)(proxy(target[prop], metadata3.i, metadata3.o));
      metadata3.s.set(prop, s2);
    }
    if (s2 !== void 0) {
      const value = get(s2);
      return value === UNINITIALIZED ? void 0 : value;
    }
    return Reflect.get(target, prop, receiver);
  },
  getOwnPropertyDescriptor(target, prop) {
    const descriptor = Reflect.getOwnPropertyDescriptor(target, prop);
    if (descriptor && "value" in descriptor) {
      const metadata3 = target[STATE_SYMBOL];
      const s2 = metadata3.s.get(prop);
      if (s2) {
        descriptor.value = get(s2);
      }
    }
    return descriptor;
  },
  has(target, prop) {
    if (prop === STATE_SYMBOL) {
      return true;
    }
    const metadata3 = target[STATE_SYMBOL];
    const has = Reflect.has(target, prop);
    let s2 = metadata3.s.get(prop);
    if (s2 !== void 0 || effect_active() && (!has || get_descriptor(target, prop)?.writable)) {
      if (s2 === void 0) {
        s2 = (metadata3.i ? source : mutable_source)(
          has ? proxy(target[prop], metadata3.i, metadata3.o) : UNINITIALIZED
        );
        metadata3.s.set(prop, s2);
      }
      const value = get(s2);
      if (value === UNINITIALIZED) {
        return false;
      }
    }
    return has;
  },
  set(target, prop, value, receiver) {
    const metadata3 = target[STATE_SYMBOL];
    let s2 = metadata3.s.get(prop);
    if (s2 === void 0 && effect_active()) {
      untrack(() => receiver[prop]);
      s2 = metadata3.s.get(prop);
    }
    if (s2 !== void 0) {
      set(s2, proxy(value, metadata3.i, metadata3.o));
    }
    const is_array2 = metadata3.a;
    const not_has = !(prop in target);
    if (is_array2 && prop === "length") {
      for (let i2 = value; i2 < target.length; i2 += 1) {
        const s22 = metadata3.s.get(i2 + "");
        if (s22 !== void 0)
          set(s22, UNINITIALIZED);
      }
    }
    target[prop] = value;
    if (not_has) {
      if (is_array2) {
        const ls = metadata3.s.get("length");
        const length = target.length;
        if (ls !== void 0 && ls.v !== length) {
          set(ls, length);
        }
      }
      update_version(metadata3.v);
    }
    return true;
  },
  ownKeys(target) {
    const metadata3 = target[STATE_SYMBOL];
    get(metadata3.v);
    return Reflect.ownKeys(target);
  }
};
var node_prototype;
var element_prototype;
var text_prototype;
function init_operations() {
  if (node_prototype !== void 0) {
    return;
  }
  node_prototype = Node.prototype;
  element_prototype = Element.prototype;
  text_prototype = Text.prototype;
  node_prototype.appendChild;
  node_prototype.cloneNode;
  element_prototype.__click = void 0;
  text_prototype.__nodeValue = " ";
  element_prototype.__className = "";
  get_descriptor(node_prototype, "firstChild").get;
  get_descriptor(node_prototype, "nextSibling").get;
  get_descriptor(node_prototype, "textContent").set;
  get_descriptor(element_prototype, "className").set;
}
function empty() {
  return document.createTextNode("");
}
function set_current_hydration_fragment(fragment) {
}
function get_hydration_fragment(node, insert_text = false) {
  const fragment = [];
  let current_node = node;
  let target_depth = null;
  while (current_node !== null) {
    const node_type = current_node.nodeType;
    const next_sibling = current_node.nextSibling;
    if (node_type === 8) {
      const data2 = (
        /** @type {Comment} */
        current_node.data
      );
      if (data2.startsWith("ssr:")) {
        const depth = data2.slice(4);
        if (target_depth === null) {
          target_depth = depth;
        } else if (depth === target_depth) {
          if (insert_text && fragment.length === 0) {
            const text2 = empty();
            fragment.push(text2);
            current_node.parentNode.insertBefore(text2, current_node);
          }
          return fragment;
        } else {
          fragment.push(
            /** @type {Text | Comment | Element} */
            current_node
          );
        }
        current_node = next_sibling;
        continue;
      }
    }
    if (target_depth !== null) {
      fragment.push(
        /** @type {Text | Comment | Element} */
        current_node
      );
    }
    current_node = next_sibling;
  }
  return null;
}
function remove2(current) {
  var first_node = current;
  if (is_array(current)) {
    var i2 = 0;
    var node;
    for (; i2 < current.length; i2++) {
      node = current[i2];
      if (i2 === 0) {
        first_node = node;
      }
      if (node.isConnected) {
        node.remove();
      }
    }
  } else if (current.isConnected) {
    current.remove();
  }
  return (
    /** @type {Element | Comment | Text} */
    first_node
  );
}
function create_root_block(intro) {
  return {
    // dom
    d: null,
    // effect
    e: null,
    // intro
    i: intro,
    // parent
    p: null,
    // transition
    r: null,
    // type
    t: ROOT_BLOCK
  };
}
var all_registerd_events = /* @__PURE__ */ new Set();
var root_event_handles = /* @__PURE__ */ new Set();
function handle_event_propagation(handler_element, event) {
  const owner_document = handler_element.ownerDocument;
  const event_name = event.type;
  const path = event.composedPath?.() || [];
  let current_target = (
    /** @type {null | Element} */
    path[0] || event.target
  );
  if (event.target !== current_target) {
    define_property(event, "target", {
      configurable: true,
      value: current_target
    });
  }
  let path_idx = 0;
  const handled_at = event.__root;
  if (handled_at) {
    const at_idx = path.indexOf(handled_at);
    if (at_idx !== -1 && (handler_element === document || handler_element === /** @type {any} */
    window)) {
      event.__root = handler_element;
      return;
    }
    const handler_idx = path.indexOf(handler_element);
    if (handler_idx === -1) {
      return;
    }
    if (at_idx <= handler_idx) {
      path_idx = at_idx + 1;
    }
  }
  current_target = /** @type {Element} */
  path[path_idx] || event.target;
  define_property(event, "currentTarget", {
    configurable: true,
    get() {
      return current_target || owner_document;
    }
  });
  while (current_target !== null) {
    const parent_element = current_target.parentNode || /** @type {any} */
    current_target.host || null;
    const internal_prop_name = "__" + event_name;
    const delegated = current_target[internal_prop_name];
    if (delegated !== void 0 && !/** @type {any} */
    current_target.disabled) {
      if (is_array(delegated)) {
        const [fn, ...data2] = delegated;
        fn.apply(current_target, [event, ...data2]);
      } else {
        delegated.call(current_target, event);
      }
    }
    if (event.cancelBubble || parent_element === handler_element || current_target === handler_element) {
      break;
    }
    current_target = parent_element;
  }
  event.__root = handler_element;
  current_target = handler_element;
}
function mount(component21, options2) {
  init_operations();
  const anchor = empty();
  options2.target.appendChild(anchor);
  return flush_sync(() => _mount(component21, { ...options2, anchor }), false);
}
function hydrate(component21, options2) {
  init_operations();
  const container = options2.target;
  const first_child = (
    /** @type {ChildNode} */
    container.firstChild
  );
  const hydration_fragment = get_hydration_fragment(first_child, true);
  let anchor = null;
  if (hydration_fragment === null) {
    anchor = empty();
    container.appendChild(anchor);
  }
  let finished_hydrating = false;
  try {
    return flush_sync(() => {
      const instance = _mount(component21, { ...options2, anchor });
      set_current_hydration_fragment(null);
      finished_hydrating = true;
      return instance;
    }, false);
  } catch (error) {
    if (!finished_hydrating && options2.recover !== false && hydration_fragment !== null) {
      console.error(
        "ERR_SVELTE_HYDRATION_MISMATCH",
        error
      );
      remove2(hydration_fragment);
      first_child.remove();
      hydration_fragment[hydration_fragment.length - 1]?.nextSibling?.remove();
      return mount(component21, options2);
    } else {
      throw error;
    }
  } finally {
  }
}
function _mount(Component, options2) {
  const registered_events = /* @__PURE__ */ new Set();
  const container = options2.target;
  const block = create_root_block(options2.intro || false);
  let component21 = void 0;
  const effect2 = render_effect(
    () => {
      if (options2.context) {
        push$1({});
        current_component_context.c = options2.context;
      }
      if (!options2.props) {
        options2.props = /** @type {Props} */
        {};
      }
      if (options2.events) {
        options2.props.$$events = options2.events;
      }
      component21 = // @ts-expect-error the public typings are not what the actual function looks like
      Component(options2.anchor, options2.props) || {};
      if (options2.context) {
        pop$1();
      }
    },
    block,
    true
  );
  block.e = effect2;
  const bound_event_listener = handle_event_propagation.bind(null, container);
  const bound_document_event_listener = handle_event_propagation.bind(null, document);
  const event_handle = (events) => {
    for (let i2 = 0; i2 < events.length; i2++) {
      const event_name = events[i2];
      if (!registered_events.has(event_name)) {
        registered_events.add(event_name);
        container.addEventListener(
          event_name,
          bound_event_listener,
          PassiveDelegatedEvents.includes(event_name) ? {
            passive: true
          } : void 0
        );
        document.addEventListener(
          event_name,
          bound_document_event_listener,
          PassiveDelegatedEvents.includes(event_name) ? {
            passive: true
          } : void 0
        );
      }
    }
  };
  event_handle(array_from(all_registerd_events));
  root_event_handles.add(event_handle);
  mounted_components.set(component21, () => {
    for (const event_name of registered_events) {
      container.removeEventListener(event_name, bound_event_listener);
    }
    root_event_handles.delete(event_handle);
    const dom = block.d;
    if (dom !== null) {
      remove2(dom);
    }
    destroy_signal(
      /** @type {import('./types.js').Effect} */
      block.e
    );
  });
  return component21;
}
var mounted_components = /* @__PURE__ */ new WeakMap();
function unmount(component21) {
  const fn = mounted_components.get(component21);
  fn?.();
}
function asClassComponent$1(component21) {
  return class extends Svelte4Component {
    /** @param {any} options */
    constructor(options2) {
      super({
        component: component21,
        ...options2
      });
    }
  };
}
var _events, _instance;
var Svelte4Component = class {
  /**
   * @param {import('../main/public.js').ComponentConstructorOptions & {
   *  component: any;
   * 	immutable?: boolean;
   * 	hydrate?: boolean;
   * 	recover?: false;
   * }} options
   */
  constructor(options2) {
    /** @type {any} */
    __privateAdd(this, _events, {});
    /** @type {Record<string, any>} */
    __privateAdd(this, _instance, void 0);
    const props = proxy({ ...options2.props || {}, $$events: __privateGet(this, _events) }, false);
    __privateSet(this, _instance, (options2.hydrate ? hydrate : mount)(options2.component, {
      target: options2.target,
      props,
      context: options2.context,
      intro: options2.intro,
      recover: options2.recover
    }));
    for (const key2 of Object.keys(__privateGet(this, _instance))) {
      define_property(this, key2, {
        get() {
          return __privateGet(this, _instance)[key2];
        },
        /** @param {any} value */
        set(value) {
          __privateGet(this, _instance)[key2] = value;
        },
        enumerable: true
      });
    }
    __privateGet(this, _instance).$set = /** @param {Record<string, any>} next */
    (next) => {
      Object.assign(props, next);
    };
    __privateGet(this, _instance).$destroy = () => {
      unmount(__privateGet(this, _instance));
    };
  }
  /** @param {Record<string, any>} props */
  $set(props) {
    __privateGet(this, _instance).$set(props);
  }
  /**
   * @param {string} event
   * @param {(...args: any[]) => any} callback
   * @returns {any}
   */
  $on(event, callback) {
    __privateGet(this, _events)[event] = __privateGet(this, _events)[event] || [];
    const cb = (...args) => callback.call(this, ...args);
    __privateGet(this, _events)[event].push(cb);
    return () => {
      __privateGet(this, _events)[event] = __privateGet(this, _events)[event].filter(
        /** @param {any} fn */
        (fn) => fn !== cb
      );
    };
  }
  $destroy() {
    __privateGet(this, _instance).$destroy();
  }
};
_events = new WeakMap();
_instance = new WeakMap();
function asClassComponent(component21) {
  const component_constructor = asClassComponent$1(component21);
  const _render = (props, { context } = {}) => {
    const result = render(component21, { props, context });
    return {
      css: { code: "", map: null },
      head: result.head,
      html: result.html
    };
  };
  component_constructor.render = _render;
  return component_constructor;
}
var prerendering = false;
function Root($$payload, $$props) {
  push(true);
  let {
    stores,
    page: page2,
    constructors,
    components = [],
    form,
    data_0 = null,
    data_1 = null,
    data_2 = null,
    data_3 = null
  } = $$props;
  {
    setContext("__svelte__", stores);
  }
  {
    stores.page.set(page2);
  }
  const anchor = create_anchor($$payload);
  const anchor_10 = create_anchor($$payload);
  $$payload.out += `${anchor}`;
  if (constructors[1]) {
    $$payload.out += "<!--ssr:if:true-->";
    const anchor_1 = create_anchor($$payload);
    $$payload.out += `${anchor_1}`;
    constructors[0]?.($$payload, {
      data: data_0,
      children: ($$payload2, $$slotProps) => {
        const anchor_2 = create_anchor($$payload2);
        $$payload2.out += `${anchor_2}`;
        if (constructors[2]) {
          $$payload2.out += "<!--ssr:if:true-->";
          const anchor_3 = create_anchor($$payload2);
          $$payload2.out += `${anchor_3}`;
          constructors[1]?.($$payload2, {
            data: data_1,
            children: ($$payload3, $$slotProps2) => {
              const anchor_4 = create_anchor($$payload3);
              $$payload3.out += `${anchor_4}`;
              if (constructors[3]) {
                $$payload3.out += "<!--ssr:if:true-->";
                const anchor_5 = create_anchor($$payload3);
                $$payload3.out += `${anchor_5}`;
                constructors[2]?.($$payload3, {
                  data: data_2,
                  children: ($$payload4, $$slotProps3) => {
                    const anchor_6 = create_anchor($$payload4);
                    $$payload4.out += `${anchor_6}`;
                    constructors[3]?.($$payload4, { data: data_3, form });
                    $$payload4.out += `${anchor_6}`;
                  }
                });
                $$payload3.out += `${anchor_5}`;
              } else {
                $$payload3.out += "<!--ssr:if:false-->";
                const anchor_7 = create_anchor($$payload3);
                $$payload3.out += `${anchor_7}`;
                constructors[2]?.($$payload3, { data: data_2, form });
                $$payload3.out += `${anchor_7}`;
              }
              $$payload3.out += `${anchor_4}`;
            }
          });
          $$payload2.out += `${anchor_3}`;
        } else {
          $$payload2.out += "<!--ssr:if:false-->";
          const anchor_8 = create_anchor($$payload2);
          $$payload2.out += `${anchor_8}`;
          constructors[1]?.($$payload2, { data: data_1, form });
          $$payload2.out += `${anchor_8}`;
        }
        $$payload2.out += `${anchor_2}`;
      }
    });
    $$payload.out += `${anchor_1}`;
  } else {
    $$payload.out += "<!--ssr:if:false-->";
    const anchor_9 = create_anchor($$payload);
    $$payload.out += `${anchor_9}`;
    constructors[0]?.($$payload, { data: data_0, form });
    $$payload.out += `${anchor_9}`;
  }
  $$payload.out += `${anchor} ${anchor_10}`;
  {
    $$payload.out += "<!--ssr:if:false-->";
  }
  $$payload.out += `${anchor_10}`;
  bind_props($$props, {
    stores,
    page: page2,
    constructors,
    components,
    form,
    data_0,
    data_1,
    data_2,
    data_3
  });
  pop();
}
var root = asClassComponent(Root);
var options = {
  app_dir: "_app",
  app_template_contains_nonce: false,
  csp: { "mode": "auto", "directives": { "upgrade-insecure-requests": false, "block-all-mixed-content": false }, "reportOnly": { "upgrade-insecure-requests": false, "block-all-mixed-content": false } },
  csrf_check_origin: true,
  embedded: false,
  env_public_prefix: "PUBLIC_",
  env_private_prefix: "",
  hooks: null,
  // added lazily, via `get_hooks`
  preload_strategy: "modulepreload",
  root,
  service_worker: false,
  templates: {
    app: ({ head: head2, body: body2, assets: assets2, nonce, env }) => '<!doctype html>\n<html lang="en">\n\n<head>\n    <meta charset="utf-8" />\n    <link rel="icon" href="' + assets2 + `/favicon.png" />
    <link rel="icon" href="https://fav.farm/\u{1F525}" />
    <link rel="alternate" type="application/atom+xml" href="/rss.xml" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <script type="module">
        const theme = localStorage.getItem('color-scheme')

        theme
            ? document.documentElement.setAttribute('color-scheme', theme)
            : localStorage.setItem('color-scheme', 'dark')
    <\/script>
    ` + head2 + '\n</head>\n\n<body data-sveltekit-preload-data="hover">\n    <div style="display: contents">' + body2 + "</div>\n</body>\n\n</html>\n",
    error: ({ status, message }) => '<!doctype html>\n<html lang="en">\n	<head>\n		<meta charset="utf-8" />\n		<title>' + message + `</title>

		<style>
			body {
				--bg: white;
				--fg: #222;
				--divider: #ccc;
				background: var(--bg);
				color: var(--fg);
				font-family:
					system-ui,
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Oxygen,
					Ubuntu,
					Cantarell,
					'Open Sans',
					'Helvetica Neue',
					sans-serif;
				display: flex;
				align-items: center;
				justify-content: center;
				height: 100vh;
				margin: 0;
			}

			.error {
				display: flex;
				align-items: center;
				max-width: 32rem;
				margin: 0 1rem;
			}

			.status {
				font-weight: 200;
				font-size: 3rem;
				line-height: 1;
				position: relative;
				top: -0.05rem;
			}

			.message {
				border-left: 1px solid var(--divider);
				padding: 0 0 0 1rem;
				margin: 0 0 0 1rem;
				min-height: 2.5rem;
				display: flex;
				align-items: center;
			}

			.message h1 {
				font-weight: 400;
				font-size: 1em;
				margin: 0;
			}

			@media (prefers-color-scheme: dark) {
				body {
					--bg: #222;
					--fg: #ddd;
					--divider: #666;
				}
			}
		</style>
	</head>
	<body>
		<div class="error">
			<span class="status">` + status + '</span>\n			<div class="message">\n				<h1>' + message + "</h1>\n			</div>\n		</div>\n	</body>\n</html>\n"
  },
  version_hash: "1jbfnao"
};
async function get_hooks() {
  return {
    ...await Promise.resolve().then(() => (init_hooks_server(), hooks_server_exports))
  };
}

// .svelte-kit/output/server/index.js
init_chunks();
init_exports();
init_devalue();
init_index2();
var import_cookie3 = __toESM(require_cookie2(), 1);
var set_cookie_parser = __toESM(require_set_cookie(), 1);
var DEV = false;
var SVELTE_KIT_ASSETS = "/_svelte_kit_assets";
var ENDPOINT_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"];
var PAGE_METHODS = ["GET", "POST", "HEAD"];
function negotiate(accept, types) {
  const parts = [];
  accept.split(",").forEach((str, i2) => {
    const match = /([^/]+)\/([^;]+)(?:;q=([0-9.]+))?/.exec(str);
    if (match) {
      const [, type, subtype, q2 = "1"] = match;
      parts.push({ type, subtype, q: +q2, i: i2 });
    }
  });
  parts.sort((a2, b) => {
    if (a2.q !== b.q) {
      return b.q - a2.q;
    }
    if (a2.subtype === "*" !== (b.subtype === "*")) {
      return a2.subtype === "*" ? 1 : -1;
    }
    if (a2.type === "*" !== (b.type === "*")) {
      return a2.type === "*" ? 1 : -1;
    }
    return a2.i - b.i;
  });
  let accepted;
  let min_priority = Infinity;
  for (const mimetype of types) {
    const [type, subtype] = mimetype.split("/");
    const priority = parts.findIndex(
      (part) => (part.type === type || part.type === "*") && (part.subtype === subtype || part.subtype === "*")
    );
    if (priority !== -1 && priority < min_priority) {
      accepted = mimetype;
      min_priority = priority;
    }
  }
  return accepted;
}
function is_content_type(request, ...types) {
  const type = request.headers.get("content-type")?.split(";", 1)[0].trim() ?? "";
  return types.includes(type.toLowerCase());
}
function is_form_content_type(request) {
  return is_content_type(
    request,
    "application/x-www-form-urlencoded",
    "multipart/form-data",
    "text/plain"
  );
}
function coalesce_to_error(err) {
  return err instanceof Error || err && /** @type {any} */
  err.name && /** @type {any} */
  err.message ? (
    /** @type {Error} */
    err
  ) : new Error(JSON.stringify(err));
}
function normalize_error(error) {
  return (
    /** @type {import('../runtime/control.js').Redirect | HttpError | SvelteKitError | Error} */
    error
  );
}
function get_status(error) {
  return error instanceof HttpError || error instanceof SvelteKitError ? error.status : 500;
}
function get_message(error) {
  return error instanceof SvelteKitError ? error.text : "Internal Error";
}
function method_not_allowed(mod, method) {
  return text(`${method} method not allowed`, {
    status: 405,
    headers: {
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: allowed_methods(mod).join(", ")
    }
  });
}
function allowed_methods(mod) {
  const allowed = ENDPOINT_METHODS.filter((method) => method in mod);
  if ("GET" in mod || "HEAD" in mod)
    allowed.push("HEAD");
  return allowed;
}
function static_error_page(options2, status, message) {
  let page2 = options2.templates.error({ status, message });
  return text(page2, {
    headers: { "content-type": "text/html; charset=utf-8" },
    status
  });
}
async function handle_fatal_error(event, options2, error) {
  error = error instanceof HttpError ? error : coalesce_to_error(error);
  const status = get_status(error);
  const body2 = await handle_error_and_jsonify(event, options2, error);
  const type = negotiate(event.request.headers.get("accept") || "text/html", [
    "application/json",
    "text/html"
  ]);
  if (event.isDataRequest || type === "application/json") {
    return json(body2, {
      status
    });
  }
  return static_error_page(options2, status, body2.message);
}
async function handle_error_and_jsonify(event, options2, error) {
  if (error instanceof HttpError) {
    return error.body;
  }
  const status = get_status(error);
  const message = get_message(error);
  return await options2.hooks.handleError({ error, event, status, message }) ?? { message };
}
function redirect_response(status, location) {
  const response = new Response(void 0, {
    status,
    headers: { location }
  });
  return response;
}
function clarify_devalue_error(event, error) {
  if (error.path) {
    return `Data returned from \`load\` while rendering ${event.route.id} is not serializable: ${error.message} (data${error.path})`;
  }
  if (error.path === "") {
    return `Data returned from \`load\` while rendering ${event.route.id} is not a plain object`;
  }
  return error.message;
}
function stringify_uses(node) {
  const uses = [];
  if (node.uses && node.uses.dependencies.size > 0) {
    uses.push(`"dependencies":${JSON.stringify(Array.from(node.uses.dependencies))}`);
  }
  if (node.uses && node.uses.search_params.size > 0) {
    uses.push(`"search_params":${JSON.stringify(Array.from(node.uses.search_params))}`);
  }
  if (node.uses && node.uses.params.size > 0) {
    uses.push(`"params":${JSON.stringify(Array.from(node.uses.params))}`);
  }
  if (node.uses?.parent)
    uses.push('"parent":1');
  if (node.uses?.route)
    uses.push('"route":1');
  if (node.uses?.url)
    uses.push('"url":1');
  return `"uses":{${uses.join(",")}}`;
}
async function render_endpoint(event, mod, state) {
  const method = (
    /** @type {import('types').HttpMethod} */
    event.request.method
  );
  let handler2 = mod[method] || mod.fallback;
  if (method === "HEAD" && mod.GET && !mod.HEAD) {
    handler2 = mod.GET;
  }
  if (!handler2) {
    return method_not_allowed(mod, method);
  }
  const prerender = mod.prerender ?? state.prerender_default;
  if (prerender && (mod.POST || mod.PATCH || mod.PUT || mod.DELETE)) {
    throw new Error("Cannot prerender endpoints that have mutative methods");
  }
  if (state.prerendering && !prerender) {
    if (state.depth > 0) {
      throw new Error(`${event.route.id} is not prerenderable`);
    } else {
      return new Response(void 0, { status: 204 });
    }
  }
  try {
    let response = await handler2(
      /** @type {import('@sveltejs/kit').RequestEvent<Record<string, any>>} */
      event
    );
    if (!(response instanceof Response)) {
      throw new Error(
        `Invalid response from route ${event.url.pathname}: handler should return a Response object`
      );
    }
    if (state.prerendering) {
      response = new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: new Headers(response.headers)
      });
      response.headers.set("x-sveltekit-prerender", String(prerender));
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      return new Response(void 0, {
        status: e.status,
        headers: { location: e.location }
      });
    }
    throw e;
  }
}
function is_endpoint_request(event) {
  const { method, headers: headers2 } = event.request;
  if (ENDPOINT_METHODS.includes(method) && !PAGE_METHODS.includes(method)) {
    return true;
  }
  if (method === "POST" && headers2.get("x-sveltekit-action") === "true")
    return false;
  const accept = event.request.headers.get("accept") ?? "*/*";
  return negotiate(accept, ["*", "text/html"]) !== "text/html";
}
function compact(arr) {
  return arr.filter(
    /** @returns {val is NonNullable<T>} */
    (val) => val != null
  );
}
function is_action_json_request(event) {
  const accept = negotiate(event.request.headers.get("accept") ?? "*/*", [
    "application/json",
    "text/html"
  ]);
  return accept === "application/json" && event.request.method === "POST";
}
async function handle_action_json_request(event, options2, server2) {
  const actions2 = server2?.actions;
  if (!actions2) {
    const no_actions_error = new SvelteKitError(
      405,
      "Method Not Allowed",
      "POST method not allowed. No actions exist for this page"
    );
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, no_actions_error)
      },
      {
        status: no_actions_error.status,
        headers: {
          // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
          // "The server must generate an Allow header field in a 405 status code response"
          allow: "GET"
        }
      }
    );
  }
  check_named_default_separate(actions2);
  try {
    const data2 = await call_action(event, actions2);
    if (false)
      ;
    if (data2 instanceof ActionFailure) {
      return action_json({
        type: "failure",
        status: data2.status,
        // @ts-expect-error we assign a string to what is supposed to be an object. That's ok
        // because we don't use the object outside, and this way we have better code navigation
        // through knowing where the related interface is used.
        data: stringify_action_response(
          data2.data,
          /** @type {string} */
          event.route.id
        )
      });
    } else {
      return action_json({
        type: "success",
        status: data2 ? 200 : 204,
        // @ts-expect-error see comment above
        data: stringify_action_response(
          data2,
          /** @type {string} */
          event.route.id
        )
      });
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return action_json_redirect(err);
    }
    return action_json(
      {
        type: "error",
        error: await handle_error_and_jsonify(event, options2, check_incorrect_fail_use(err))
      },
      {
        status: get_status(err)
      }
    );
  }
}
function check_incorrect_fail_use(error) {
  return error instanceof ActionFailure ? new Error('Cannot "throw fail()". Use "return fail()"') : error;
}
function action_json_redirect(redirect2) {
  return action_json({
    type: "redirect",
    status: redirect2.status,
    location: redirect2.location
  });
}
function action_json(data2, init2) {
  return json(data2, init2);
}
function is_action_request(event) {
  return event.request.method === "POST";
}
async function handle_action_request(event, server2) {
  const actions2 = server2?.actions;
  if (!actions2) {
    event.setHeaders({
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/405
      // "The server must generate an Allow header field in a 405 status code response"
      allow: "GET"
    });
    return {
      type: "error",
      error: new SvelteKitError(
        405,
        "Method Not Allowed",
        "POST method not allowed. No actions exist for this page"
      )
    };
  }
  check_named_default_separate(actions2);
  try {
    const data2 = await call_action(event, actions2);
    if (false)
      ;
    if (data2 instanceof ActionFailure) {
      return {
        type: "failure",
        status: data2.status,
        data: data2.data
      };
    } else {
      return {
        type: "success",
        status: 200,
        // @ts-expect-error this will be removed upon serialization, so `undefined` is the same as omission
        data: data2
      };
    }
  } catch (e) {
    const err = normalize_error(e);
    if (err instanceof Redirect) {
      return {
        type: "redirect",
        status: err.status,
        location: err.location
      };
    }
    return {
      type: "error",
      error: check_incorrect_fail_use(err)
    };
  }
}
function check_named_default_separate(actions2) {
  if (actions2.default && Object.keys(actions2).length > 1) {
    throw new Error(
      "When using named actions, the default action cannot be used. See the docs for more info: https://kit.svelte.dev/docs/form-actions#named-actions"
    );
  }
}
async function call_action(event, actions2) {
  const url = new URL(event.request.url);
  let name = "default";
  for (const param of url.searchParams) {
    if (param[0].startsWith("/")) {
      name = param[0].slice(1);
      if (name === "default") {
        throw new Error('Cannot use reserved action name "default"');
      }
      break;
    }
  }
  const action = actions2[name];
  if (!action) {
    throw new SvelteKitError(404, "Not Found", `No action with name '${name}' found`);
  }
  if (!is_form_content_type(event.request)) {
    throw new SvelteKitError(
      415,
      "Unsupported Media Type",
      `Form actions expect form-encoded data \u2014 received ${event.request.headers.get(
        "content-type"
      )}`
    );
  }
  return action(event);
}
function uneval_action_response(data2, route_id) {
  return try_deserialize(data2, uneval, route_id);
}
function stringify_action_response(data2, route_id) {
  return try_deserialize(data2, stringify2, route_id);
}
function try_deserialize(data2, fn, route_id) {
  try {
    return fn(data2);
  } catch (e) {
    const error = (
      /** @type {any} */
      e
    );
    if ("path" in error) {
      let message = `Data returned from action inside ${route_id} is not serializable: ${error.message}`;
      if (error.path !== "")
        message += ` (data.${error.path})`;
      throw new Error(message);
    }
    throw error;
  }
}
var INVALIDATED_PARAM = "x-sveltekit-invalidated";
var TRAILING_SLASH_PARAM = "x-sveltekit-trailing-slash";
function b64_encode(buffer) {
  if (globalThis.Buffer) {
    return Buffer.from(buffer).toString("base64");
  }
  const little_endian = new Uint8Array(new Uint16Array([1]).buffer)[0] > 0;
  return btoa(
    new TextDecoder(little_endian ? "utf-16le" : "utf-16be").decode(
      new Uint16Array(new Uint8Array(buffer))
    )
  );
}
async function load_server_data({ event, state, node, parent }) {
  if (!node?.server)
    return null;
  let is_tracking = true;
  const uses = {
    dependencies: /* @__PURE__ */ new Set(),
    params: /* @__PURE__ */ new Set(),
    parent: false,
    route: false,
    url: false,
    search_params: /* @__PURE__ */ new Set()
  };
  const url = make_trackable(
    event.url,
    () => {
      if (is_tracking) {
        uses.url = true;
      }
    },
    (param) => {
      if (is_tracking) {
        uses.search_params.add(param);
      }
    }
  );
  if (state.prerendering) {
    disable_search(url);
  }
  const result = await node.server.load?.call(null, {
    ...event,
    fetch: (info, init2) => {
      new URL(info instanceof Request ? info.url : info, event.url);
      return event.fetch(info, init2);
    },
    /** @param {string[]} deps */
    depends: (...deps) => {
      for (const dep of deps) {
        const { href } = new URL(dep, event.url);
        uses.dependencies.add(href);
      }
    },
    params: new Proxy(event.params, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.params.add(key2);
        }
        return target[
          /** @type {string} */
          key2
        ];
      }
    }),
    parent: async () => {
      if (is_tracking) {
        uses.parent = true;
      }
      return parent();
    },
    route: new Proxy(event.route, {
      get: (target, key2) => {
        if (is_tracking) {
          uses.route = true;
        }
        return target[
          /** @type {'id'} */
          key2
        ];
      }
    }),
    url,
    untrack(fn) {
      is_tracking = false;
      try {
        return fn();
      } finally {
        is_tracking = true;
      }
    }
  });
  return {
    type: "data",
    data: result ?? null,
    uses,
    slash: node.server.trailingSlash
  };
}
async function load_data({
  event,
  fetched,
  node,
  parent,
  server_data_promise,
  state,
  resolve_opts,
  csr
}) {
  const server_data_node = await server_data_promise;
  if (!node?.universal?.load) {
    return server_data_node?.data ?? null;
  }
  const result = await node.universal.load.call(null, {
    url: event.url,
    params: event.params,
    data: server_data_node?.data ?? null,
    route: event.route,
    fetch: create_universal_fetch(event, state, fetched, csr, resolve_opts),
    setHeaders: event.setHeaders,
    depends: () => {
    },
    parent,
    untrack: (fn) => fn()
  });
  return result ?? null;
}
function create_universal_fetch(event, state, fetched, csr, resolve_opts) {
  const universal_fetch = async (input, init2) => {
    const cloned_body = input instanceof Request && input.body ? input.clone().body : null;
    const cloned_headers = input instanceof Request && [...input.headers].length ? new Headers(input.headers) : init2?.headers;
    let response = await event.fetch(input, init2);
    const url = new URL(input instanceof Request ? input.url : input, event.url);
    const same_origin = url.origin === event.url.origin;
    let dependency;
    if (same_origin) {
      if (state.prerendering) {
        dependency = { response, body: null };
        state.prerendering.dependencies.set(url.pathname, dependency);
      }
    } else {
      const mode = input instanceof Request ? input.mode : init2?.mode ?? "cors";
      if (mode === "no-cors") {
        response = new Response("", {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers
        });
      } else {
        const acao = response.headers.get("access-control-allow-origin");
        if (!acao || acao !== event.url.origin && acao !== "*") {
          throw new Error(
            `CORS error: ${acao ? "Incorrect" : "No"} 'Access-Control-Allow-Origin' header is present on the requested resource`
          );
        }
      }
    }
    const proxy2 = new Proxy(response, {
      get(response2, key2, _receiver) {
        async function push_fetched(body2, is_b64) {
          const status_number = Number(response2.status);
          if (isNaN(status_number)) {
            throw new Error(
              `response.status is not a number. value: "${response2.status}" type: ${typeof response2.status}`
            );
          }
          fetched.push({
            url: same_origin ? url.href.slice(event.url.origin.length) : url.href,
            method: event.request.method,
            request_body: (
              /** @type {string | ArrayBufferView | undefined} */
              input instanceof Request && cloned_body ? await stream_to_string(cloned_body) : init2?.body
            ),
            request_headers: cloned_headers,
            response_body: body2,
            response: response2,
            is_b64
          });
        }
        if (key2 === "arrayBuffer") {
          return async () => {
            const buffer = await response2.arrayBuffer();
            if (dependency) {
              dependency.body = new Uint8Array(buffer);
            }
            if (buffer instanceof ArrayBuffer) {
              await push_fetched(b64_encode(buffer), true);
            }
            return buffer;
          };
        }
        async function text2() {
          const body2 = await response2.text();
          if (!body2 || typeof body2 === "string") {
            await push_fetched(body2, false);
          }
          if (dependency) {
            dependency.body = body2;
          }
          return body2;
        }
        if (key2 === "text") {
          return text2;
        }
        if (key2 === "json") {
          return async () => {
            return JSON.parse(await text2());
          };
        }
        return Reflect.get(response2, key2, response2);
      }
    });
    if (csr) {
      const get4 = response.headers.get;
      response.headers.get = (key2) => {
        const lower = key2.toLowerCase();
        const value = get4.call(response.headers, lower);
        if (value && !lower.startsWith("x-sveltekit-")) {
          const included = resolve_opts.filterSerializedResponseHeaders(lower, value);
          if (!included) {
            throw new Error(
              `Failed to get response header "${lower}" \u2014 it must be included by the \`filterSerializedResponseHeaders\` option: https://kit.svelte.dev/docs/hooks#server-hooks-handle (at ${event.route.id})`
            );
          }
        }
        return value;
      };
    }
    return proxy2;
  };
  return (input, init2) => {
    const response = universal_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
async function stream_to_string(stream) {
  let result = "";
  const reader = stream.getReader();
  const decoder = new TextDecoder();
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    result += decoder.decode(value);
  }
  return result;
}
function hash(...values) {
  let hash2 = 5381;
  for (const value of values) {
    if (typeof value === "string") {
      let i2 = value.length;
      while (i2)
        hash2 = hash2 * 33 ^ value.charCodeAt(--i2);
    } else if (ArrayBuffer.isView(value)) {
      const buffer = new Uint8Array(value.buffer, value.byteOffset, value.byteLength);
      let i2 = buffer.length;
      while (i2)
        hash2 = hash2 * 33 ^ buffer[--i2];
    } else {
      throw new TypeError("value must be a string or TypedArray");
    }
  }
  return (hash2 >>> 0).toString(36);
}
var escape_html_attr_dict = {
  "&": "&amp;",
  '"': "&quot;"
};
var escape_html_attr_regex = new RegExp(
  // special characters
  `[${Object.keys(escape_html_attr_dict).join("")}]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|[\\ud800-\\udbff][\\udc00-\\udfff]|[\\udc00-\\udfff]`,
  "g"
);
function escape_html_attr(str) {
  const escaped_str = str.replace(escape_html_attr_regex, (match) => {
    if (match.length === 2) {
      return match;
    }
    return escape_html_attr_dict[match] ?? `&#${match.charCodeAt(0)};`;
  });
  return `"${escaped_str}"`;
}
var replacements = {
  "<": "\\u003C",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};
var pattern = new RegExp(`[${Object.keys(replacements).join("")}]`, "g");
function serialize_data(fetched, filter, prerendering2 = false) {
  const headers2 = {};
  let cache_control = null;
  let age = null;
  let varyAny = false;
  for (const [key2, value] of fetched.response.headers) {
    if (filter(key2, value)) {
      headers2[key2] = value;
    }
    if (key2 === "cache-control")
      cache_control = value;
    else if (key2 === "age")
      age = value;
    else if (key2 === "vary" && value.trim() === "*")
      varyAny = true;
  }
  const payload = {
    status: fetched.response.status,
    statusText: fetched.response.statusText,
    headers: headers2,
    body: fetched.response_body
  };
  const safe_payload = JSON.stringify(payload).replace(pattern, (match) => replacements[match]);
  const attrs = [
    'type="application/json"',
    "data-sveltekit-fetched",
    `data-url=${escape_html_attr(fetched.url)}`
  ];
  if (fetched.is_b64) {
    attrs.push("data-b64");
  }
  if (fetched.request_headers || fetched.request_body) {
    const values = [];
    if (fetched.request_headers) {
      values.push([...new Headers(fetched.request_headers)].join(","));
    }
    if (fetched.request_body) {
      values.push(fetched.request_body);
    }
    attrs.push(`data-hash="${hash(...values)}"`);
  }
  if (!prerendering2 && fetched.method === "GET" && cache_control && !varyAny) {
    const match = /s-maxage=(\d+)/g.exec(cache_control) ?? /max-age=(\d+)/g.exec(cache_control);
    if (match) {
      const ttl = +match[1] - +(age ?? "0");
      attrs.push(`data-ttl="${ttl}"`);
    }
  }
  return `<script ${attrs.join(" ")}>${safe_payload}<\/script>`;
}
var s = JSON.stringify;
var encoder$2 = new TextEncoder();
function sha2562(data2) {
  if (!key[0])
    precompute();
  const out = init.slice(0);
  const array2 = encode(data2);
  for (let i2 = 0; i2 < array2.length; i2 += 16) {
    const w = array2.subarray(i2, i2 + 16);
    let tmp;
    let a2;
    let b;
    let out0 = out[0];
    let out1 = out[1];
    let out2 = out[2];
    let out3 = out[3];
    let out4 = out[4];
    let out5 = out[5];
    let out6 = out[6];
    let out7 = out[7];
    for (let i22 = 0; i22 < 64; i22++) {
      if (i22 < 16) {
        tmp = w[i22];
      } else {
        a2 = w[i22 + 1 & 15];
        b = w[i22 + 14 & 15];
        tmp = w[i22 & 15] = (a2 >>> 7 ^ a2 >>> 18 ^ a2 >>> 3 ^ a2 << 25 ^ a2 << 14) + (b >>> 17 ^ b >>> 19 ^ b >>> 10 ^ b << 15 ^ b << 13) + w[i22 & 15] + w[i22 + 9 & 15] | 0;
      }
      tmp = tmp + out7 + (out4 >>> 6 ^ out4 >>> 11 ^ out4 >>> 25 ^ out4 << 26 ^ out4 << 21 ^ out4 << 7) + (out6 ^ out4 & (out5 ^ out6)) + key[i22];
      out7 = out6;
      out6 = out5;
      out5 = out4;
      out4 = out3 + tmp | 0;
      out3 = out2;
      out2 = out1;
      out1 = out0;
      out0 = tmp + (out1 & out2 ^ out3 & (out1 ^ out2)) + (out1 >>> 2 ^ out1 >>> 13 ^ out1 >>> 22 ^ out1 << 30 ^ out1 << 19 ^ out1 << 10) | 0;
    }
    out[0] = out[0] + out0 | 0;
    out[1] = out[1] + out1 | 0;
    out[2] = out[2] + out2 | 0;
    out[3] = out[3] + out3 | 0;
    out[4] = out[4] + out4 | 0;
    out[5] = out[5] + out5 | 0;
    out[6] = out[6] + out6 | 0;
    out[7] = out[7] + out7 | 0;
  }
  const bytes = new Uint8Array(out.buffer);
  reverse_endianness(bytes);
  return base64(bytes);
}
var init = new Uint32Array(8);
var key = new Uint32Array(64);
function precompute() {
  function frac(x2) {
    return (x2 - Math.floor(x2)) * 4294967296;
  }
  let prime = 2;
  for (let i2 = 0; i2 < 64; prime++) {
    let is_prime = true;
    for (let factor = 2; factor * factor <= prime; factor++) {
      if (prime % factor === 0) {
        is_prime = false;
        break;
      }
    }
    if (is_prime) {
      if (i2 < 8) {
        init[i2] = frac(prime ** (1 / 2));
      }
      key[i2] = frac(prime ** (1 / 3));
      i2++;
    }
  }
}
function reverse_endianness(bytes) {
  for (let i2 = 0; i2 < bytes.length; i2 += 4) {
    const a2 = bytes[i2 + 0];
    const b = bytes[i2 + 1];
    const c = bytes[i2 + 2];
    const d = bytes[i2 + 3];
    bytes[i2 + 0] = d;
    bytes[i2 + 1] = c;
    bytes[i2 + 2] = b;
    bytes[i2 + 3] = a2;
  }
}
function encode(str) {
  const encoded = encoder$2.encode(str);
  const length = encoded.length * 8;
  const size3 = 512 * Math.ceil((length + 65) / 512);
  const bytes = new Uint8Array(size3 / 8);
  bytes.set(encoded);
  bytes[encoded.length] = 128;
  reverse_endianness(bytes);
  const words = new Uint32Array(bytes.buffer);
  words[words.length - 2] = Math.floor(length / 4294967296);
  words[words.length - 1] = length;
  return words;
}
var chars2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
function base64(bytes) {
  const l2 = bytes.length;
  let result = "";
  let i2;
  for (i2 = 2; i2 < l2; i2 += 3) {
    result += chars2[bytes[i2 - 2] >> 2];
    result += chars2[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars2[(bytes[i2 - 1] & 15) << 2 | bytes[i2] >> 6];
    result += chars2[bytes[i2] & 63];
  }
  if (i2 === l2 + 1) {
    result += chars2[bytes[i2 - 2] >> 2];
    result += chars2[(bytes[i2 - 2] & 3) << 4];
    result += "==";
  }
  if (i2 === l2) {
    result += chars2[bytes[i2 - 2] >> 2];
    result += chars2[(bytes[i2 - 2] & 3) << 4 | bytes[i2 - 1] >> 4];
    result += chars2[(bytes[i2 - 1] & 15) << 2];
    result += "=";
  }
  return result;
}
var array = new Uint8Array(16);
function generate_nonce() {
  crypto.getRandomValues(array);
  return base64(array);
}
var quoted = /* @__PURE__ */ new Set([
  "self",
  "unsafe-eval",
  "unsafe-hashes",
  "unsafe-inline",
  "none",
  "strict-dynamic",
  "report-sample",
  "wasm-unsafe-eval",
  "script"
]);
var crypto_pattern = /^(nonce|sha\d\d\d)-/;
var _use_hashes, _script_needs_csp, _style_needs_csp, _directives, _script_src, _script_src_elem, _style_src, _style_src_attr, _style_src_elem, _nonce;
var BaseProvider = class {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    /** @type {boolean} */
    __privateAdd(this, _use_hashes, void 0);
    /** @type {boolean} */
    __privateAdd(this, _script_needs_csp, void 0);
    /** @type {boolean} */
    __privateAdd(this, _style_needs_csp, void 0);
    /** @type {import('types').CspDirectives} */
    __privateAdd(this, _directives, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _script_src, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _script_src_elem, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src_attr, void 0);
    /** @type {import('types').Csp.Source[]} */
    __privateAdd(this, _style_src_elem, void 0);
    /** @type {string} */
    __privateAdd(this, _nonce, void 0);
    __privateSet(this, _use_hashes, use_hashes);
    __privateSet(this, _directives, directives);
    const d = __privateGet(this, _directives);
    __privateSet(this, _script_src, []);
    __privateSet(this, _script_src_elem, []);
    __privateSet(this, _style_src, []);
    __privateSet(this, _style_src_attr, []);
    __privateSet(this, _style_src_elem, []);
    const effective_script_src = d["script-src"] || d["default-src"];
    const script_src_elem = d["script-src-elem"];
    const effective_style_src = d["style-src"] || d["default-src"];
    const style_src_attr = d["style-src-attr"];
    const style_src_elem = d["style-src-elem"];
    __privateSet(this, _script_needs_csp, !!effective_script_src && effective_script_src.filter((value) => value !== "unsafe-inline").length > 0 || !!script_src_elem && script_src_elem.filter((value) => value !== "unsafe-inline").length > 0);
    __privateSet(this, _style_needs_csp, !!effective_style_src && effective_style_src.filter((value) => value !== "unsafe-inline").length > 0 || !!style_src_attr && style_src_attr.filter((value) => value !== "unsafe-inline").length > 0 || !!style_src_elem && style_src_elem.filter((value) => value !== "unsafe-inline").length > 0);
    this.script_needs_nonce = __privateGet(this, _script_needs_csp) && !__privateGet(this, _use_hashes);
    this.style_needs_nonce = __privateGet(this, _style_needs_csp) && !__privateGet(this, _use_hashes);
    __privateSet(this, _nonce, nonce);
  }
  /** @param {string} content */
  add_script(content) {
    if (__privateGet(this, _script_needs_csp)) {
      const d = __privateGet(this, _directives);
      if (__privateGet(this, _use_hashes)) {
        const hash2 = sha2562(content);
        __privateGet(this, _script_src).push(`sha256-${hash2}`);
        if (d["script-src-elem"]?.length) {
          __privateGet(this, _script_src_elem).push(`sha256-${hash2}`);
        }
      } else {
        if (__privateGet(this, _script_src).length === 0) {
          __privateGet(this, _script_src).push(`nonce-${__privateGet(this, _nonce)}`);
        }
        if (d["script-src-elem"]?.length) {
          __privateGet(this, _script_src_elem).push(`nonce-${__privateGet(this, _nonce)}`);
        }
      }
    }
  }
  /** @param {string} content */
  add_style(content) {
    if (__privateGet(this, _style_needs_csp)) {
      const empty_comment_hash = "9OlNO0DNEeaVzHL4RZwCLsBHA8WBQ8toBp/4F5XV2nc=";
      const d = __privateGet(this, _directives);
      if (__privateGet(this, _use_hashes)) {
        const hash2 = sha2562(content);
        __privateGet(this, _style_src).push(`sha256-${hash2}`);
        if (d["style-src-attr"]?.length) {
          __privateGet(this, _style_src_attr).push(`sha256-${hash2}`);
        }
        if (d["style-src-elem"]?.length) {
          if (hash2 !== empty_comment_hash && !d["style-src-elem"].includes(`sha256-${empty_comment_hash}`)) {
            __privateGet(this, _style_src_elem).push(`sha256-${empty_comment_hash}`);
          }
          __privateGet(this, _style_src_elem).push(`sha256-${hash2}`);
        }
      } else {
        if (__privateGet(this, _style_src).length === 0 && !d["style-src"]?.includes("unsafe-inline")) {
          __privateGet(this, _style_src).push(`nonce-${__privateGet(this, _nonce)}`);
        }
        if (d["style-src-attr"]?.length) {
          __privateGet(this, _style_src_attr).push(`nonce-${__privateGet(this, _nonce)}`);
        }
        if (d["style-src-elem"]?.length) {
          if (!d["style-src-elem"].includes(`sha256-${empty_comment_hash}`)) {
            __privateGet(this, _style_src_elem).push(`sha256-${empty_comment_hash}`);
          }
          __privateGet(this, _style_src_elem).push(`nonce-${__privateGet(this, _nonce)}`);
        }
      }
    }
  }
  /**
   * @param {boolean} [is_meta]
   */
  get_header(is_meta = false) {
    const header = [];
    const directives = { ...__privateGet(this, _directives) };
    if (__privateGet(this, _style_src).length > 0) {
      directives["style-src"] = [
        ...directives["style-src"] || directives["default-src"] || [],
        ...__privateGet(this, _style_src)
      ];
    }
    if (__privateGet(this, _style_src_attr).length > 0) {
      directives["style-src-attr"] = [
        ...directives["style-src-attr"] || [],
        ...__privateGet(this, _style_src_attr)
      ];
    }
    if (__privateGet(this, _style_src_elem).length > 0) {
      directives["style-src-elem"] = [
        ...directives["style-src-elem"] || [],
        ...__privateGet(this, _style_src_elem)
      ];
    }
    if (__privateGet(this, _script_src).length > 0) {
      directives["script-src"] = [
        ...directives["script-src"] || directives["default-src"] || [],
        ...__privateGet(this, _script_src)
      ];
    }
    if (__privateGet(this, _script_src_elem).length > 0) {
      directives["script-src-elem"] = [
        ...directives["script-src-elem"] || [],
        ...__privateGet(this, _script_src_elem)
      ];
    }
    for (const key2 in directives) {
      if (is_meta && (key2 === "frame-ancestors" || key2 === "report-uri" || key2 === "sandbox")) {
        continue;
      }
      const value = (
        /** @type {string[] | true} */
        directives[key2]
      );
      if (!value)
        continue;
      const directive = [key2];
      if (Array.isArray(value)) {
        value.forEach((value2) => {
          if (quoted.has(value2) || crypto_pattern.test(value2)) {
            directive.push(`'${value2}'`);
          } else {
            directive.push(value2);
          }
        });
      }
      header.push(directive.join(" "));
    }
    return header.join("; ");
  }
};
_use_hashes = new WeakMap();
_script_needs_csp = new WeakMap();
_style_needs_csp = new WeakMap();
_directives = new WeakMap();
_script_src = new WeakMap();
_script_src_elem = new WeakMap();
_style_src = new WeakMap();
_style_src_attr = new WeakMap();
_style_src_elem = new WeakMap();
_nonce = new WeakMap();
var CspProvider = class extends BaseProvider {
  get_meta() {
    const content = this.get_header(true);
    if (!content) {
      return;
    }
    return `<meta http-equiv="content-security-policy" content=${escape_html_attr(content)}>`;
  }
};
var CspReportOnlyProvider = class extends BaseProvider {
  /**
   * @param {boolean} use_hashes
   * @param {import('types').CspDirectives} directives
   * @param {string} nonce
   */
  constructor(use_hashes, directives, nonce) {
    super(use_hashes, directives, nonce);
    if (Object.values(directives).filter((v) => !!v).length > 0) {
      const has_report_to = directives["report-to"]?.length ?? 0 > 0;
      const has_report_uri = directives["report-uri"]?.length ?? 0 > 0;
      if (!has_report_to && !has_report_uri) {
        throw Error(
          "`content-security-policy-report-only` must be specified with either the `report-to` or `report-uri` directives, or both"
        );
      }
    }
  }
};
var Csp = class {
  /**
   * @param {import('./types.js').CspConfig} config
   * @param {import('./types.js').CspOpts} opts
   */
  constructor({ mode, directives, reportOnly }, { prerender }) {
    /** @readonly */
    __publicField(this, "nonce", generate_nonce());
    /** @type {CspProvider} */
    __publicField(this, "csp_provider");
    /** @type {CspReportOnlyProvider} */
    __publicField(this, "report_only_provider");
    const use_hashes = mode === "hash" || mode === "auto" && prerender;
    this.csp_provider = new CspProvider(use_hashes, directives, this.nonce);
    this.report_only_provider = new CspReportOnlyProvider(use_hashes, reportOnly, this.nonce);
  }
  get script_needs_nonce() {
    return this.csp_provider.script_needs_nonce || this.report_only_provider.script_needs_nonce;
  }
  get style_needs_nonce() {
    return this.csp_provider.style_needs_nonce || this.report_only_provider.style_needs_nonce;
  }
  /** @param {string} content */
  add_script(content) {
    this.csp_provider.add_script(content);
    this.report_only_provider.add_script(content);
  }
  /** @param {string} content */
  add_style(content) {
    this.csp_provider.add_style(content);
    this.report_only_provider.add_style(content);
  }
};
function defer() {
  let fulfil;
  let reject;
  const promise = new Promise((f, r2) => {
    fulfil = f;
    reject = r2;
  });
  return { promise, fulfil, reject };
}
function create_async_iterator() {
  const deferred = [defer()];
  return {
    iterator: {
      [Symbol.asyncIterator]() {
        return {
          next: async () => {
            const next = await deferred[0].promise;
            if (!next.done)
              deferred.shift();
            return next;
          }
        };
      }
    },
    push: (value) => {
      deferred[deferred.length - 1].fulfil({
        value,
        done: false
      });
      deferred.push(defer());
    },
    done: () => {
      deferred[deferred.length - 1].fulfil({ done: true });
    }
  };
}
var updated = {
  ...readable(false),
  check: () => false
};
var encoder$1 = new TextEncoder();
async function render_response({
  branch,
  fetched,
  options: options2,
  manifest: manifest2,
  state,
  page_config,
  status,
  error = null,
  event,
  resolve_opts,
  action_result
}) {
  if (state.prerendering) {
    if (options2.csp.mode === "nonce") {
      throw new Error('Cannot use prerendering if config.kit.csp.mode === "nonce"');
    }
    if (options2.app_template_contains_nonce) {
      throw new Error("Cannot use prerendering if page template contains %sveltekit.nonce%");
    }
  }
  const { client } = manifest2._;
  const modulepreloads = new Set(client.imports);
  const stylesheets21 = new Set(client.stylesheets);
  const fonts21 = new Set(client.fonts);
  const link_header_preloads = /* @__PURE__ */ new Set();
  const inline_styles = /* @__PURE__ */ new Map();
  let rendered;
  const form_value = action_result?.type === "success" || action_result?.type === "failure" ? action_result.data ?? null : null;
  let base$1 = base;
  let assets$1 = assets;
  let base_expression = s(base);
  if (!state.prerendering?.fallback) {
    const segments = event.url.pathname.slice(base.length).split("/").slice(2);
    base$1 = segments.map(() => "..").join("/") || ".";
    base_expression = `new URL(${s(base$1)}, location).pathname.slice(0, -1)`;
    if (!assets || assets[0] === "/" && assets !== SVELTE_KIT_ASSETS) {
      assets$1 = base$1;
    }
  }
  if (page_config.ssr) {
    const props = {
      stores: {
        page: writable(null),
        navigating: writable(null),
        updated
      },
      constructors: await Promise.all(branch.map(({ node }) => node.component())),
      form: form_value
    };
    let data22 = {};
    for (let i2 = 0; i2 < branch.length; i2 += 1) {
      data22 = { ...data22, ...branch[i2].data };
      props[`data_${i2}`] = data22;
    }
    props.page = {
      error,
      params: (
        /** @type {Record<string, any>} */
        event.params
      ),
      route: event.route,
      status,
      url: event.url,
      data: data22,
      form: form_value,
      state: {}
    };
    override({ base: base$1, assets: assets$1 });
    {
      try {
        rendered = options2.root.render(props);
      } finally {
        reset();
      }
    }
    for (const { node } of branch) {
      for (const url of node.imports)
        modulepreloads.add(url);
      for (const url of node.stylesheets)
        stylesheets21.add(url);
      for (const url of node.fonts)
        fonts21.add(url);
      if (node.inline_styles) {
        Object.entries(await node.inline_styles()).forEach(([k, v]) => inline_styles.set(k, v));
      }
    }
  } else {
    rendered = { head: "", html: "", css: { code: "", map: null } };
  }
  let head2 = "";
  let body2 = rendered.html;
  const csp = new Csp(options2.csp, {
    prerender: !!state.prerendering
  });
  const prefixed = (path) => {
    if (path.startsWith("/")) {
      return base + path;
    }
    return `${assets$1}/${path}`;
  };
  if (inline_styles.size > 0) {
    const content = Array.from(inline_styles.values()).join("\n");
    const attributes = [];
    if (csp.style_needs_nonce)
      attributes.push(` nonce="${csp.nonce}"`);
    csp.add_style(content);
    head2 += `
	<style${attributes.join("")}>${content}</style>`;
  }
  for (const dep of stylesheets21) {
    const path = prefixed(dep);
    const attributes = ['rel="stylesheet"'];
    if (inline_styles.has(dep)) {
      attributes.push("disabled", 'media="(max-width: 0)"');
    } else {
      if (resolve_opts.preload({ type: "css", path })) {
        const preload_atts = ['rel="preload"', 'as="style"'];
        link_header_preloads.add(`<${encodeURI(path)}>; ${preload_atts.join(";")}; nopush`);
      }
    }
    head2 += `
		<link href="${path}" ${attributes.join(" ")}>`;
  }
  for (const dep of fonts21) {
    const path = prefixed(dep);
    if (resolve_opts.preload({ type: "font", path })) {
      const ext = dep.slice(dep.lastIndexOf(".") + 1);
      const attributes = [
        'rel="preload"',
        'as="font"',
        `type="font/${ext}"`,
        `href="${path}"`,
        "crossorigin"
      ];
      head2 += `
		<link ${attributes.join(" ")}>`;
    }
  }
  const global2 = `__sveltekit_${options2.version_hash}`;
  const { data: data2, chunks } = get_data(
    event,
    options2,
    branch.map((b) => b.server_data),
    global2
  );
  if (page_config.ssr && page_config.csr) {
    body2 += `
			${fetched.map(
      (item) => serialize_data(item, resolve_opts.filterSerializedResponseHeaders, !!state.prerendering)
    ).join("\n			")}`;
  }
  if (page_config.csr) {
    if (client.uses_env_dynamic_public && state.prerendering) {
      modulepreloads.add(`${options2.app_dir}/env.js`);
    }
    const included_modulepreloads = Array.from(modulepreloads, (dep) => prefixed(dep)).filter(
      (path) => resolve_opts.preload({ type: "js", path })
    );
    for (const path of included_modulepreloads) {
      link_header_preloads.add(`<${encodeURI(path)}>; rel="modulepreload"; nopush`);
      if (options2.preload_strategy !== "modulepreload") {
        head2 += `
		<link rel="preload" as="script" crossorigin="anonymous" href="${path}">`;
      } else if (state.prerendering) {
        head2 += `
		<link rel="modulepreload" href="${path}">`;
      }
    }
    const blocks = [];
    const load_env_eagerly = client.uses_env_dynamic_public && state.prerendering;
    const properties = [`base: ${base_expression}`];
    if (assets) {
      properties.push(`assets: ${s(assets)}`);
    }
    if (client.uses_env_dynamic_public) {
      properties.push(`env: ${load_env_eagerly ? "null" : s(public_env)}`);
    }
    if (chunks) {
      blocks.push("const deferred = new Map();");
      properties.push(`defer: (id) => new Promise((fulfil, reject) => {
							deferred.set(id, { fulfil, reject });
						})`);
      properties.push(`resolve: ({ id, data, error }) => {
							const { fulfil, reject } = deferred.get(id);
							deferred.delete(id);

							if (error) reject(error);
							else fulfil(data);
						}`);
    }
    blocks.push(`${global2} = {
						${properties.join(",\n						")}
					};`);
    const args = ["app", "element"];
    blocks.push("const element = document.currentScript.parentElement;");
    if (page_config.ssr) {
      const serialized = { form: "null", error: "null" };
      blocks.push(`const data = ${data2};`);
      if (form_value) {
        serialized.form = uneval_action_response(
          form_value,
          /** @type {string} */
          event.route.id
        );
      }
      if (error) {
        serialized.error = uneval(error);
      }
      const hydrate2 = [
        `node_ids: [${branch.map(({ node }) => node.index).join(", ")}]`,
        "data",
        `form: ${serialized.form}`,
        `error: ${serialized.error}`
      ];
      if (status !== 200) {
        hydrate2.push(`status: ${status}`);
      }
      if (options2.embedded) {
        hydrate2.push(`params: ${uneval(event.params)}`, `route: ${s(event.route)}`);
      }
      const indent = "	".repeat(load_env_eagerly ? 7 : 6);
      args.push(`{
${indent}	${hydrate2.join(`,
${indent}	`)}
${indent}}`);
    }
    if (load_env_eagerly) {
      blocks.push(`import(${s(`${base$1}/${options2.app_dir}/env.js`)}).then(({ env }) => {
						${global2}.env = env;

						Promise.all([
							import(${s(prefixed(client.start))}),
							import(${s(prefixed(client.app))})
						]).then(([kit, app]) => {
							kit.start(${args.join(", ")});
						});
					});`);
    } else {
      blocks.push(`Promise.all([
						import(${s(prefixed(client.start))}),
						import(${s(prefixed(client.app))})
					]).then(([kit, app]) => {
						kit.start(${args.join(", ")});
					});`);
    }
    if (options2.service_worker) {
      const opts = "";
      blocks.push(`if ('serviceWorker' in navigator) {
						addEventListener('load', function () {
							navigator.serviceWorker.register('${prefixed("service-worker.js")}'${opts});
						});
					}`);
    }
    const init_app = `
				{
					${blocks.join("\n\n					")}
				}
			`;
    csp.add_script(init_app);
    body2 += `
			<script${csp.script_needs_nonce ? ` nonce="${csp.nonce}"` : ""}>${init_app}<\/script>
		`;
  }
  const headers2 = new Headers({
    "x-sveltekit-page": "true",
    "content-type": "text/html"
  });
  if (state.prerendering) {
    const http_equiv = [];
    const csp_headers = csp.csp_provider.get_meta();
    if (csp_headers) {
      http_equiv.push(csp_headers);
    }
    if (state.prerendering.cache) {
      http_equiv.push(`<meta http-equiv="cache-control" content="${state.prerendering.cache}">`);
    }
    if (http_equiv.length > 0) {
      head2 = http_equiv.join("\n") + head2;
    }
  } else {
    const csp_header = csp.csp_provider.get_header();
    if (csp_header) {
      headers2.set("content-security-policy", csp_header);
    }
    const report_only_header = csp.report_only_provider.get_header();
    if (report_only_header) {
      headers2.set("content-security-policy-report-only", report_only_header);
    }
    if (link_header_preloads.size) {
      headers2.set("link", Array.from(link_header_preloads).join(", "));
    }
  }
  head2 += rendered.head;
  const html = options2.templates.app({
    head: head2,
    body: body2,
    assets: assets$1,
    nonce: (
      /** @type {string} */
      csp.nonce
    ),
    env: safe_public_env
  });
  const transformed = await resolve_opts.transformPageChunk({
    html,
    done: true
  }) || "";
  if (!chunks) {
    headers2.set("etag", `"${hash(transformed)}"`);
  }
  return !chunks ? text(transformed, {
    status,
    headers: headers2
  }) : new Response(
    new ReadableStream({
      async start(controller) {
        controller.enqueue(encoder$1.encode(transformed + "\n"));
        for await (const chunk of chunks) {
          controller.enqueue(encoder$1.encode(chunk));
        }
        controller.close();
      },
      type: "bytes"
    }),
    {
      headers: {
        "content-type": "text/html"
      }
    }
  );
}
function get_data(event, options2, nodes, global2) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push: push2, done } = create_async_iterator();
  function replacer(thing) {
    if (typeof thing?.then === "function") {
      const id = promise_id++;
      count += 1;
      thing.then(
        /** @param {any} data */
        (data2) => ({ data: data2 })
      ).catch(
        /** @param {any} error */
        async (error) => ({
          error: await handle_error_and_jsonify(event, options2, error)
        })
      ).then(
        /**
         * @param {{data: any; error: any}} result
         */
        async ({ data: data2, error }) => {
          count -= 1;
          let str;
          try {
            str = uneval({ id, data: data2, error }, replacer);
          } catch (e) {
            error = await handle_error_and_jsonify(
              event,
              options2,
              new Error(`Failed to serialize promise while rendering ${event.route.id}`)
            );
            data2 = void 0;
            str = uneval({ id, data: data2, error }, replacer);
          }
          push2(`<script>${global2}.resolve(${str})<\/script>
`);
          if (count === 0)
            done();
        }
      );
      return `${global2}.defer(${id})`;
    }
  }
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      return `{"type":"data","data":${uneval(node.data, replacer)},${stringify_uses(node)}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `[${strings.join(",")}]`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function get_option(nodes, option) {
  return nodes.reduce(
    (value, node) => {
      return (
        /** @type {Value} TypeScript's too dumb to understand this */
        node?.universal?.[option] ?? node?.server?.[option] ?? value
      );
    },
    /** @type {Value | undefined} */
    void 0
  );
}
async function respond_with_error({
  event,
  options: options2,
  manifest: manifest2,
  state,
  status,
  error,
  resolve_opts
}) {
  if (event.request.headers.get("x-sveltekit-error")) {
    return static_error_page(
      options2,
      status,
      /** @type {Error} */
      error.message
    );
  }
  const fetched = [];
  try {
    const branch = [];
    const default_layout = await manifest2._.nodes[0]();
    const ssr = get_option([default_layout], "ssr") ?? true;
    const csr = get_option([default_layout], "csr") ?? true;
    if (ssr) {
      state.error = true;
      const server_data_promise = load_server_data({
        event,
        state,
        node: default_layout,
        parent: async () => ({})
      });
      const server_data = await server_data_promise;
      const data2 = await load_data({
        event,
        fetched,
        node: default_layout,
        parent: async () => ({}),
        resolve_opts,
        server_data_promise,
        state,
        csr
      });
      branch.push(
        {
          node: default_layout,
          server_data,
          data: data2
        },
        {
          node: await manifest2._.nodes[1](),
          // 1 is always the root error
          data: null,
          server_data: null
        }
      );
    }
    return await render_response({
      options: options2,
      manifest: manifest2,
      state,
      page_config: {
        ssr,
        csr
      },
      status,
      error: await handle_error_and_jsonify(event, options2, error),
      branch,
      fetched,
      event,
      resolve_opts
    });
  } catch (e) {
    if (e instanceof Redirect) {
      return redirect_response(e.status, e.location);
    }
    return static_error_page(
      options2,
      get_status(e),
      (await handle_error_and_jsonify(event, options2, e)).message
    );
  }
}
function once(fn) {
  let done = false;
  let result;
  return () => {
    if (done)
      return result;
    done = true;
    return result = fn();
  };
}
var encoder2 = new TextEncoder();
async function render_data(event, route, options2, manifest2, state, invalidated_data_nodes, trailing_slash) {
  if (!route.page) {
    return new Response(void 0, {
      status: 404
    });
  }
  try {
    const node_ids = [...route.page.layouts, route.page.leaf];
    const invalidated = invalidated_data_nodes ?? node_ids.map(() => true);
    let aborted = false;
    const url = new URL(event.url);
    url.pathname = normalize_path(url.pathname, trailing_slash);
    const new_event = { ...event, url };
    const functions = node_ids.map((n, i2) => {
      return once(async () => {
        try {
          if (aborted) {
            return (
              /** @type {import('types').ServerDataSkippedNode} */
              {
                type: "skip"
              }
            );
          }
          const node = n == void 0 ? n : await manifest2._.nodes[n]();
          return load_server_data({
            event: new_event,
            state,
            node,
            parent: async () => {
              const data22 = {};
              for (let j2 = 0; j2 < i2; j2 += 1) {
                const parent = (
                  /** @type {import('types').ServerDataNode | null} */
                  await functions[j2]()
                );
                if (parent) {
                  Object.assign(data22, parent.data);
                }
              }
              return data22;
            }
          });
        } catch (e) {
          aborted = true;
          throw e;
        }
      });
    });
    const promises = functions.map(async (fn, i2) => {
      if (!invalidated[i2]) {
        return (
          /** @type {import('types').ServerDataSkippedNode} */
          {
            type: "skip"
          }
        );
      }
      return fn();
    });
    let length = promises.length;
    const nodes = await Promise.all(
      promises.map(
        (p2, i2) => p2.catch(async (error) => {
          if (error instanceof Redirect) {
            throw error;
          }
          length = Math.min(length, i2 + 1);
          return (
            /** @type {import('types').ServerErrorNode} */
            {
              type: "error",
              error: await handle_error_and_jsonify(event, options2, error),
              status: error instanceof HttpError || error instanceof SvelteKitError ? error.status : void 0
            }
          );
        })
      )
    );
    const { data: data2, chunks } = get_data_json(event, options2, nodes);
    if (!chunks) {
      return json_response(data2);
    }
    return new Response(
      new ReadableStream({
        async start(controller) {
          controller.enqueue(encoder2.encode(data2));
          for await (const chunk of chunks) {
            controller.enqueue(encoder2.encode(chunk));
          }
          controller.close();
        },
        type: "bytes"
      }),
      {
        headers: {
          // we use a proprietary content type to prevent buffering.
          // the `text` prefix makes it inspectable
          "content-type": "text/sveltekit-data",
          "cache-control": "private, no-store"
        }
      }
    );
  } catch (e) {
    const error = normalize_error(e);
    if (error instanceof Redirect) {
      return redirect_json_response(error);
    } else {
      return json_response(await handle_error_and_jsonify(event, options2, error), 500);
    }
  }
}
function json_response(json2, status = 200) {
  return text(typeof json2 === "string" ? json2 : JSON.stringify(json2), {
    status,
    headers: {
      "content-type": "application/json",
      "cache-control": "private, no-store"
    }
  });
}
function redirect_json_response(redirect2) {
  return json_response({
    type: "redirect",
    location: redirect2.location
  });
}
function get_data_json(event, options2, nodes) {
  let promise_id = 1;
  let count = 0;
  const { iterator, push: push2, done } = create_async_iterator();
  const reducers = {
    /** @param {any} thing */
    Promise: (thing) => {
      if (typeof thing?.then === "function") {
        const id = promise_id++;
        count += 1;
        let key2 = "data";
        thing.catch(
          /** @param {any} e */
          async (e) => {
            key2 = "error";
            return handle_error_and_jsonify(
              event,
              options2,
              /** @type {any} */
              e
            );
          }
        ).then(
          /** @param {any} value */
          async (value) => {
            let str;
            try {
              str = stringify2(value, reducers);
            } catch (e) {
              const error = await handle_error_and_jsonify(
                event,
                options2,
                new Error(`Failed to serialize promise while rendering ${event.route.id}`)
              );
              key2 = "error";
              str = stringify2(error, reducers);
            }
            count -= 1;
            push2(`{"type":"chunk","id":${id},"${key2}":${str}}
`);
            if (count === 0)
              done();
          }
        );
        return id;
      }
    }
  };
  try {
    const strings = nodes.map((node) => {
      if (!node)
        return "null";
      if (node.type === "error" || node.type === "skip") {
        return JSON.stringify(node);
      }
      return `{"type":"data","data":${stringify2(node.data, reducers)},${stringify_uses(
        node
      )}${node.slash ? `,"slash":${JSON.stringify(node.slash)}` : ""}}`;
    });
    return {
      data: `{"type":"data","nodes":[${strings.join(",")}]}
`,
      chunks: count > 0 ? iterator : null
    };
  } catch (e) {
    throw new Error(clarify_devalue_error(
      event,
      /** @type {any} */
      e
    ));
  }
}
function load_page_nodes(page2, manifest2) {
  return Promise.all([
    // we use == here rather than === because [undefined] serializes as "[null]"
    ...page2.layouts.map((n) => n == void 0 ? n : manifest2._.nodes[n]()),
    manifest2._.nodes[page2.leaf]()
  ]);
}
var MAX_DEPTH = 10;
async function render_page(event, page2, options2, manifest2, state, resolve_opts) {
  if (state.depth > MAX_DEPTH) {
    return text(`Not found: ${event.url.pathname}`, {
      status: 404
      // TODO in some cases this should be 500. not sure how to differentiate
    });
  }
  if (is_action_json_request(event)) {
    const node = await manifest2._.nodes[page2.leaf]();
    return handle_action_json_request(event, options2, node?.server);
  }
  try {
    const nodes = await load_page_nodes(page2, manifest2);
    const leaf_node = (
      /** @type {import('types').SSRNode} */
      nodes.at(-1)
    );
    let status = 200;
    let action_result = void 0;
    if (is_action_request(event)) {
      action_result = await handle_action_request(event, leaf_node.server);
      if (action_result?.type === "redirect") {
        return redirect_response(action_result.status, action_result.location);
      }
      if (action_result?.type === "error") {
        status = get_status(action_result.error);
      }
      if (action_result?.type === "failure") {
        status = action_result.status;
      }
    }
    const should_prerender_data = nodes.some((node) => node?.server?.load);
    const data_pathname = add_data_suffix(event.url.pathname);
    const should_prerender = get_option(nodes, "prerender") ?? false;
    if (should_prerender) {
      const mod = leaf_node.server;
      if (mod?.actions) {
        throw new Error("Cannot prerender pages with actions");
      }
    } else if (state.prerendering) {
      return new Response(void 0, {
        status: 204
      });
    }
    state.prerender_default = should_prerender;
    const fetched = [];
    if (get_option(nodes, "ssr") === false && !(state.prerendering && should_prerender_data)) {
      return await render_response({
        branch: [],
        fetched,
        page_config: {
          ssr: false,
          csr: get_option(nodes, "csr") ?? true
        },
        status,
        error: null,
        event,
        options: options2,
        manifest: manifest2,
        state,
        resolve_opts
      });
    }
    const branch = [];
    let load_error = null;
    const server_promises = nodes.map((node, i2) => {
      if (load_error) {
        throw load_error;
      }
      return Promise.resolve().then(async () => {
        try {
          if (node === leaf_node && action_result?.type === "error") {
            throw action_result.error;
          }
          return await load_server_data({
            event,
            state,
            node,
            parent: async () => {
              const data2 = {};
              for (let j2 = 0; j2 < i2; j2 += 1) {
                const parent = await server_promises[j2];
                if (parent)
                  Object.assign(data2, await parent.data);
              }
              return data2;
            }
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    const csr = get_option(nodes, "csr") ?? true;
    const load_promises = nodes.map((node, i2) => {
      if (load_error)
        throw load_error;
      return Promise.resolve().then(async () => {
        try {
          return await load_data({
            event,
            fetched,
            node,
            parent: async () => {
              const data2 = {};
              for (let j2 = 0; j2 < i2; j2 += 1) {
                Object.assign(data2, await load_promises[j2]);
              }
              return data2;
            },
            resolve_opts,
            server_data_promise: server_promises[i2],
            state,
            csr
          });
        } catch (e) {
          load_error = /** @type {Error} */
          e;
          throw load_error;
        }
      });
    });
    for (const p2 of server_promises)
      p2.catch(() => {
      });
    for (const p2 of load_promises)
      p2.catch(() => {
      });
    for (let i2 = 0; i2 < nodes.length; i2 += 1) {
      const node = nodes[i2];
      if (node) {
        try {
          const server_data = await server_promises[i2];
          const data2 = await load_promises[i2];
          branch.push({ node, server_data, data: data2 });
        } catch (e) {
          const err = normalize_error(e);
          if (err instanceof Redirect) {
            if (state.prerendering && should_prerender_data) {
              const body2 = JSON.stringify({
                type: "redirect",
                location: err.location
              });
              state.prerendering.dependencies.set(data_pathname, {
                response: text(body2),
                body: body2
              });
            }
            return redirect_response(err.status, err.location);
          }
          const status2 = get_status(err);
          const error = await handle_error_and_jsonify(event, options2, err);
          while (i2--) {
            if (page2.errors[i2]) {
              const index21 = (
                /** @type {number} */
                page2.errors[i2]
              );
              const node2 = await manifest2._.nodes[index21]();
              let j2 = i2;
              while (!branch[j2])
                j2 -= 1;
              return await render_response({
                event,
                options: options2,
                manifest: manifest2,
                state,
                resolve_opts,
                page_config: { ssr: true, csr: true },
                status: status2,
                error,
                branch: compact(branch.slice(0, j2 + 1)).concat({
                  node: node2,
                  data: null,
                  server_data: null
                }),
                fetched
              });
            }
          }
          return static_error_page(options2, status2, error.message);
        }
      } else {
        branch.push(null);
      }
    }
    if (state.prerendering && should_prerender_data) {
      let { data: data2, chunks } = get_data_json(
        event,
        options2,
        branch.map((node) => node?.server_data)
      );
      if (chunks) {
        for await (const chunk of chunks) {
          data2 += chunk;
        }
      }
      state.prerendering.dependencies.set(data_pathname, {
        response: text(data2),
        body: data2
      });
    }
    const ssr = get_option(nodes, "ssr") ?? true;
    return await render_response({
      event,
      options: options2,
      manifest: manifest2,
      state,
      resolve_opts,
      page_config: {
        csr: get_option(nodes, "csr") ?? true,
        ssr
      },
      status,
      error: null,
      branch: ssr === false ? [] : compact(branch),
      action_result,
      fetched
    });
  } catch (e) {
    return await respond_with_error({
      event,
      options: options2,
      manifest: manifest2,
      state,
      status: 500,
      error: e,
      resolve_opts
    });
  }
}
function exec(match, params, matchers) {
  const result = {};
  const values = match.slice(1);
  const values_needing_match = values.filter((value) => value !== void 0);
  let buffered = 0;
  for (let i2 = 0; i2 < params.length; i2 += 1) {
    const param = params[i2];
    let value = values[i2 - buffered];
    if (param.chained && param.rest && buffered) {
      value = values.slice(i2 - buffered, i2 + 1).filter((s2) => s2).join("/");
      buffered = 0;
    }
    if (value === void 0) {
      if (param.rest)
        result[param.name] = "";
      continue;
    }
    if (!param.matcher || matchers[param.matcher](value)) {
      result[param.name] = value;
      const next_param = params[i2 + 1];
      const next_value = values[i2 + 1];
      if (next_param && !next_param.rest && next_param.optional && next_value && param.chained) {
        buffered = 0;
      }
      if (!next_param && !next_value && Object.keys(result).length === values_needing_match.length) {
        buffered = 0;
      }
      continue;
    }
    if (param.optional && param.chained) {
      buffered++;
      continue;
    }
    return;
  }
  if (buffered)
    return;
  return result;
}
function validate_options(options2) {
  if (options2?.path === void 0) {
    throw new Error("You must specify a `path` when setting, deleting or serializing cookies");
  }
}
function get_cookies(request, url, trailing_slash) {
  const header = request.headers.get("cookie") ?? "";
  const initial_cookies = (0, import_cookie3.parse)(header, { decode: (value) => value });
  const normalized_url = normalize_path(url.pathname, trailing_slash);
  const new_cookies = {};
  const defaults2 = {
    httpOnly: true,
    sameSite: "lax",
    secure: url.hostname === "localhost" && url.protocol === "http:" ? false : true
  };
  const cookies = {
    // The JSDoc param annotations appearing below for get, set and delete
    // are necessary to expose the `cookie` library types to
    // typescript users. `@type {import('@sveltejs/kit').Cookies}` above is not
    // sufficient to do so.
    /**
     * @param {string} name
     * @param {import('cookie').CookieParseOptions} opts
     */
    get(name, opts) {
      const c = new_cookies[name];
      if (c && domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
        return c.value;
      }
      const decoder = opts?.decode || decodeURIComponent;
      const req_cookies = (0, import_cookie3.parse)(header, { decode: decoder });
      const cookie = req_cookies[name];
      return cookie;
    },
    /**
     * @param {import('cookie').CookieParseOptions} opts
     */
    getAll(opts) {
      const decoder = opts?.decode || decodeURIComponent;
      const cookies2 = (0, import_cookie3.parse)(header, { decode: decoder });
      for (const c of Object.values(new_cookies)) {
        if (domain_matches(url.hostname, c.options.domain) && path_matches(url.pathname, c.options.path)) {
          cookies2[c.name] = c.value;
        }
      }
      return Object.entries(cookies2).map(([name, value]) => ({ name, value }));
    },
    /**
     * @param {string} name
     * @param {string} value
     * @param {import('./page/types.js').Cookie['options']} options
     */
    set(name, value, options2) {
      validate_options(options2);
      set_internal(name, value, { ...defaults2, ...options2 });
    },
    /**
     * @param {string} name
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    delete(name, options2) {
      validate_options(options2);
      cookies.set(name, "", { ...options2, maxAge: 0 });
    },
    /**
     * @param {string} name
     * @param {string} value
     *  @param {import('./page/types.js').Cookie['options']} options
     */
    serialize(name, value, options2) {
      validate_options(options2);
      let path = options2.path;
      if (!options2.domain || options2.domain === url.hostname) {
        path = resolve(normalized_url, path);
      }
      return (0, import_cookie3.serialize)(name, value, { ...defaults2, ...options2, path });
    }
  };
  function get_cookie_header(destination, header2) {
    const combined_cookies = {
      // cookies sent by the user agent have lowest precedence
      ...initial_cookies
    };
    for (const key2 in new_cookies) {
      const cookie = new_cookies[key2];
      if (!domain_matches(destination.hostname, cookie.options.domain))
        continue;
      if (!path_matches(destination.pathname, cookie.options.path))
        continue;
      const encoder22 = cookie.options.encode || encodeURIComponent;
      combined_cookies[cookie.name] = encoder22(cookie.value);
    }
    if (header2) {
      const parsed = (0, import_cookie3.parse)(header2, { decode: (value) => value });
      for (const name in parsed) {
        combined_cookies[name] = parsed[name];
      }
    }
    return Object.entries(combined_cookies).map(([name, value]) => `${name}=${value}`).join("; ");
  }
  function set_internal(name, value, options2) {
    let path = options2.path;
    if (!options2.domain || options2.domain === url.hostname) {
      path = resolve(normalized_url, path);
    }
    new_cookies[name] = { name, value, options: { ...options2, path } };
  }
  return { cookies, new_cookies, get_cookie_header, set_internal };
}
function domain_matches(hostname, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint[0] === "." ? constraint.slice(1) : constraint;
  if (hostname === normalized)
    return true;
  return hostname.endsWith("." + normalized);
}
function path_matches(path, constraint) {
  if (!constraint)
    return true;
  const normalized = constraint.endsWith("/") ? constraint.slice(0, -1) : constraint;
  if (path === normalized)
    return true;
  return path.startsWith(normalized + "/");
}
function add_cookies_to_headers(headers2, cookies) {
  for (const new_cookie of cookies) {
    const { name, value, options: options2 } = new_cookie;
    headers2.append("set-cookie", (0, import_cookie3.serialize)(name, value, options2));
    if (options2.path.endsWith(".html")) {
      const path = add_data_suffix(options2.path);
      headers2.append("set-cookie", (0, import_cookie3.serialize)(name, value, { ...options2, path }));
    }
  }
}
function create_fetch({ event, options: options2, manifest: manifest2, state, get_cookie_header, set_internal }) {
  const server_fetch = async (info, init2) => {
    const original_request = normalize_fetch_input(info, init2, event.url);
    let mode = (info instanceof Request ? info.mode : init2?.mode) ?? "cors";
    let credentials = (info instanceof Request ? info.credentials : init2?.credentials) ?? "same-origin";
    return options2.hooks.handleFetch({
      event,
      request: original_request,
      fetch: async (info2, init3) => {
        const request = normalize_fetch_input(info2, init3, event.url);
        const url = new URL(request.url);
        if (!request.headers.has("origin")) {
          request.headers.set("origin", event.url.origin);
        }
        if (info2 !== original_request) {
          mode = (info2 instanceof Request ? info2.mode : init3?.mode) ?? "cors";
          credentials = (info2 instanceof Request ? info2.credentials : init3?.credentials) ?? "same-origin";
        }
        if ((request.method === "GET" || request.method === "HEAD") && (mode === "no-cors" && url.origin !== event.url.origin || url.origin === event.url.origin)) {
          request.headers.delete("origin");
        }
        if (url.origin !== event.url.origin) {
          if (`.${url.hostname}`.endsWith(`.${event.url.hostname}`) && credentials !== "omit") {
            const cookie = get_cookie_header(url, request.headers.get("cookie"));
            if (cookie)
              request.headers.set("cookie", cookie);
          }
          return fetch(request);
        }
        const prefix2 = assets || base;
        const decoded = decodeURIComponent(url.pathname);
        const filename = (decoded.startsWith(prefix2) ? decoded.slice(prefix2.length) : decoded).slice(1);
        const filename_html = `${filename}/index.html`;
        const is_asset = manifest2.assets.has(filename);
        const is_asset_html = manifest2.assets.has(filename_html);
        if (is_asset || is_asset_html) {
          const file = is_asset ? filename : filename_html;
          if (state.read) {
            const type = is_asset ? manifest2.mimeTypes[filename.slice(filename.lastIndexOf("."))] : "text/html";
            return new Response(state.read(file), {
              headers: type ? { "content-type": type } : {}
            });
          }
          return await fetch(request);
        }
        if (credentials !== "omit") {
          const cookie = get_cookie_header(url, request.headers.get("cookie"));
          if (cookie) {
            request.headers.set("cookie", cookie);
          }
          const authorization = event.request.headers.get("authorization");
          if (authorization && !request.headers.has("authorization")) {
            request.headers.set("authorization", authorization);
          }
        }
        if (!request.headers.has("accept")) {
          request.headers.set("accept", "*/*");
        }
        if (!request.headers.has("accept-language")) {
          request.headers.set(
            "accept-language",
            /** @type {string} */
            event.request.headers.get("accept-language")
          );
        }
        const response = await respond(request, options2, manifest2, {
          ...state,
          depth: state.depth + 1
        });
        const set_cookie = response.headers.get("set-cookie");
        if (set_cookie) {
          for (const str of set_cookie_parser.splitCookiesString(set_cookie)) {
            const { name, value, ...options3 } = set_cookie_parser.parseString(str);
            const path = options3.path ?? (url.pathname.split("/").slice(0, -1).join("/") || "/");
            set_internal(name, value, {
              path,
              .../** @type {import('cookie').CookieSerializeOptions} */
              options3
            });
          }
        }
        return response;
      }
    });
  };
  return (input, init2) => {
    const response = server_fetch(input, init2);
    response.catch(() => {
    });
    return response;
  };
}
function normalize_fetch_input(info, init2, url) {
  if (info instanceof Request) {
    return info;
  }
  return new Request(typeof info === "string" ? new URL(info, url) : info, init2);
}
var body;
var etag;
var headers;
function get_public_env(request) {
  body ?? (body = `export const env=${JSON.stringify(public_env)}`);
  etag ?? (etag = `W/${Date.now()}`);
  headers ?? (headers = new Headers({
    "content-type": "application/javascript; charset=utf-8",
    etag
  }));
  if (request.headers.get("if-none-match") === etag) {
    return new Response(void 0, { status: 304, headers });
  }
  return new Response(body, { headers });
}
function get_page_config(nodes) {
  let current = {};
  for (const node of nodes) {
    if (!node?.universal?.config && !node?.server?.config)
      continue;
    current = {
      ...current,
      ...node?.universal?.config,
      ...node?.server?.config
    };
  }
  return Object.keys(current).length ? current : void 0;
}
var default_transform = ({ html }) => html;
var default_filter = () => false;
var default_preload = ({ type }) => type === "js" || type === "css";
var page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "POST"]);
var allowed_page_methods = /* @__PURE__ */ new Set(["GET", "HEAD", "OPTIONS"]);
async function respond(request, options2, manifest2, state) {
  const url = new URL(request.url);
  if (options2.csrf_check_origin) {
    const forbidden = is_form_content_type(request) && (request.method === "POST" || request.method === "PUT" || request.method === "PATCH" || request.method === "DELETE") && request.headers.get("origin") !== url.origin;
    if (forbidden) {
      const csrf_error = new HttpError(
        403,
        `Cross-site ${request.method} form submissions are forbidden`
      );
      if (request.headers.get("accept") === "application/json") {
        return json(csrf_error.body, { status: csrf_error.status });
      }
      return text(csrf_error.body.message, { status: csrf_error.status });
    }
  }
  let rerouted_path;
  try {
    rerouted_path = options2.hooks.reroute({ url: new URL(url) }) ?? url.pathname;
  } catch (e) {
    return text("Internal Server Error", {
      status: 500
    });
  }
  let decoded;
  try {
    decoded = decode_pathname(rerouted_path);
  } catch {
    return text("Malformed URI", { status: 400 });
  }
  let route = null;
  let params = {};
  if (base && !state.prerendering?.fallback) {
    if (!decoded.startsWith(base)) {
      return text("Not found", { status: 404 });
    }
    decoded = decoded.slice(base.length) || "/";
  }
  if (decoded === `/${options2.app_dir}/env.js`) {
    return get_public_env(request);
  }
  if (decoded.startsWith(`/${options2.app_dir}`)) {
    return text("Not found", { status: 404 });
  }
  const is_data_request = has_data_suffix(decoded);
  let invalidated_data_nodes;
  if (is_data_request) {
    decoded = strip_data_suffix(decoded) || "/";
    url.pathname = strip_data_suffix(url.pathname) + (url.searchParams.get(TRAILING_SLASH_PARAM) === "1" ? "/" : "") || "/";
    url.searchParams.delete(TRAILING_SLASH_PARAM);
    invalidated_data_nodes = url.searchParams.get(INVALIDATED_PARAM)?.split("").map((node) => node === "1");
    url.searchParams.delete(INVALIDATED_PARAM);
  }
  if (!state.prerendering?.fallback) {
    const matchers = await manifest2._.matchers();
    for (const candidate of manifest2._.routes) {
      const match = candidate.pattern.exec(decoded);
      if (!match)
        continue;
      const matched = exec(match, candidate.params, matchers);
      if (matched) {
        route = candidate;
        params = decode_params(matched);
        break;
      }
    }
  }
  let trailing_slash = void 0;
  const headers2 = {};
  let cookies_to_add = {};
  const event = {
    // @ts-expect-error `cookies` and `fetch` need to be created after the `event` itself
    cookies: null,
    // @ts-expect-error
    fetch: null,
    getClientAddress: state.getClientAddress || (() => {
      throw new Error(
        `${"@sveltejs/adapter-netlify"} does not specify getClientAddress. Please raise an issue`
      );
    }),
    locals: {},
    params,
    platform: state.platform,
    request,
    route: { id: route?.id ?? null },
    setHeaders: (new_headers) => {
      for (const key2 in new_headers) {
        const lower = key2.toLowerCase();
        const value = new_headers[key2];
        if (lower === "set-cookie") {
          throw new Error(
            "Use `event.cookies.set(name, value, options)` instead of `event.setHeaders` to set cookies"
          );
        } else if (lower in headers2) {
          throw new Error(`"${key2}" header is already set`);
        } else {
          headers2[lower] = value;
          if (state.prerendering && lower === "cache-control") {
            state.prerendering.cache = /** @type {string} */
            value;
          }
        }
      }
    },
    url,
    isDataRequest: is_data_request,
    isSubRequest: state.depth > 0
  };
  let resolve_opts = {
    transformPageChunk: default_transform,
    filterSerializedResponseHeaders: default_filter,
    preload: default_preload
  };
  try {
    if (route) {
      if (url.pathname === base || url.pathname === base + "/") {
        trailing_slash = "always";
      } else if (route.page) {
        const nodes = await load_page_nodes(route.page, manifest2);
        if (DEV)
          ;
        trailing_slash = get_option(nodes, "trailingSlash");
      } else if (route.endpoint) {
        const node = await route.endpoint();
        trailing_slash = node.trailingSlash;
        if (DEV)
          ;
      }
      if (!is_data_request) {
        const normalized = normalize_path(url.pathname, trailing_slash ?? "never");
        if (normalized !== url.pathname && !state.prerendering?.fallback) {
          return new Response(void 0, {
            status: 308,
            headers: {
              "x-sveltekit-normalize": "1",
              location: (
                // ensure paths starting with '//' are not treated as protocol-relative
                (normalized.startsWith("//") ? url.origin + normalized : normalized) + (url.search === "?" ? "" : url.search)
              )
            }
          });
        }
      }
      if (state.before_handle || state.emulator?.platform) {
        let config = {};
        let prerender = false;
        if (route.endpoint) {
          const node = await route.endpoint();
          config = node.config ?? config;
          prerender = node.prerender ?? prerender;
        } else if (route.page) {
          const nodes = await load_page_nodes(route.page, manifest2);
          config = get_page_config(nodes) ?? config;
          prerender = get_option(nodes, "prerender") ?? false;
        }
        if (state.before_handle) {
          state.before_handle(event, config, prerender);
        }
        if (state.emulator?.platform) {
          event.platform = await state.emulator.platform({ config, prerender });
        }
      }
    }
    const { cookies, new_cookies, get_cookie_header, set_internal } = get_cookies(
      request,
      url,
      trailing_slash ?? "never"
    );
    cookies_to_add = new_cookies;
    event.cookies = cookies;
    event.fetch = create_fetch({
      event,
      options: options2,
      manifest: manifest2,
      state,
      get_cookie_header,
      set_internal
    });
    if (state.prerendering && !state.prerendering.fallback)
      disable_search(url);
    const response = await options2.hooks.handle({
      event,
      resolve: (event2, opts) => resolve2(event2, opts).then((response2) => {
        for (const key2 in headers2) {
          const value = headers2[key2];
          response2.headers.set(
            key2,
            /** @type {string} */
            value
          );
        }
        add_cookies_to_headers(response2.headers, Object.values(cookies_to_add));
        if (state.prerendering && event2.route.id !== null) {
          response2.headers.set("x-sveltekit-routeid", encodeURI(event2.route.id));
        }
        return response2;
      })
    });
    if (response.status === 200 && response.headers.has("etag")) {
      let if_none_match_value = request.headers.get("if-none-match");
      if (if_none_match_value?.startsWith('W/"')) {
        if_none_match_value = if_none_match_value.substring(2);
      }
      const etag2 = (
        /** @type {string} */
        response.headers.get("etag")
      );
      if (if_none_match_value === etag2) {
        const headers22 = new Headers({ etag: etag2 });
        for (const key2 of [
          "cache-control",
          "content-location",
          "date",
          "expires",
          "vary",
          "set-cookie"
        ]) {
          const value = response.headers.get(key2);
          if (value)
            headers22.set(key2, value);
        }
        return new Response(void 0, {
          status: 304,
          headers: headers22
        });
      }
    }
    if (is_data_request && response.status >= 300 && response.status <= 308) {
      const location = response.headers.get("location");
      if (location) {
        return redirect_json_response(new Redirect(
          /** @type {any} */
          response.status,
          location
        ));
      }
    }
    return response;
  } catch (e) {
    if (e instanceof Redirect) {
      const response = is_data_request ? redirect_json_response(e) : route?.page && is_action_json_request(event) ? action_json_redirect(e) : redirect_response(e.status, e.location);
      add_cookies_to_headers(response.headers, Object.values(cookies_to_add));
      return response;
    }
    return await handle_fatal_error(event, options2, e);
  }
  async function resolve2(event2, opts) {
    try {
      if (opts) {
        resolve_opts = {
          transformPageChunk: opts.transformPageChunk || default_transform,
          filterSerializedResponseHeaders: opts.filterSerializedResponseHeaders || default_filter,
          preload: opts.preload || default_preload
        };
      }
      if (state.prerendering?.fallback) {
        return await render_response({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          page_config: { ssr: false, csr: true },
          status: 200,
          error: null,
          branch: [],
          fetched: [],
          resolve_opts
        });
      }
      if (route) {
        const method = (
          /** @type {import('types').HttpMethod} */
          event2.request.method
        );
        let response;
        if (is_data_request) {
          response = await render_data(
            event2,
            route,
            options2,
            manifest2,
            state,
            invalidated_data_nodes,
            trailing_slash ?? "never"
          );
        } else if (route.endpoint && (!route.page || is_endpoint_request(event2))) {
          response = await render_endpoint(event2, await route.endpoint(), state);
        } else if (route.page) {
          if (page_methods.has(method)) {
            response = await render_page(event2, route.page, options2, manifest2, state, resolve_opts);
          } else {
            const allowed_methods2 = new Set(allowed_page_methods);
            const node = await manifest2._.nodes[route.page.leaf]();
            if (node?.server?.actions) {
              allowed_methods2.add("POST");
            }
            if (method === "OPTIONS") {
              response = new Response(null, {
                status: 204,
                headers: {
                  allow: Array.from(allowed_methods2.values()).join(", ")
                }
              });
            } else {
              const mod = [...allowed_methods2].reduce(
                (acc, curr) => {
                  acc[curr] = true;
                  return acc;
                },
                /** @type {Record<string, any>} */
                {}
              );
              response = method_not_allowed(mod, method);
            }
          }
        } else {
          throw new Error("This should never happen");
        }
        if (request.method === "GET" && route.page && route.endpoint) {
          const vary = response.headers.get("vary")?.split(",")?.map((v) => v.trim().toLowerCase());
          if (!(vary?.includes("accept") || vary?.includes("*"))) {
            response = new Response(response.body, {
              status: response.status,
              statusText: response.statusText,
              headers: new Headers(response.headers)
            });
            response.headers.append("Vary", "Accept");
          }
        }
        return response;
      }
      if (state.error && event2.isSubRequest) {
        return await fetch(request, {
          headers: {
            "x-sveltekit-error": "true"
          }
        });
      }
      if (state.error) {
        return text("Internal Server Error", {
          status: 500
        });
      }
      if (state.depth === 0) {
        return await respond_with_error({
          event: event2,
          options: options2,
          manifest: manifest2,
          state,
          status: 404,
          error: new SvelteKitError(404, "Not Found", `Not found: ${event2.url.pathname}`),
          resolve_opts
        });
      }
      if (state.prerendering) {
        return text("not found", { status: 404 });
      }
      return await fetch(request);
    } catch (e) {
      return await handle_fatal_error(event2, options2, e);
    } finally {
      event2.cookies.set = () => {
        throw new Error("Cannot use `cookies.set(...)` after the response has been generated");
      };
      event2.setHeaders = () => {
        throw new Error("Cannot use `setHeaders(...)` after the response has been generated");
      };
    }
  }
}
function filter_private_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(private_prefix) && (public_prefix === "" || !k.startsWith(public_prefix))
    )
  );
}
function filter_public_env(env, { public_prefix, private_prefix }) {
  return Object.fromEntries(
    Object.entries(env).filter(
      ([k]) => k.startsWith(public_prefix) && (private_prefix === "" || !k.startsWith(private_prefix))
    )
  );
}
var prerender_env_handler = {
  get({ type }, prop) {
    throw new Error(
      `Cannot read values from $env/dynamic/${type} while prerendering (attempted to read env.${prop.toString()}). Use $env/static/${type} instead`
    );
  }
};
var _options, _manifest;
var Server = class {
  /** @param {import('@sveltejs/kit').SSRManifest} manifest */
  constructor(manifest2) {
    /** @type {import('types').SSROptions} */
    __privateAdd(this, _options, void 0);
    /** @type {import('@sveltejs/kit').SSRManifest} */
    __privateAdd(this, _manifest, void 0);
    __privateSet(this, _options, options);
    __privateSet(this, _manifest, manifest2);
  }
  /**
   * @param {{
   *   env: Record<string, string>;
   *   read?: (file: string) => ReadableStream;
   * }} opts
   */
  async init({ env, read }) {
    const prefixes = {
      public_prefix: __privateGet(this, _options).env_public_prefix,
      private_prefix: __privateGet(this, _options).env_private_prefix
    };
    const private_env = filter_private_env(env, prefixes);
    const public_env2 = filter_public_env(env, prefixes);
    set_private_env(
      prerendering ? new Proxy({ type: "private" }, prerender_env_handler) : private_env
    );
    set_public_env(
      prerendering ? new Proxy({ type: "public" }, prerender_env_handler) : public_env2
    );
    set_safe_public_env(public_env2);
    if (!__privateGet(this, _options).hooks) {
      try {
        const module = await get_hooks();
        __privateGet(this, _options).hooks = {
          handle: module.handle || (({ event, resolve: resolve2 }) => resolve2(event)),
          handleError: module.handleError || (({ error }) => console.error(error)),
          handleFetch: module.handleFetch || (({ request, fetch: fetch22 }) => fetch22(request)),
          reroute: module.reroute || (() => {
          })
        };
      } catch (error) {
        {
          throw error;
        }
      }
    }
  }
  /**
   * @param {Request} request
   * @param {import('types').RequestOptions} options
   */
  async respond(request, options2) {
    return respond(request, __privateGet(this, _options), __privateGet(this, _manifest), {
      ...options2,
      error: false,
      depth: 0
    });
  }
};
_options = new WeakMap();
_manifest = new WeakMap();

// .svelte-kit/netlify-tmp/manifest.js
var manifest = (() => {
  function __memo(fn) {
    let value;
    return () => value ?? (value = value = fn());
  }
  return {
    appDir: "_app",
    appPath: "_app",
    assets: /* @__PURE__ */ new Set(["burger.svg", "favicon.png"]),
    mimeTypes: { ".svg": "image/svg+xml", ".png": "image/png" },
    _: {
      client: { "start": "_app/immutable/entry/start.Dw67MZGW.js", "app": "_app/immutable/entry/app.BvpiuGPm.js", "imports": ["_app/immutable/entry/start.Dw67MZGW.js", "_app/immutable/chunks/entry.uU8UwhXW.js", "_app/immutable/chunks/runtime.BoLIClZE.js", "_app/immutable/chunks/index.JzF151we.js", "_app/immutable/chunks/control.CYgJF_JY.js", "_app/immutable/entry/app.BvpiuGPm.js", "_app/immutable/chunks/preload-helper.BQ24v_F8.js", "_app/immutable/chunks/runtime.BoLIClZE.js", "_app/immutable/chunks/disclose-version.B6hs-VaT.js", "_app/immutable/chunks/if.CGH3jEpU.js", "_app/immutable/chunks/main-client.DWdlEJA0.js"], "stylesheets": [], "fonts": [], "uses_env_dynamic_public": false },
      nodes: [
        __memo(() => Promise.resolve().then(() => (init__(), __exports))),
        __memo(() => Promise.resolve().then(() => (init__2(), __exports2))),
        __memo(() => Promise.resolve().then(() => (init__3(), __exports3))),
        __memo(() => Promise.resolve().then(() => (init__4(), __exports4))),
        __memo(() => Promise.resolve().then(() => (init__5(), __exports5))),
        __memo(() => Promise.resolve().then(() => (init__6(), __exports6))),
        __memo(() => Promise.resolve().then(() => (init__7(), __exports7))),
        __memo(() => Promise.resolve().then(() => (init__8(), __exports8))),
        __memo(() => Promise.resolve().then(() => (init__9(), __exports9))),
        __memo(() => Promise.resolve().then(() => (init__10(), __exports10))),
        __memo(() => Promise.resolve().then(() => (init__11(), __exports11))),
        __memo(() => Promise.resolve().then(() => (init__12(), __exports12))),
        __memo(() => Promise.resolve().then(() => (init__13(), __exports13))),
        __memo(() => Promise.resolve().then(() => (init__14(), __exports14))),
        __memo(() => Promise.resolve().then(() => (init__15(), __exports15))),
        __memo(() => Promise.resolve().then(() => (init__16(), __exports16))),
        __memo(() => Promise.resolve().then(() => (init__17(), __exports17))),
        __memo(() => Promise.resolve().then(() => (init__18(), __exports18))),
        __memo(() => Promise.resolve().then(() => (init__19(), __exports19))),
        __memo(() => Promise.resolve().then(() => (init__20(), __exports20)))
      ],
      routes: [
        {
          id: "/(regular)/about_us",
          pattern: /^\/about_us\/?$/,
          params: [],
          page: { layouts: [0, 4], errors: [1, ,], leaf: 12 },
          endpoint: null
        },
        {
          id: "/(protected)/admin",
          pattern: /^\/admin\/?$/,
          params: [],
          page: { layouts: [0, 2], errors: [1, ,], leaf: 5 },
          endpoint: null
        },
        {
          id: "/(protected)/admin/dashboard",
          pattern: /^\/admin\/dashboard\/?$/,
          params: [],
          page: { layouts: [0, 2, 3], errors: [1, , ,], leaf: 6 },
          endpoint: null
        },
        {
          id: "/(protected)/admin/dashboard/courses",
          pattern: /^\/admin\/dashboard\/courses\/?$/,
          params: [],
          page: { layouts: [0, 2, 3], errors: [1, , ,], leaf: 7 },
          endpoint: null
        },
        {
          id: "/(protected)/admin/dashboard/services",
          pattern: /^\/admin\/dashboard\/services\/?$/,
          params: [],
          page: { layouts: [0, 2, 3], errors: [1, , ,], leaf: 8 },
          endpoint: null
        },
        {
          id: "/(protected)/admin/dashboard/settings",
          pattern: /^\/admin\/dashboard\/settings\/?$/,
          params: [],
          page: { layouts: [0, 2, 3], errors: [1, , ,], leaf: 9 },
          endpoint: null
        },
        {
          id: "/(protected)/admin/dashboard/status",
          pattern: /^\/admin\/dashboard\/status\/?$/,
          params: [],
          page: { layouts: [0, 2, 3], errors: [1, , ,], leaf: 10 },
          endpoint: null
        },
        {
          id: "/(protected)/admin/dashboard/users",
          pattern: /^\/admin\/dashboard\/users\/?$/,
          params: [],
          page: { layouts: [0, 2, 3], errors: [1, , ,], leaf: 11 },
          endpoint: null
        },
        {
          id: "/(protected)/admin/logout",
          pattern: /^\/admin\/logout\/?$/,
          params: [],
          page: null,
          endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts(), server_ts_exports)))
        },
        {
          id: "/(blog)/blog/api/posts",
          pattern: /^\/blog\/api\/posts\/?$/,
          params: [],
          page: null,
          endpoint: __memo(() => Promise.resolve().then(() => (init_server_ts2(), server_ts_exports2)))
        },
        {
          id: "/(regular)/contact",
          pattern: /^\/contact\/?$/,
          params: [],
          page: { layouts: [0, 4], errors: [1, ,], leaf: 13 },
          endpoint: null
        },
        {
          id: "/(regular)/course/[id]",
          pattern: /^\/course\/([^/]+?)\/?$/,
          params: [{ "name": "id", "optional": false, "rest": false, "chained": false }],
          page: { layouts: [0, 4], errors: [1, ,], leaf: 14 },
          endpoint: null
        },
        {
          id: "/(regular)/faq",
          pattern: /^\/faq\/?$/,
          params: [],
          page: { layouts: [0, 4], errors: [1, ,], leaf: 15 },
          endpoint: null
        },
        {
          id: "/(regular)/help",
          pattern: /^\/help\/?$/,
          params: [],
          page: { layouts: [0, 4], errors: [1, ,], leaf: 16 },
          endpoint: null
        },
        {
          id: "/(regular)/privacy",
          pattern: /^\/privacy\/?$/,
          params: [],
          page: { layouts: [0, 4], errors: [1, ,], leaf: 17 },
          endpoint: null
        },
        {
          id: "/(regular)/service/[id]",
          pattern: /^\/service\/([^/]+?)\/?$/,
          params: [{ "name": "id", "optional": false, "rest": false, "chained": false }],
          page: { layouts: [0, 4], errors: [1, ,], leaf: 18 },
          endpoint: null
        },
        {
          id: "/(regular)/terms",
          pattern: /^\/terms\/?$/,
          params: [],
          page: { layouts: [0, 4], errors: [1, ,], leaf: 19 },
          endpoint: null
        }
      ],
      matchers: async () => {
        return {};
      },
      server_assets: {}
    }
  };
})();
var prerendered = /* @__PURE__ */ new Set(["/", "/__data.json", "/blog", "/blog/__data.json", "/rss.xml", "/blog/second-post", "/blog/first-post"]);

// .svelte-kit/netlify-tmp/entry.js
var server = new Server(manifest);
var prefix = `/${manifest.appPath}/`;
var initialized = server.init({
  // @ts-ignore
  env: Deno.env.toObject()
});
async function handler(request, context) {
  if (is_static_file(request)) {
    return;
  }
  await initialized;
  return server.respond(request, {
    platform: { context },
    getClientAddress() {
      return context.ip;
    }
  });
}
function is_static_file(request) {
  const url = new URL(request.url);
  if (url.pathname.startsWith(prefix)) {
    return true;
  }
  const pathname = url.pathname.replace(/\/$/, "");
  let file = pathname.substring(1);
  try {
    file = decodeURIComponent(file);
  } catch (err) {
  }
  return manifest.assets.has(file) || manifest.assets.has(file + "/index.html") || prerendered.has(pathname || "/");
}
export {
  handler as default
};
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)

tabbable/dist/index.esm.js:
  (*!
  * tabbable 6.2.0
  * @license MIT, https://github.com/focus-trap/tabbable/blob/master/LICENSE
  *)

focus-trap/dist/focus-trap.esm.js:
  (*!
  * focus-trap 7.5.4
  * @license MIT, https://github.com/focus-trap/focus-trap/blob/master/LICENSE
  *)
*/
//# sourceMappingURL=render.js.map
