import { FullSlug, isFolderPath, resolveRelative } from "../util/path"
import { QuartzPluginData } from "../plugins/vfile"
import { Date, getDate } from "./Date"
import { QuartzComponent, QuartzComponentProps } from "./types"
import { GlobalConfiguration } from "../cfg"

export type SortFn = (f1: QuartzPluginData, f2: QuartzPluginData) => number

export function byDateAndAlphabetical(cfg: GlobalConfiguration): SortFn {
  return (f1, f2) => {
    // Sort by date/alphabetical
    if (f1.dates && f2.dates) {
      // sort descending
      return getDate(cfg, f2)!.getTime() - getDate(cfg, f1)!.getTime()
    } else if (f1.dates && !f2.dates) {
      // prioritize files with dates
      return -1
    } else if (!f1.dates && f2.dates) {
      return 1
    }

    // otherwise, sort lexographically by title
    const f1Title = f1.frontmatter?.title.toLowerCase() ?? ""
    const f2Title = f2.frontmatter?.title.toLowerCase() ?? ""
    return f1Title.localeCompare(f2Title)
  }
}

export function byDateAndAlphabeticalFolderFirst(cfg: GlobalConfiguration): SortFn {
  return (f1, f2) => {
    // Sort folders first
    const f1IsFolder = isFolderPath(f1.slug ?? "")
    const f2IsFolder = isFolderPath(f2.slug ?? "")
    if (f1IsFolder && !f2IsFolder) return -1
    if (!f1IsFolder && f2IsFolder) return 1

    // If both are folders or both are files, sort by date/alphabetical
    if (f1.dates && f2.dates) {
      // sort descending
      return getDate(cfg, f2)!.getTime() - getDate(cfg, f1)!.getTime()
    } else if (f1.dates && !f2.dates) {
      // prioritize files with dates
      return -1
    } else if (!f1.dates && f2.dates) {
      return 1
    }

    // otherwise, sort lexographically by title
    const f1Title = f1.frontmatter?.title.toLowerCase() ?? ""
    const f2Title = f2.frontmatter?.title.toLowerCase() ?? ""
    return f1Title.localeCompare(f2Title)
  }
}

interface YearGroup {
  year: number
  pages: QuartzPluginData[]
}

type Props = {
  limit?: number
  sort?: SortFn
  groupByYear?: boolean
} & QuartzComponentProps

export const PageList: QuartzComponent = ({ cfg, fileData, allFiles, limit, sort, groupByYear = false }: Props) => {
  const sorter = sort ?? byDateAndAlphabeticalFolderFirst(cfg)
  let list = allFiles.sort(sorter)
  if (limit && !groupByYear) {
    list = list.slice(0, limit)
  }

  if (!groupByYear) {
    return (
      <ul class="section-ul">
        {list.map((page) => {
          const title = page.frontmatter?.title
          const tags = page.frontmatter?.tags ?? []

          return (
            <li class="section-li">
              <div class="section">
                <p class="meta">
                  {page.dates && <Date date={getDate(cfg, page)!} locale={cfg.locale} />}
                </p>
                <div class="desc">
                  <h3>
                    <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                      {title}
                    </a>
                  </h3>
                </div>
                <ul class="tags">
                  {tags.map((tag) => (
                    <li>
                      <a
                        class="internal tag-link"
                        href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                      >
                        {tag}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  // Group pages by year
  const yearGroups: Map<number, QuartzPluginData[]> = new Map()
  
  list.forEach((page) => {
    if (page.dates) {
      // Use published date first (from frontmatter "date"), then created, then modified
      const date = page.dates.published || page.dates.created || page.dates.modified
      if (date) {
        const year = date.getFullYear()
        if (!yearGroups.has(year)) {
          yearGroups.set(year, [])
        }
        yearGroups.get(year)!.push(page)
      }
    } else {
      console.log("No dates found for page:", page.frontmatter?.title)
    }
  })


  // Convert to sorted array (newest year first)
  const sortedYearGroups: YearGroup[] = Array.from(yearGroups.entries())
    .map(([year, pages]) => ({ year, pages }))
    .sort((a, b) => b.year - a.year)

  return (
    <div class="grouped-page-list">
      {sortedYearGroups.map(({ year, pages }) => (
        <div class="year-group">
          <h2 class="year-heading">{year}</h2>
          <ul class="section-ul">
            {pages.map((page) => {
              const title = page.frontmatter?.title
              const tags = page.frontmatter?.tags ?? []

              return (
                <li class="section-li">
                  <div class="section">
                    <p class="meta">
                      {page.dates && <Date date={getDate(cfg, page)!} locale={cfg.locale} />}
                    </p>
                    <div class="desc">
                      <h3>
                        <a href={resolveRelative(fileData.slug!, page.slug!)} class="internal">
                          {title}
                        </a>
                      </h3>
                    </div>
                    <ul class="tags">
                      {tags.map((tag) => (
                        <li>
                          <a
                            class="internal tag-link"
                            href={resolveRelative(fileData.slug!, `tags/${tag}` as FullSlug)}
                          >
                            {tag}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

PageList.css = `
.grouped-page-list .year-group {
  margin-bottom: 2rem;
}

.grouped-page-list .year-heading {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--gray);
  color: var(--darkgray);
}

.section h3 {
  margin: 0;
}

.section > .tags {
  margin: 0;
}
`
