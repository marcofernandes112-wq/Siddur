import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useGuidedStore } from '../store/guidedStore'
import { useNavigationStore } from '../store/navigationStore'
import { useSettingsStore } from '../store/settingsStore'
import { buildGuidedSession } from '../domain/services/guidedModeService'
import { useServiceDetector } from '../domain/services/useServiceDetector'
import { GuidedFlow } from '../components/guided/GuidedFlow'
import { GuidedFlowTypeSchema, type GuidedFlowType } from '../domain/models/GuidedSession'

const VALID_FLOW_TYPES = GuidedFlowTypeSchema.options

export function GuidedModePage() {
  const { flowType } = useParams<{ flowType: string }>()
  const navigate = useNavigate()
  const tree = useNavigationStore((s) => s.tree)
  const settings = useSettingsStore((s) => s.settings)
  const { session, startSession } = useGuidedStore()
  const suggestion = useServiceDetector()

  if (flowType && !VALID_FLOW_TYPES.includes(flowType as GuidedFlowType)) {
    return <div className="not-found">Fluxo guiado não reconhecido: "{flowType}".</div>
  }

  useEffect(() => {
    if (!tree || !flowType) return

    const ctx = {
      hasMinyan: settings.hasMinyanDefault,
      prayerMode: settings.prayerMode,
      userLevel: settings.userLevel,
      dayType: suggestion.dayType,
    }

    const newSession = buildGuidedSession(
      flowType as GuidedFlowType,
      tree,
      [],
      ctx
    )
    startSession(newSession)
  }, [tree, flowType]) // eslint-disable-line react-hooks/exhaustive-deps

  if (!session) return <div className="loading">A preparar sessão guiada...</div>

  return <GuidedFlow onExit={() => navigate('/')} />
}
