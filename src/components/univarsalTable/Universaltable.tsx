import React, { useMemo, useState } from "react";
import {
  ColumnDef,
  SortDirection,
  StatusConfig,
  UniversalTableProps,
} from "./UnivarsalTable.type";

function getNestedValue(obj: Record<string, unknown>, key: string): unknown {
  return key.split(".").reduce((acc: unknown, k) => {
    if (acc && typeof acc === "object")
      return (acc as Record<string, unknown>)[k];
    return undefined;
  }, obj);
}

function defaultStatusClass(value: string): StatusConfig {
  const v = value?.toLowerCase();
  if (["active", "approved", "success", "completed"].includes(v)) {
    return { bg: "#e8f8f0", color: "#1a7a4a", label: value };
  }
  if (["pending", "pending review", "review"].includes(v)) {
    return { bg: "#fff8e6", color: "#b07d00", label: value };
  }
  if (["inactive", "rejected", "failed", "cancelled"].includes(v)) {
    return { bg: "#fef0f0", color: "#c0392b", label: value };
  }
  return { bg: "#f0f0f5", color: "#555", label: value };
}

// ─── Component ───

export function UniversalTable<T extends Record<string, unknown>>({
  data,
  columns,
  actions,
  title,
  loading = false,
  pageSize = 10,
  className = "",
  tableClassName = "",
  rowClassName,
  rowStyle,
  onRowClick,
  emptyMessage = "No data found.",
  showPagination = true,
}: UniversalTableProps<T>) {
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDirection>(null);

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return data;
    return [...data].sort((a, b) => {
      const av = getNestedValue(a, sortKey);
      const bv = getNestedValue(b, sortKey);
      if (av == null) return 1;
      if (bv == null) return -1;
      const cmp =
        typeof av === "number" && typeof bv === "number"
          ? av - bv
          : String(av).localeCompare(String(bv));
      return sortDir === "asc" ? cmp : -cmp;
    });
  }, [data, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = sorted.slice((page - 1) * pageSize, page * pageSize);

  function handleSort(key: string) {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else {
      setSortKey(null);
      setSortDir(null);
    }
    setPage(1);
  }

  function renderCell(
    col: ColumnDef<T>,
    row: T,
    rowIndex: number,
  ): React.ReactNode {
    const key = col.key as string;
    const value = getNestedValue(row, key);

    if (col.render) return col.render(value, row, rowIndex);

    if (col.statusMap || (typeof value === "string" && isLikelyStatus(value))) {
      const strVal = String(value ?? "");
      const cfg =
        col.statusMap?.[strVal] ??
        col.statusMap?.[strVal.toLowerCase()] ??
        defaultStatusClass(strVal);
      return (
        <span
          style={{
            display: "inline-block",
            padding: "3px 12px",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 500,
            background: cfg.bg ?? "#f0f0f5",
            color: cfg.color ?? "#555",
          }}
          className={cfg.className}>
          {cfg.label ?? strVal}
        </span>
      );
    }

    if (value == null || value === "")
      return <span style={{ color: "#bbb" }}>—</span>;
    return String(value);
  }

  function isLikelyStatus(val: string): boolean {
    const statuses = [
      "active",
      "inactive",
      "pending",
      "approved",
      "rejected",
      "completed",
      "failed",
      "cancelled",
      "review",
      "pending review",
    ];
    return statuses.includes(val.toLowerCase());
  }

  const hasActions = actions && actions.length > 0;

  return (
    <div
      className={`ut-wrapper ${className} bg-white p-8 rounded-xl`}
      style={{ fontFamily: "inherit" }}>
      {title && (
        <h2
          className='pb-4'
          style={{
            fontSize: 20,
            fontWeight: 600,
            color: "#1a1d2e",
            margin: "0 0 16px",
          }}>
          {title}
        </h2>
      )}

      <div
        style={{
          border: "1px solid #ece9f1",
          borderRadius: 14,
          overflow: "hidden",
          background: "#fff",
          boxShadow: "",
        }}>
        <div style={{ overflowX: "auto" }}>
          <table
            className={`ut-table ${tableClassName} p-4`}
            style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid #E2E8F0",
                  background: "#ffff",
                }}>
                {columns.map((col) => {
                  const key = col.key as string;
                  const isSorted = sortKey === key;
                  return (
                    <th
                      key={key}
                      style={{
                        padding: "16px  16px",
                        textAlign: "left",
                        fontWeight: 500,
                        fontSize: 15,
                        color: "#1F2937",
                        whiteSpace: "nowrap",
                        width: col.width,
                        cursor: col.sortable ? "pointer" : "default",
                        userSelect: "none",
                      }}
                      onClick={() => col.sortable && handleSort(key)}>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                        }}>
                        {col.header}
                        {col.sortable && (
                          <span
                            style={{
                              fontSize: 10,
                              color: isSorted ? "#7c6fcd" : "#ccc",
                            }}>
                            {isSorted && sortDir === "asc"
                              ? "▲"
                              : isSorted && sortDir === "desc"
                                ? "▼"
                                : "⇅"}
                          </span>
                        )}
                      </span>
                    </th>
                  );
                })}
                {hasActions && (
                  <th
                    style={{
                      padding: "12px 16px",
                      textAlign: "left",
                      fontWeight: 500,
                      fontSize: 13,
                      color: "#6b6b8a",
                    }}>
                    Actions
                  </th>
                )}
              </tr>
            </thead>

            <tbody>
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {[
                      ...columns,
                      ...(hasActions ? [{ key: "_actions" }] : []),
                    ].map((col) => (
                      <td
                        key={col.key as string}
                        style={{ padding: "12px 16px" }}>
                        <div
                          style={{
                            height: 14,
                            borderRadius: 6,
                            background:
                              "linear-gradient(90deg,#f0eef8 25%,#e8e5f4 50%,#f0eef8 75%)",
                            backgroundSize: "200% 100%",
                            animation: "ut-shimmer 1.4s infinite",
                            width: `${50 + Math.random() * 40}%`,
                          }}
                        />
                      </td>
                    ))}
                  </tr>
                ))
              ) : paginated.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length + (hasActions ? 1 : 0)}
                    style={{
                      padding: "40px 16px",
                      textAlign: "center",
                      color: "#aaa",
                      fontSize: 14,
                    }}>
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginated.map((row, rowIndex) => {
                  const extraClass = rowClassName
                    ? rowClassName(row, rowIndex)
                    : "";
                  const extraStyle = rowStyle ? rowStyle(row, rowIndex) : {};
                  const originalBg = (extraStyle as any)?.backgroundColor || "";
                  return (
                    <tr
                      key={rowIndex}
                      className={`ut-row ${extraClass}`}
                      onClick={() => onRowClick?.(row, rowIndex)}
                      style={{
                        borderBottom: "1px solid #f5f4fa",
                        cursor: onRowClick ? "pointer" : "default",
                        transition: "background 0.15s",
                        ...extraStyle,
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#faf9fd")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = originalBg)
                      }>
                      {columns.map((col) => (
                        <td
                          key={col.key as string}
                          className={col.className}
                          style={{
                            padding: "12px 16px",
                            textAlign: col.align ?? "left",
                            color: "#2d2d44",
                            verticalAlign: "middle",
                          }}>
                          {renderCell(col, row, rowIndex)}
                        </td>
                      ))}

                      {hasActions && (
                        <td
                          style={{
                            padding: "10px 16px",
                            textAlign: "left",
                            whiteSpace: "nowrap",
                          }}>
                          {actions!
                            .filter((a) => !a.show || a.show(row))
                            .map((action, ai) => (
                              <button
                                key={ai}
                                className={`ut-action-btn ${action.className ?? ""}`}
                                title={action.label}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  action.onClick(row, rowIndex);
                                }}
                                style={{
                                  marginLeft: 6,
                                  padding: "5px 8px",
                                  borderRadius: 7,

                                  background: "transparent",
                                  cursor: "pointer",
                                  fontSize: 13,
                                  color: "#6b6b8a",
                                  transition: "all 0.15s",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = "#f0eef8";
                                  e.currentTarget.style.borderColor = "#c5bce8";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background =
                                    "transparent";
                                  e.currentTarget.style.borderColor = "#ece9f1";
                                }}>
                                {action.icon ?? action.label}
                              </button>
                            ))}
                        </td>
                      )}
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {showPagination && (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 16px",
              borderTop: "1px solid #f5f4fa",
              fontSize: 13,
              color: "#9999b5",
            }}>
            <span className='py-4'>
              Showing {sorted.length === 0 ? 0 : (page - 1) * pageSize + 1} to{" "}
              {Math.min(page * pageSize, sorted.length)} of {sorted.length}{" "}
              records
            </span>
            <div style={{ display: "flex", gap: 6 }}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{
                  padding: "5px 14px",
                  borderRadius: 7,
                  border: "1px solid #ece9f1",
                  background: page === 1 ? "#faf9fd" : "#fff",
                  cursor: page === 1 ? "not-allowed" : "pointer",
                  fontSize: 13,
                  color: page === 1 ? "#ccc" : "#6b6b8a",
                }}>
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1)
                .filter(
                  (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
                )
                .reduce<(number | "...")[]>((acc, p, i, arr) => {
                  if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("...");
                  acc.push(p);
                  return acc;
                }, [])
                .map((p, i) =>
                  p === "..." ? (
                    <span
                      key={`e-${i}`}
                      style={{ padding: "5px 4px", color: "#ccc" }}>
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => setPage(p as number)}
                      style={{
                        padding: "5px 10px",
                        borderRadius: 7,
                        // border: `1px solid ${page === p ? "#7c6fcd" : "#ece9f1"}`,
                        background: page === p ? "#D13C92" : "#fff",
                        color: page === p ? "#fff" : "#6b6b8a",
                        cursor: "pointer",
                        fontWeight: page === p ? 600 : 400,
                        fontSize: 13,
                      }}>
                      {p}
                    </button>
                  ),
                )}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{
                  padding: "5px 14px",
                  borderRadius: 7,
                  border: "1px solid #ece9f1",
                  background: page === totalPages ? "#faf9fd" : "#fff",
                  cursor: page === totalPages ? "not-allowed" : "pointer",
                  fontSize: 13,
                  color: page === totalPages ? "#ccc" : "#6b6b8a",
                }}>
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes ut-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

export default UniversalTable;
